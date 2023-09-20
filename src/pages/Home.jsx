// import "./Pages.css"
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { getRandomColor, createImageFromInitials } from './Helper';
import { useNavigate } from 'react-router-dom';
// import { getAuth, onAuthStateChanged } from "firebase/auth";

const Home = () => {

  const [profilePic, setProfilePic] = useState("")
 
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            console.log(user)
            if(user.photoURL){
              console.log(user.photoURL)
            } else {
              setProfilePic(createImageFromInitials(500, user.email, getRandomColor()));
            }
            // ...
            console.log("uid", uid) 
          } else {
            // User is signed out
            // ...
            console.log("user is logged out")
          }
        });
       
  }, [])

  
  const navigate = useNavigate();

  const handleLogout = () => {               
      signOut(auth).then(() => {
      // Sign-out successful.
          navigate("/");
          console.log("Signed out successfully")
      }).catch((error) => {
      // An error happened.
      });
  }

  return (
    <div className="container">
      <div className="header-container">
        <header>
          <ul>
            <li>
              <a href="#!" className="title text-darken-1">
                <img src="https://img.icons8.com/?size=512&id=20830&format=png" alt="" />
                <span>My Apps</span>
              </a>
            </li>
          </ul>
        </header>

        {/* search bar  */}
        <div className="search-bar">
          <i className="material-icons">search</i>
          <input type="search" name="Search" placeholder="Search Apps" />
        </div>
        
        <div className="other-header-content">
          <ul className="nav-account">
            <li>
              <a href="#!" className="profile-icon"><img src={profilePic} alt="" /></a>
            </li>
          </ul>

          <ul className="nav-setting">
            <li>
              <a href="#!" className="profile-icon-2"><img src={profilePic} alt="" /></a>
            </li>
          </ul>
        </div>

      </div>
      
      
      <div className="content-container">
        <h1>Hello</h1>
        <p>
          Lorem 
        </p>
      </div>

      {/* <nav className="container-fluid"> */}
        {/* <div className="nav-wrapper green"> */}

          {/* home page or logo */}
          {/* <ul>
            <li>
              <a href="#!" className="title white-text text-darken-1">My Apps</a>
            </li>
          </ul> */}

          

          {/* <ul className="nav-account">
            <li>
              <a href="#!" className="profile-icon"><img src={profilePic} alt="" /></a>
            </li>
          </ul> */}

        {/* </div> */}
      {/* </nav> */}

      {/* <div className="sidebar-options-div">
        <a href="#" className="sidebar-option">
          <span className="material-symbols-outlined">menu</span>
          My Apps
        </a>
        <a href="#" className="sidebar-option">
          <span className="material-symbols-outlined">share</span>
          Shared
        </a>
        <a href="#" className="sidebar-option">
          <span className="material-symbols-outlined">tab_recent</span>
          Recent
        </a>
        <a href="#" className="sidebar-option">
          <span className="material-symbols-outlined">delete</span>
          Trash
        </a>
      </div> */}

    </div>
    )
}

export default Home

