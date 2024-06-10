import React from "react";
import logo from "../assets/img/discord-logo.png";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/register"); // Redirection vers la page Register
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <img src={logo} alt="discord-logo" className="logo-img" />
      <p className="title text-white f-bold">Even</p>
      <p className="message">
        Discover Upcoming events <br /> near you
      </p>
      <div className="button">
        <button type="submit" className="submit1">
          Sign Up
        </button>
      </div>
      <div className="button">
        <button type="button" className="submit2">
          Log in
        </button>
        <p className="Skip">Skip to sign</p>
      </div>
    </form>
  );
};

export default Start;
