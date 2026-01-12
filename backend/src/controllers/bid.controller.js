import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const createBid = async (req, res) => {
  const bid = await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.json(bid);
};

export const getBidsByGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  let hiredBid;
  let gig;

  try {
    session.startTransaction();

    hiredBid = await Bid.findById(req.params.bidId).session(session);
    if (!hiredBid) throw new Error("Bid not found");

    gig = await Gig.findById(hiredBid.gigId).session(session);
    if (!gig) throw new Error("Gig not found");

    if (gig.status === "assigned") {
      throw new Error("Gig already assigned");
    }

    // Assign gig
    gig.status = "assigned";
    await gig.save({ session });

    // Reject other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: hiredBid._id } },
      { status: "rejected" },
      { session }
    );

    // Hire selected bid
    hiredBid.status = "hired";
    await hiredBid.save({ session });

    // ✅ COMMIT ONLY ONCE
    await session.commitTransaction();
    session.endSession();

  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).json({ error: err.message });
  }

  // 🔔 AFTER TRANSACTION (SAFE ZONE)
  try {
    req.io
      .to(hiredBid.freelancerId.toString())
      .emit("hired", { gigTitle: gig.title });
  } catch (socketErr) {
    console.error("Socket emit failed:", socketErr.message);
  }

  res.json({ success: true });
};

