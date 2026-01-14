import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBids, createBid, hireBid } from "../features/bids/bidSlice";
import { useParams } from "react-router-dom";

export default function GigDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const bids = useSelector((state) => state.bids.list);

  useEffect(() => {
    dispatch(fetchBids(id));
  }, [dispatch, id]);

  return (
    <div style={{ padding: "20px" }}>
      <h3>Bids</h3>

      {bids.map((bid) => (
        <div key={bid._id}>
          <p>{bid.message} – ₹{bid.price}</p>
        <button onClick={() => dispatch(hireBid(bid._id))}>
  Hire
</button>


        </div>
      ))}

      <button
        onClick={() =>
          dispatch(
            createBid({
              gigId: id,
              message: "I can do this job",
              price: 500
            })
          )
        }
      >
        Place Bid
      </button>
    </div>
  );
}
