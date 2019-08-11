import React, { Component } from "react";

import "../CodeBlocks.css"; // Pointless comment
import Select from "react-select";
import reactSelectCjsProd from "react-select/dist/react-select.cjs.prod";
//import ibmlogo from "./rebusibm.jpg"
import ibmlogo from "./IBM_LGBT_Logo_RGB.jpg"

export default class CodeBlocks extends Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }
  state = {
    idCount: 8,
    availableBlocks: [
      //hard coded list of the available blocks
      {
        id: 0,
        type: "Forward",
        status: "notInUse",
        name: "Forward",
        bgcolor: "green",
        time: 0
      },
      {
        id: 1,
        type: "Backward",
        status: "notInUse",
        name: "Backward",
        bgcolor: "red",
        time: 0
      },

      {
        id: 2,
        type: "left move",
        status: "notInUse",
        name: "L Forward",
        bgcolor: "green",
        time: 0
      },
      {
        id: 3,
        type: "left move",
        status: "notInUse",
        name: "L Backward",
        bgcolor: "red",
        time: 0
      },

      {
        id: 4,
        type: "right move",
        status: "notInUse",
        name: "R Forward",
        bgcolor: "green",
        time: 0
      },
      {
        id: 5,
        type: "right move",
        status: "notInUse",
        name: "R Backward",
        bgcolor: "red",
        time: 0
      },

      {
        id: 6,
        type: "beep",
        status: "notInUse",
        name: "Beep",
        bgcolor: "purple",
        time: 0
      },
      {
        id: 7,
        type: "wait",
        status: "notInUse",
        name: "Wait",
        bgcolor: "purple",
        time: 0
      }
    ],
    usedBlocks: []
  };

  sleep = milliseconds => {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > milliseconds) {
        break;
      }
    }
  };
  readBlocks = listOfBlocks => {
    var Particle = require("particle-api-js");
    var particle = new Particle();
    var token;

    particle
      .login({ username: "bryce.snell@ibm.com", password: "hackathon2019" })
      .then(
        function(data) {
          token = data.body.access_token;
        },
        function(err) {
          console.log("Could not log in.", err);
        }
      );

    var token = "4178173c4c7dd55e5370afb6f90b3041637bdfdc"; // from result of particle.login
    var devicesPr = particle.listDevices({ auth: token });

    devicesPr.then(
      function(devices) {
        console.log("Devices: ", devices);
      },
      function(err) {
        console.log("List devices call failed: ", err);
      }
    );

    var fnPr = particle.callFunction({
      deviceId: "P0",
      name: "wait",
      argument: "1",
      auth: token
    });
    console.log("I am starting!", listOfBlocks);
    this.sleep(1000);
    listOfBlocks.forEach(b => {
      console.log("inside forEach: ", b);
      if (b.name == "Forward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "forward",
          argument: "1",
          auth: token
        });
        console.log("I am going forward");
      } else if (b.name == "Backward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "backward",
          argument: "1",
          auth: token
        });
        console.log("I am going backward");
      } else if (b.name == "L Forward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "forwardL",
          argument: "1",
          auth: token
        });
        console.log("I am going left motor forward");
      } else if (b.name == "L Backward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "backwardL",
          argument: "1",
          auth: token
        });
        console.log("I am going left motor backward");
      } else if (b.name == "R Forward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "forwardR",
          argument: "1",
          auth: token
        });
      } else if (b.name == "R Backward") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "backwardR",
          argument: "1",
          auth: token
        });
      } else if (b.name == "Beep") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "buzz",
          argument: "1",
          auth: token
        });
      } else if (b.name == "Wait") {
        var fnPr = particle.callFunction({
          deviceId: "P0",
          name: "wait",
          argument: "1",
          auth: token
        });
      }
      this.sleep(1500);
    });

    fnPr.then(
      function(data) {
        console.log("Function called succesfully:", data);
      },
      function(err) {
        console.log("An error occurred:", err);
      }
    );
  };

  clearBlocks = blocks => {
    console.log("Clear Button Clicked");
    blocks = [];
    this.state.usedBlocks = [];
    this.setState({ clearBlocks: !this.state.clearBlocks }); //refreshes the screen to update the empty list
  };
  onDragStart = (ev, id) => {
    /* handles start of drag event for dragging and dropping */
    console.log("dragstart on: ", id);
    ev.dataTransfer.setData("id", id);
  };
  onDragOver = ev => {
    /*handles drag over event for dragging and dropping */
    ev.preventDefault();
  };
  onDrop = (ev, status) => {
    /*Handles Drop event for dragging and dropping */
    //ev.preventDefault();
    this.state.idCount = this.state.idCount + 1;
    let id = ev.dataTransfer.getData("id");

    let blk = this.state.availableBlocks.filter(b => {
      if (b.id == id) {
        //b.status = status;
        this.state.usedBlocks.push(b);
      }
      return b;
    });

    //let nodeCopy = document.getElementById(id).cloneNode(true);
    //nodeCopy.id = 8;

    //ev.target.appendChild(blk);

    this.setState({
      ...this.state,
      blk
    });
  };

  render() {
    var blocks = {
      inUse: [],
      notInUse: [],
      bkgImg: []
    };

    this.state.availableBlocks.forEach(b => {
      //go through the availableBlocks list and add them
      //to the blocks list as notInUse. Doing this helps
      //enable a 'toolbox' like effect where users can
      //drag and drop blocks from the available blocks area
      //as many times as they want. .
      if (b.type === "normal") {
        /* if the type of the current block is "normal"
        render a <div> element for a "normal" block */
        blocks["notInUse"].push(
          <div
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="true"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
            ref={this.ref}
          >
            {b.name}
          </div>
        );

      } else if (b.type == "Forward") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            onDragStart={e => this.onDragStart(e, b.id)}
            key={b.id}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "Backward") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>

          </div>
        );
      } else if (b.type == "left move") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "right move") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "beep") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "wait") {
        blocks["notInUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      }
    });

    this.state.usedBlocks.forEach(b => {
      if (b.type === "normal") {
        /* if the type of the current block is "normal"
          render a <div> element for a "normal" block */
        blocks["inUse"].push(
          <div
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            {b.name}
          </div>
        );

      } else if (b.type == "Forward") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={this.state.idCount}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "Backward") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "left move") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "right move") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "beep") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      } else if (b.type == "wait") {
        blocks["inUse"].push(
          <div
            id="mydiv"
            key={b.id}
            onDragStart={e => this.onDragStart(e, b.id)}
            draggable="false"
            className="draggable"
            style={{ backgroundColor: b.bgcolor }}
          >
            <div id="mydivheader"> {b.name} </div>
          </div>
        );
      }
    });

    return (
      <div className="container-drag">
        <h2 className="header">Robot Control Center</h2>
        <button
          className="button"
          onClick={() => {
            this.readBlocks(this.state.usedBlocks);
          }}
        >
          <span className="mdc-button__label">GO</span>
        </button>
        <button
          className="button"
          onClick={() => {
            this.clearBlocks(blocks.inUse);
          }}
        >
          <span className="mdc-button__label">Clear Code</span>
        </button>
        <div
          className="notInUse"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => {
            this.onDrop(e, "notInUse");
          }}
        >
          <span className="status-header">Toolbox</span>
          {blocks.notInUse}
        </div>
        <div
          className="inUse"
          onDragOver={e => this.onDragOver(e)}
          onDrop={e => this.onDrop(e, "inUse")}
        >
          <span className="status-header">Program Area</span>
          {blocks.inUse}
        </div>

          <img src={ibmlogo} alt="IBM image" />

      </div>
    );
  }
}