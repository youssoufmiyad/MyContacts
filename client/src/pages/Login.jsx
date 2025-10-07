import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
      setErrorMessage("nom d'utilisateur ou mot de passe incorrect");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Hide" : "Show"} Password
        </button>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
    </div>
  );
};

export default Login;
