import React, { Component } from "react";
import "../info.css";
function Info() {
  return (
    <div className="Info-background">
      <h1 className="header-1">Information</h1>
      <h2>What is Noodle by IBM?</h2>
      <p className="paragraph">
        NOODLE by IBM is an educational platform aimed at students in grades 4
        through 8 to introduce basic concepts of logical thinking, programming,
        and collaborative learning. By encouraging students to work together in
        teams of 2 to 5, Noodle by IBM aims to develop team work by solving a
        series of challenges.
      </p>
      <h2>How does NOODLE work?</h2>
      <p className="paragraph">
        Great question. Fix the styling on this page and then we can figure that
        out.
      </p>
      <h2> CHALLENGES </h2>
      <p className="paragraph">Navigate a Room: 50 pts</p>
      <p className="paragraph">
        Deliver a Cookie to a room you are not in: 100 pts
      </p>
      <p className="paragraph">Knock over obstacles like markers: 20 pts</p>
      <h2> GOOD LUCK!!</h2>
    </div>
  );
}
export default Info;
