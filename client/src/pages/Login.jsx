import { useAuth } from "../hooks/useAuth";
import { useState, useRef } from "react";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const focusEmailInput = () => {
    emailRef.current.focus();
  };

  const focusPasswordInput = () => {
    passwordRef.current.focus();
  };

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
      <section>
        <div className="content-container">
          <h1>Login</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group" onClick={focusEmailInput}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                ref={emailRef}
              />
            </div>

            <div className="form-group password" onClick={focusPasswordInput}>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordRef}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>

            <button type="submit">Login</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <p className="signup-link">
            Don't have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Login;
