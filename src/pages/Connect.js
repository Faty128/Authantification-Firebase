import React, { useEffect, useState } from "react";
import logo from "../assets/img/discord-logo.png";
import { Link, useNavigate } from "react-router-dom";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import {
} from "react-social-login-buttons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SocialLogin from "./SocialLogin";

const Connect = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        navigate("/dashboard"); // Rediriger vers le dashboard si déjà connecté
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const login = async () => {
    try {
      if (!loginEmail || !loginPassword) {
        toast.error("Veuillez saisir votre adresse e-mail et votre mot de passe.");
        return;
      }
  
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      
      if (userCredential && userCredential.user) {
        console.log(userCredential.user);
        toast.success("Connexion réussie !");
        navigate("/dashboard"); // Rediriger vers le tableau de bord après une connexion réussie
      } else {
        toast.error("Erreur lors de la connexion : utilisateur non trouvé.");
      }
    } catch (error) {
      toast.error("Erreur lors de la connexion : " + error.message);
      console.log(error.message);
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
            type="email"
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
        <p className="text-white">Subscribe</p>
        <div className="content__or-text">
          <span></span>
          <span>or</span>
          <span></span>
        </div>
        <SocialLogin />
        <p className="signin3">
          Don't have an account? <Link to="/register" className="link">Sign Up</Link>
        </p>
      </form>
    </>
  );
};

export default Connect;
