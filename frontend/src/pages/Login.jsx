import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";

export default function Login() {
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
    dispatch(login({
      email: e.target.email.value,
      password: e.target.password.value
    }));
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" />
      <input name="password" type="password" placeholder="Password" />
      <button>Login</button>
    </form>
  );
}
