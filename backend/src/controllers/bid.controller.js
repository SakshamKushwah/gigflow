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
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    const gig = await Gig.findById(bid.gigId).session(session);

    if (gig.status === "assigned") throw new Error("Already assigned");

    gig.status = "assigned";
    await gig.save();

    await Bid.updateMany(
      { gigId: gig._id },
      { status: "rejected" }
    ).session(session);

    bid.status = "hired";
    await bid.save();

    await session.commitTransaction();

    req.io.to(bid.freelancerId.toString()).emit("hired", {
      gigTitle: gig.title
    });

    res.json({ success: true });
  } catch (err) {
    await session.abortTransaction();
    res.status(400).json({ error: err.message });
  } finally {
    session.endSession();
  }
};
