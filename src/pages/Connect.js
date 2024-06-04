import React, { useEffect, useState } from "react";
import logo from "../assets/img/discord-logo.png";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const Connect = () => {
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
      navigate("/"); // Rediriger après une connexion réussie
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGoogleSignIn = async (response) => {
    // const credential = GoogleAuthProvider.credential(response.credential);
    // try {
    //   const result = await signInWithCredential(auth, credential);
    //   console.log("Google sign in result:", result.user);
    //   navigate("/");
    // } catch (error) {
    //   console.error("Error during Google sign in:", error.message);
    // }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "256164046596-nithcm1mquff72luh3cdvt70fvoi3793.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    } else {
      console.error("Google Identity Services SDK not loaded");
    }
  }, []);
  
  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      const result = await signInWithRedirect(auth, provider);
      console.log("Facebook sign in result:", result.user);
      navigate("/");
    } catch (error) {
      console.error("Error during Facebook sign in:", error.message);
    }
  };
  

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <img src={logo} alt="discord-logo" className="img-logo" />
      <div className="flex">
        <input
          className="input"
          type="email" // Changed type to email for better validation
          placeholder="Email..."
          required
          onChange={(event) => setLoginEmail(event.target.value)}
        />
        <input
          className="input"
          type="password"
          placeholder="Password..."
          required
          onChange={(event) => setLoginPassword(event.target.value)}
        />
      </div>
      <div className="button">
        <button className="submit1" onClick={login}>
          Log In
        </button>
      </div>
      <p>Subscribe</p> {/* Corrected typo from 'souscribe' */}
      <div className="content__or-text">
        <span></span>
        <span>or</span>
        <span></span>
      </div>
      <div className="max-w-[240px] py-2 m-auto boutton">
        <FacebookLoginButton onClick={handleFacebookSignIn} />
        <div id="signInDiv"></div>
      </div>
      <p className="signin2">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </form>
  );
};

export default Connect;
