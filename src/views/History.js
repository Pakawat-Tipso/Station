import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/config";

import Clock from "react-live-clock"
import moment from "moment"
import "../css/History.css";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser,
      notes: [],
      note: {},

      Inbound: "",
      Outbound: "",
      TimeIn: "",
      TimeOut: "",
      Price: ""
    };
    this.handleIN = this.handleIN.bind(this);
    this.handleOUT = this.handleOUT.bind(this);
    this.handleTimeIN = this.handleTimeIN.bind(this);
    this.handleTimeOUT = this.handleTimeOUT.bind(this);
    this.handlePrice = this.handlePrice.bind(this);

    this.createNote = this.createNote.bind(this);
  }

  componentDidMount() {
    db.ref(`user/${this.state.user.uid}/history`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  handleIN(e) {
    this.setState({
      Inbound: e.target.value,
    });
  }

  handleOUT(e) {
    this.setState({
      Outbound: e.target.value,
    });
  }

  handleTimeIN(e) {
    this.setState({
      TimeIn: e.target.value,
    });
  }

  handleTimeOUT(e) {
    this.setState({
      TimeOut: e.target.value,
    });
  }

  handlePrice(e) {
    this.setState({
      Price: e.target.value,
    });
  }

  createNote() {
    const uid = this.state.user.uid;
    const { Inbound, Outbound, TimeIn, TimeOut, Price } = this.state;
    const unix_id = `unix-${Date.now()}`; // Unix Timestamp https://www.unixtimestamp.com
    const date = `${moment().format('MMMM Do YYYY, h:mm:ss a')}`;
    db.ref(`user/${uid}/history/${unix_id}`)
      .set({
        Inbound,
        Outbound,
        TimeIn,
        TimeOut,
        Price,
        date
      })
      .then((_) => {
        this.setState({
          Inbound: "",
          Outbound: "",
          TimeIn: "",
          TimeOut: "",
          Price: ""
        });
      })
      .catch((error) => console.log(error.message));
  }

  deleteNote(note_id) {
    db.ref(`user/${this.state.user.uid}/history/${note_id}`).remove();
  }

  render() {
    return (
      <div>
        <Header />
        <div className="mx-4">
          <p>
            Login in as: <strong>{this.state.user.email}</strong>
          </p>
          <p>
            Current Time: <strong><Clock format={"HH:mm:ss"} ticking={true}/></strong>
          </p>
        </div>

        {this.state.notes.map((note) => {
          return (
            <div className="card card-body shadow-sm m-4">
              <p>
                Inbound : {note.Inbound} | {note.TimeIn}
              </p>
              <p>
                Outbound : {note.Outbound} | {note.TimeOut}
              </p>
              <p>
                Price : <span>-{note.Price}</span>
              </p>
              <div class="ml-auto mr-auto">
                <button
                  className="btn-round btn btn-danger"
                  onClick={() => this.deleteNote(note.note_id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
        <hr />
        <div className="form-group mx-4">
          <div className="row">
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Inbound"

                onChange={this.handleIN}
                value={this.state.Inbound}
              />
            </div>
            <div className="col-md-3">
              <input
                className="form-control"
                placeholder="Outbound"

                onChange={this.handleOUT}
                value={this.state.Outbound}
              />
            </div>
            <div className="col-md-2">
              <input
              type="number"
                className="form-control"
                placeholder="Price"

                onChange={this.handlePrice}
                value={this.state.Price}
              />
            </div>
          </div>

          <div className="row my-2">
            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Time In"
                
                onChange={this.handleTimeIN}
                value={this.state.TimeIn}
              />
            </div>
            <div className="col-md-2">
              <input
                className="form-control"
                placeholder="Time Out"

                onChange={this.handleTimeOUT}
                value={this.state.TimeOut}
              />
            </div>
          </div>

          <button className="btn btn-success mt-3" onClick={this.createNote}>
            Create Note
          </button>
        </div>
        <Footer />
      </div>
    );
  }
}
