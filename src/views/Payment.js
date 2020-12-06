import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/config";

import QRCode from "qrcode.react";
import Clock from "react-live-clock";
import moment from "moment";
import generatePayload from "promptpay-qr";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: auth().currentUser,
      notes: [],
      note: {},

      phone: "",
      amount: 0,
      promptId: "",
    };
    this.handlePhone = this.handlePhone.bind(this);
    this.handleAmount = this.handleAmount.bind(this);

    this.createPayment = this.createPayment.bind(this);
    this.createPrompt = this.createPrompt.bind(this);
  }

  componentDidMount() {
    const x = document.getElementById("QRCode");
    x.style.display = "none";

    db.ref(`user/${this.state.user.uid}/card`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  handlePhone(e) {
    this.setState({
      phone: e.target.value,
    });
  }

  handleAmount(e) {
    this.setState({
      amount: e.target.value,
    });
  }

  createPrompt(e) {
    const phoneNum = this.state.phone;
    const amountNum = parseFloat(this.state.amount);
    const generateOR = generatePayload(phoneNum, { amount: amountNum });
    this.setState({
      promptId: generateOR,
    });

    const x = document.getElementById("QRCode");
    if (x.style.display === "none") {
      x.style.display = "block";
    }
  }

  createPayment() {
    const uid = this.state.user.uid;
    const { phone, amount } = this.state;
    const unix_id = `unix-${Date.now()}`; // Unix Timestamp https://www.unixtimestamp.com
    const date = `${moment().format("MMMM Do YYYY, h:mm:ss a")}`;
    db.ref(`user/${uid}/payment/${unix_id}`)
      .set({
        phone,
        amount,
        date,
      })
      .then((_) => {
        this.setState({
          phone: "",
          amount: 0,
        });
      })
      .catch((error) => console.log(error.message));
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

        <div className="container col-md-6">
          <div className="card card-signin my-5">
            <div className="card-header">
              <h5 className="card-title">Payment Method</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
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
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      placeholder="Number"
                      type="number"
                      className="form-control"
                      onChange={this.handlePhone}
                      value={this.state.phone}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Amount</label>
                    <input
                      placeholder="#"
                      type="number"
                      className="form-control"
                      onChange={this.handleAmount}
                      value={this.state.amount}
                      required
                    />
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="ml-auto mr-auto">
                  <button
                    class="btn-round btn btn-primary mx-1"
                    onClick={this.createPayment}
                  >
                    Submit
                  </button>
                  <button
                    class="btn-round btn btn-primary mx-1"
                    onClick={this.createPrompt}
                  >
                    PromptPay
                  </button>
                </div>
              </div>

              <div className="container">
                <div className="row justify-content-center my-4">
                  <div id="QRCode">
                    <QRCode value={this.state.promptId} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }
}
