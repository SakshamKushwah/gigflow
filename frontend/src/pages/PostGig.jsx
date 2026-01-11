import { useDispatch } from "react-redux";
import { createGig } from "../features/gigs/gigSlice";

export default function PostGig() {
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(createGig({
      title: e.target.title.value,
      description: e.target.description.value,
      budget: e.target.budget.value
    }));
  };

  return (
    <form onSubmit={submit}>
      <h2>Post Gig</h2>
      <input name="title" placeholder="Title" />
      <textarea name="description" />
      <input name="budget" placeholder="Budget" />
      <button>Create</button>
    </form>
  );
}
