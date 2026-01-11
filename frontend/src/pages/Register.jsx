import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";

export default function Register() {
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(register({
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value
    }));
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input name="name" placeholder="Name" />
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Register</button>
    </form>
  );
}
