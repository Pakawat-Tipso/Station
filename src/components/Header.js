import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase/config";

function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Station
        </Link>
        <div
          className="collapse navbar-collapse justify-content-end"
        >
          {auth().currentUser ? (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/profile">
                Profile
              </Link>

              <Link className="nav-item nav-link" to="/payment">
                Payment
              </Link>

              <Link className="nav-item nav-link" to="/history">
                History
              </Link>

              <Link className="nav-item nav-link" to="/map">
                Map
              </Link>

              <button
                className="btn btn-primary"
                onClick={() => auth().signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="navbar-nav">
              <Link className="nav-item nav-link" to="/login">
                Sign In
              </Link>
              <Link className="nav-item nav-link" to="/signup">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;