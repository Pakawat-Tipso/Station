import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/config";

import QRCode from "qrcode.react";
import Clock from "react-live-clock";
import moment from "moment";

import "../css/Profile.css";

import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BsIcons from "react-icons/bs";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser,
      notes: [],
      note: {},

      fName: "",
      lName: "",
      id: "",
      money: 0,
      address: "",
      city: "",
      country: "",
      zipCode: "",
    };
    this.handlefName = this.handlefName.bind(this);
    this.handlelName = this.handlelName.bind(this);
    this.handleID = this.handleID.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
    this.handleCity = this.handleCity.bind(this);
    this.handleCountry = this.handleCountry.bind(this);
    this.handleZipCode = this.handleZipCode.bind(this);

    this.createInfo = this.createInfo.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  componentDidMount() {
    db.ref(`user/${this.state.user.uid}/data`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  handlefName(e) {
    this.setState({
      fName: e.target.value,
    });
  }

  handlelName(e) {
    this.setState({
      lName: e.target.value,
    });
  }

  handleID(e) {
    this.setState({
      id: e.target.value,
    });
  }

  handleAddress(e) {
    this.setState({
      address: e.target.value,
    });
  }

  handleCity(e) {
    this.setState({
      city: e.target.value,
    });
  }

  handleCountry(e) {
    this.setState({
      country: e.target.value,
    });
  }

  handleZipCode(e) {
    this.setState({
      zipCode: e.target.value,
    });
  }

  createInfo() {
    const uid = this.state.user.uid;
    const { fName, lName, id, money, address, city, country, zipCode } = this.state;
    const date = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;
    db.ref(`user/${uid}/data/user-info`)
      .set({
        fName,
        lName,
        id,
        address,
        city,
        country,
        zipCode,
        date,
      })
      .then((_) => {
        this.setState({
          fName: fName,
          lName: lName,
          id: id,
          address: address,
          city: city,
          country: country,
          zipCode: zipCode,
        });
      })
      .catch((error) => console.log(error.message));

      db.ref(`user/${uid}/card/card-info`)
      .set({
        id,
        money,
        date,
      })
      .catch((error) => console.log(error.message));
  }

  deleteNote() {
    db.ref(`user/${this.state.user.uid}/user-Info`).remove();
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
            Current Time:{" "}
            <strong>
              <Clock format={"HH:mm:ss"} ticking={true} />
            </strong>
          </p>
        </div>

        {this.state.notes.map((note) => {
          return (
            <div className="content">
              <div className="row justify-content-center">
                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="text-muted card-title">Card Info</div>
                          <p className="card-text font-card">{note.id}</p>
                        </div>
                        <div className="col-4">
                          <FaIcons.FaMoneyCheck
                            className="icon-items"
                            color="#ef8157"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <a href="/payment">
                        <AiIcons.AiFillPlusCircle /> Add Money
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-sm-6 col-md-6 col-lg-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="row">
                        <div className="col">
                          <div className="text-muted card-title">Info</div>
                          <p className="card-text font-card">
                            {note.fName} {note.lName}
                          </p>
                        </div>
                        <div className="col-4">
                          <BsIcons.BsPersonFill
                            className="icon-items"
                            color="#51cbce"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="card-footer">
                      <small className="text-muted">{note.date}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <hr />

        <div className="container col-md-8">
          <div className="card card-signin my-5">
            <div className="card-header">
              <h5 className="card-title">Profile Info</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="pr-1 col-md-6">
                  <div className="form-group">
                    <label>First Name</label>
                    <input
                      placeholder="First Name"
                      type="text"
                      className="form-control"
                      onChange={this.handlefName}
                      value={this.state.fName}
                    />
                  </div>
                </div>
                <div className="pl-1 col-md-6">
                  <div className="form-group">
                    <label>Last Name</label>
                    <input
                      placeholder="Last Name"
                      type="text"
                      className="form-control"
                      onChange={this.handlelName}
                      value={this.state.lName}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>ID No.</label>
                    <input
                      placeholder="No."
                      type="text"
                      className="form-control"
                      onChange={this.handleID}
                      value={this.state.id}
                      required
                    />
                  </div>
                </div>
                <div className="px-1 col-md-6">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      placeholder={this.state.user.email}
                      disabled
                      type="email"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Address</label>
                    <input
                      placeholder="Address"
                      type="text"
                      className="form-control"
                      onChange={this.handleAddress}
                      value={this.state.address}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="pr-1 col-md-4">
                  <div className="form-group">
                    <label>City</label>
                    <input
                      placeholder="City"
                      type="text"
                      className="form-control"
                      onChange={this.handleCity}
                      value={this.state.city}
                    />
                  </div>
                </div>
                <div className="px-1 col-md-4">
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      placeholder="Country"
                      type="text"
                      className="form-control"
                      onChange={this.handleCountry}
                      value={this.state.country}
                    />
                  </div>
                </div>
                <div className="pl-1 col-md-4">
                  <div className="form-group">
                    <label>Postal Code</label>
                    <input
                      placeholder="ZIP Code"
                      type="number"
                      className="form-control"
                      onChange={this.handleZipCode}
                      value={this.state.zipCode}
                    />
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="ml-auto mr-auto">
                  <button
                    class="btn-round btn btn-primary mx-1"
                    onClick={this.createInfo}
                  >
                    Update
                  </button>
                  <button
                    class="btn-round btn btn-danger mx-1"
                    onClick={this.deleteNote}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {this.state.notes.map((note) => {
          return (
            <div className="container">
              <div className="row justify-content-center">
                <QRCode
                  value={
                    "First Name : " +
                    note.fName +
                    " || Last Name : " +
                    note.lName +
                    " || Email : " +
                    this.state.user.email +
                    " || ID Card : " +
                    note.id +
                    " || Address : " +
                    note.address +
                    " || City : " +
                    note.city +
                    " || Country : " +
                    note.country +
                    " || Zip Code : " +
                    note.zipCode
                  }
                />
              </div>
            </div>
          );
        })}
        <Footer />
      </div>
    );
  }
}
