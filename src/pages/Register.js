import React, { useState, useEffect } from "react";
import logo from "../assets/img/discord-logo.png";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import SocialLogin from "./SocialLogin";

const Register = () => {
  const navigate = useNavigate();

  const [registerFullname, setRegisterFullname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate(`/connect`);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const register = async () => {
    try {
      if (!registerFullname || !registerEmail || !registerPassword) {
        toast.error("Please fill in all fields.");
        return;
      }

      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      toast.success("Registration successful!");
      navigate(`/connect`); // Redirect to connect page after successful registration
    } catch (error) {
      console.error("Error during registration", error);
      toast.error("Error during registration");
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <img src={logo} alt="discord-logo" className="img-logo" />
        <div className="flex">
          <input
            className="input"
            type="text"
            placeholder="Fullname..."
            required
            onChange={(event) => setRegisterFullname(event.target.value)}
          />
          <input
            className="input"
            type="email"
            placeholder="Email..."
            required
            onChange={(event) => setRegisterEmail(event.target.value)}
          />
          <input
            className="input"
            type="password"
            placeholder="Password..."
            required
            onChange={(event) => setRegisterPassword(event.target.value)}
          />
        </div>
        <div className="button">
          <button className="submit1" onClick={register}>
            Sign Up
          </button>
        </div>
        <div className="content__or-text">
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <SocialLogin />
        <p className="text-white signin">Already have an account? Sign-in</p>
        <p className="signin2">
          Already have an account? <Link to="/connect" className="link">Sign-in</Link>
        </p>
      </form>
    </>
  );
};

export default Register;
