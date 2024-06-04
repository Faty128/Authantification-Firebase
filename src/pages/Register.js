// import React, { useEffect, useState } from "react";
// import logo from "../assets/img/discord-logo.png";
// import { UserAuth } from "../context/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   createUserWithEmailAndPassword,
//   onAuthStateChanged,
//   signInWithEmailAndPassword,
//   signInWithRedirect,
//   FacebookAuthProvider,
//   GoogleAuthProvider,
// } from "firebase/auth";
// import { auth } from "../firebase";
// import {
//   FacebookLoginButton,
//   GoogleLoginButton,
// } from "react-social-login-buttons";

// const Register = () => {
//   const { googleSignIn } = UserAuth();
//   const navigate = useNavigate();

//   const [registerFullname, setRegisterFullname] = useState("");
//   const [registerEmail, setRegisterEmail] = useState("");
//   const [registerPassword, setRegisterPassword] = useState("");
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser);
//     });

//     return () => unsubscribe();
//   }, []);

//   function handleCallbackResponse(respons) {
//     console.log("Encoded JWT ID token: " + Response.Credential);
//   }

//   useEffect(() => {
//     /* globale google */
//     googleSignIn.accounts.id.initialize({
//       client_id:"256164046596-nithcm1mquff72luh3cdvt70fvoi3793.apps.googleusercontent.com",
//       callback: handleCallbackResponse
//     });

//     googleSignIn.accounts.id.renderButton(
//       document.getElementById("signInDiv"),
//       { theme: "outline", size: "large"}
//     );
//   }, []);

//   const register = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         registerEmail,
//         registerPassword
//       );
//       console.log(userCredential.user);
//       navigate("/connect"); // Rediriger vers la page Connect après enregistrement réussi
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const login = async () => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         loginEmail,
//         loginPassword
//       );
//       console.log(userCredential.user);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   const handleGoogleSignIn = async () => {
//     const provider = new GoogleAuthProvider();
//     try {
//       const result = await signInWithRedirect(auth, provider); // Utilisation de signInWithPopup
//       console.log("Google sign in result:", result.user);
//       navigate("/");
//     } catch (error) {
//       console.error("Error during Google sign in:", error.message);
//     }
//   };
  
  
//   const handleFacebookSignIn = async () => {
//     const provider = new FacebookAuthProvider();
//     try {
//       const result = await signInWithRedirect(auth, provider);
//       console.log("Facebook sign in result:", result.user);
//       navigate("/");
//     } catch (error) {
//       console.error("Error during Facebook sign in:", error.message);
//     }
//   };
  

//   return (
//     <form className="form" onSubmit={(e) => e.preventDefault()}>
//       <img src={logo} alt="discord-logo" className="img-logo" />
//       <div className="flex">
//         <input
//           className="input"
//           type="text"
//           placeholder="Fullname..."
//           required
//           onChange={(event) => setRegisterFullname(event.target.value)}
//         />
//         <input
//           className="input"
//           type="text"
//           placeholder="Email..."
//           required
//           onChange={(event) => setRegisterEmail(event.target.value)}
//         />
//         <input
//           className="input"
//           type="password"
//           placeholder="Password..."
//           required
//           onChange={(event) => setRegisterPassword(event.target.value)}
//         />
//       </div>
//       <div className="button">
//         <button className="submit1" onClick={register}>
//           Sign Up
//         </button>
//       </div>
//       <div className="content__or-text">
//         <span></span>
//         <span>or</span>
//         <span></span>
//       </div>
//       <div className="max-w-[240px] py-0 m-auto boutton">
//         <FacebookLoginButton onClick={handleFacebookSignIn} />
//         <GoogleLoginButton onClick={handleGoogleSignIn} />
//         <div id="signInDiv"></div>
//       </div>
//       <p className="">Already have an account? Signin</p>
//       <p className="signin">
//         Already have an account? <Link to="/">Signin</Link>
//       </p>
//     </form>
//   );
// };

// export default Register;

import React, { useEffect, useState } from "react";
import logo from "../assets/img/discord-logo.png";
import { UserAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../firebase";
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from "react-social-login-buttons";

const Register = () => {
  const { googleSignIn } = UserAuth();
  const navigate = useNavigate();

  const [registerFullname, setRegisterFullname] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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

  const register = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(userCredential.user);
      navigate("/connect"); // Redirect to Connect page after successful registration
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(userCredential.user);
    } catch (error) {
      console.log(error.message);
    }
  };

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
          type="text"
          placeholder="Fullname..."
          required
          onChange={(event) => setRegisterFullname(event.target.value)}
        />
        <input
          className="input"
          type="text"
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
      <div className="max-w-[240px] py-0 m-auto boutton">
        <FacebookLoginButton onClick={handleFacebookSignIn} />
        <div id="signInDiv"></div>
      </div>
      <p className="">Already have an account? Signin</p>
      <p className="signin">
        Already have an account? <Link to="/">Signin</Link>
      </p>
    </form>
  );
};

export default Register;

