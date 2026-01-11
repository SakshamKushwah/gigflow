import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGigs } from "../features/gigs/gigSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const gigs = useSelector(s => s.gigs.list);

  useEffect(() => {
    dispatch(fetchGigs());
  }, []);

  return (
    <div>
      <h2>Open Gigs</h2>
      {gigs.map(g => (
        <div key={g._id}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>
        </div>
      ))}
    </div>
  );
}
