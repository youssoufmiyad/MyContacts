import { useState } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../utils/regex";
import { addUser, emailExists } from "../utils/auth";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

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
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default SignUp;
