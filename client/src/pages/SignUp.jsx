import { useState, useRef } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../utils/regex";
import { addUser, emailExists } from "../utils/auth";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const focusEmailInput = () => {
    emailRef.current.focus();
  };
  const focusPasswordInput = () => {
    passwordRef.current.focus();
  };
  const focusConfirmPasswordInput = () => {
    confirmPasswordRef.current.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!EMAIL_REGEX.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }

    if (await emailExists(email)) {
      setErrorMessage("Email is already taken");
      return;
    }

    if (!PASSWORD_REGEX.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      const response = await addUser({ email, password });
      console.log(response);
      setErrorMessage(null);
      setSuccessMessage("Registration successful! You can now log in.");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to register : ", error.message);
    }
  };
  return (
    <div>
      <section>
        <div className="content-container">
          <h1>Register</h1>
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group" onClick={focusEmailInput}>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                value={email}
                name="email"
                placeholder="Email"
                ref={emailRef}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group password" onClick={focusPasswordInput}>
              <label htmlFor="password">Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                name="password"
                placeholder="Password"
                ref={passwordRef}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"} Password
              </button>
            </div>
            <div className="form-group" onClick={focusConfirmPasswordInput}>
              <label>Confirm Password:</label>
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                name="confirmPassword"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                ref={confirmPasswordRef}
              />
            </div>
            <button type="submit">Register</button>
          </form>
          {errorMessage && <p className="error">{errorMessage}</p>}
          {successMessage && <p className="success">{successMessage}</p>}
          <p className="login-link">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default SignUp;
