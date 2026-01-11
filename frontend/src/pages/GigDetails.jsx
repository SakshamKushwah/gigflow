import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids, createBid, hireBid } from "../features/bids/bidSlice";

export default function GigDetails({ gigId }) {
  const dispatch = useDispatch();
  const bids = useSelector(s => s.bids.list);

  useEffect(() => {
    dispatch(fetchBids(gigId));
  }, []);

  return (
    <div>
      <h3>Bids</h3>
      {bids.map(b => (
        <div key={b._id}>
          <p>{b.message} - ₹{b.price}</p>
          <button onClick={() => dispatch(hireBid(b._id))}>Hire</button>
        </div>
      ))}

      <button onClick={() => dispatch(createBid({
        gigId,
        message: "I can do this job",
        price: 500
      }))}>
        Place Bid
      </button>
    </div>
  );
}
