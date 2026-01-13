import Gig from "../models/Gig.js";

export const createGig = async (req, res) => {
  const gig = await Gig.create({
    title: req.body.title,
    description: req.body.description,
    budget: req.body.budget,
    ownerId: req.user.id      // 👈 WORKS NOW
  });

  res.status(201).json(gig);
};

export const getGigs = async (req, res) => {
  const gigs = await Gig.find();
  res.json(gigs);
};
