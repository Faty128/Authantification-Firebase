import React, { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Déconnexion réussie, rediriger vers la page par defaut
        navigate("/");
        toast.success("Déconnexion réussie !");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        toast.error("Error during sign out: " + error.message);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="main">
        <div className="login">
          <form className="form">
            <label htmlFor="chk" aria-hidden="true">
              Dashboard
            </label>
            {user ? (
              <p>
                Welcome, <br />
                {user.email}
              </p>
            ) : (
              <p>Loading...</p>
            )}
            <button className="btn btn-success" onClick={handleLogout}>
              Se déconnecter
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
