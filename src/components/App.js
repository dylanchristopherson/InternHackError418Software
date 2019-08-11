import React, { Component } from "react";
import Button from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";

const App = () => {
  return (
    <div className="App-header">
      <h3>Robot Control Main Menu</h3>

      <Link to="/CodeBlocks">
        <button>Click Here to Enter Robot Control Program</button>
      </Link>
      <Link to="/Info">
        <button>Information</button>
      </Link>
    </div>
  );
};
export default App;
