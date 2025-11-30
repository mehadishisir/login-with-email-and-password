import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase.init";

const Login = () => {
  const emailRef = useRef();
  const [errorMessage, setErrorMessage] = useState(false);
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // error message reset
    setErrorMessage(false);
    // success message reset
    setSuccess("");

    // sign in authentication logic here
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // user verification check
        if (!user.emailVerified) {
          setErrorMessage(
            "Your email is not verified. Please verify your email address."
          );
          return;
        } else {
          setSuccess("User Logged In Successfully");
          // ...
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
        setErrorMessage("Invalid email or password.");
      });
  };
  const handleForgotPassword = () => {
    const email = emailRef.current.value;

    sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content mx-auto flex-col lg:flex-row-reverse">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-5xl font-bold">Login now!</h1>

            <form onSubmit={handleSubmit} className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                name="email"
                ref={emailRef}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                placeholder="Password"
              />
              {/* set error message */}
              {errorMessage && (
                <p className="text-red-500 mt-2">{errorMessage}</p>
              )}
              {/* set success message */}
              {success && <p className="text-green-500 mt-2">{success}</p>}
              <div onClick={handleForgotPassword}>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              don't have an account? please
              <Link className=" text-blue-500 underline" to="/register">
                register
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
