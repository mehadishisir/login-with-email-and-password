import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.init";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const check = e.target.check.checked;
    console.log(email, password, check);
    if (!check) {
      setErrorMessage("You must agree to the terms and conditions.");
      return;
    }

    // success message
    setSuccess("");
    // e.target.reset();
    // clear error message
    setErrorMessage(false);
    // firebase register user
    const passwordValidation = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$&*]).{8,}$/;
    if (!passwordValidation.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character."
      );

      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setSuccess("User Created Successfully");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col max-w-sm mx-auto mt-10"
      >
        {/* email */}
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            required
          />
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>
        {/* password */}
        <br></br>
        <label className="input validator">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <div className="flex justify-between ">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              required
              placeholder="Password"
              minlength="8"
            />
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className="ml-22"
            >
              {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
            </button>
          </div>
        </label>
        <br></br>
        <label className="label">
          <input type="checkbox" name="check" className="checkbox" />
          terms and conditions
        </label>

        <br></br>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {success && <p className="text-green-500">{success}</p>}

        <button className="btn btn-primary mt-4">Register</button>
      </form>
    </div>
  );
};

export default Register;
