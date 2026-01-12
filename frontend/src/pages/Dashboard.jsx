import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../features/gigs/gigSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const dispatch = useDispatch();
  const gigs = useSelector((state) => state.gigs.list);
  const user = useSelector((state) => state.auth.user);

  // Fetch gigs only after login
  useEffect(() => {
    if (!user) return;
    dispatch(fetchGigs());
  }, [dispatch, user]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>

      {user && (
        <p>
          Welcome, <b>{user.name}</b>
        </p>
      )}

      <Link to="/post">
        <button style={{ marginBottom: "20px" }}>
          Post a Gig
        </button>
      </Link>

      <h3>Open Gigs</h3>

      {gigs.length === 0 && (
        <p>No gigs available</p>
      )}

      {gigs.map((gig) => (
        <div
          key={gig._id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px"
          }}
        >
          <h4>{gig.title}</h4>
          <p>{gig.description}</p>
          <p>
            Budget: ₹{gig.budget}
          </p>

          <Link to={`/gig/${gig._id}`}>
            <button>
              View / Bid
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}
