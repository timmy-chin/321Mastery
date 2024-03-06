import Image from "next/image";
import Link from "next/link";

import { signIn } from "next-auth/react";


function handleLogin(event){
  const data = new FormData(event.currentTarget);
  fetch('/api/users', {
    method: "get",
    body: data
  });
}

export default function Login() {
  const [open, setOpen] = useState(false);
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);

  function handleLoginButton() {
    setOpen(true);
  }

  function handleClose() {
    reset();
    setOpen(false);
  }

  function reset() {
    setError(false);
    setFormValues({ email: "", password: "" });
  }

  function handleSignin() {
    signIn("normal", { ...formValues, redirect: false }).then((result) => {
      if (!result.error) {
        setOpen(false);
        reset();
      } else {
        setError(true);
      }
    });
  }
}

export default function Home() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1>Carpool With Me</h1>
      <img
        src="/carpoologo.png"
        alt="Carpool Logo"
        style={{ width: "150px", height: "150px", marginBottom: "20px" }}
      />
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ textAlign: "center" }}>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <br />
        <button type="submit">
          {" "}
          <Link href="/driver_home">Login</Link>
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <p>
          Don't have an account? <Link href="/signup"> Sign-Up</Link>
        </p>
      </div>
    </div>
  );
}
