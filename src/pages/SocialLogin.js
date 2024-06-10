// SocialLogin.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, FacebookAuthProvider, signInWithRedirect, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { FacebookLoginButton } from "react-social-login-buttons";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SocialLogin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        navigate("/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "256164046596-nithcm1mquff72luh3cdvt70fvoi3793.apps.googleusercontent.com",
        callback: handleGoogleSignIn,
      });

      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "medium" }
      );
    } else {
      // console.error("Google Identity Services SDK not loaded");
    }
  }, []);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      toast.success("Google sign in successful");
    } catch (error) {
      console.error("Error during Google sign in:", error.message);
      toast.error("Error during Google sign in");
    }
  };

  const handleFacebookSignIn = async () => {
    const provider = new FacebookAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      // Aucune redirection nécessaire ici car onAuthStateChanged gérera la redirection
    } catch (error) {
      console.error("Error during Facebook sign in:", error.message);
      toast.error("Error during Facebook sign in");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="max-w-[240px] py-0 m-auto boutton">
        <FacebookLoginButton onClick={handleFacebookSignIn} />
        <div id="signInDiv"></div>
      </div>
    </>
  );
};

export default SocialLogin;
