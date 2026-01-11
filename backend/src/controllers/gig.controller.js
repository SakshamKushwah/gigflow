import Gig from "../models/Gig.js";

export const getGigs = async (req, res) => {
  const gigs = await Gig.find({ status: "open" });
  res.json(gigs);
};

export const createGig = async (req, res) => {
  const gig = await Gig.create({
    ...req.body,
    ownerId: req.user.id
  });
  res.json(gig);
};
