import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { auth, db } from "../firebase/config";
import ReactMapGL, { Marker } from "react-map-gl";

import Clock from "react-live-clock";
import markerIcon from "../images/Marker.png";
import "../css/Map.css";

export default class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        latitude: 13.745627822680577,
        longitude: 100.53415690427192,
        zoom: 15,
      },
      user: auth().currentUser,
      notes: [],
      note: {},

      station: "siam",
      lati: "13.745627822680577",
      longi: "100.53415690427192",
    };
    this.handleSel = this.handleSel.bind(this);
    this.updateSel = this.updateSel.bind(this);
  }

  componentDidMount() {
    db.ref(`station/${this.state.station}`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  handleSel(e) {
    this.setState({
      station: e.target.value,
    });
  }

  updateSel() {
    db.ref(`station/${this.state.station}`).on("value", (snapshot) => {
      let allNotes = [];
      snapshot.forEach((snap) => {
        allNotes.push(snap.val());
      });
      console.log(allNotes);
      this.setState({ notes: allNotes });
    });
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.notes.map((note) => {
          return (
            <div>
              <ReactMapGL
                {...this.state.viewport}
                // latitude={parseFloat(note.latitude)}
                // longitude={parseFloat(note.longitude)}
                width="100vw"
                height="50vh"
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                mapStyle="mapbox://styles/mapbox/streets-v11"
                onViewportChange={(viewport) => this.setState({ viewport })}
              >
                <Marker
                  latitude={parseFloat(note.latitude)}
                  longitude={parseFloat(note.longitude)}
                  offsetLeft={-20}
                  offsetTop={-40}
                >
                  <a
                    href="https://www.siamparagon.co.th"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={markerIcon}
                      className="marker-icon"
                      alt="marker"
                    />
                  </a>
                </Marker>
              </ReactMapGL>
            </div>
          );
        })}

        <div className="mx-4 m-2 float-right">
          <p>
            Login in as: <strong>{this.state.user.email}</strong>
          </p>
          <p className="float-right">
            Current Time: <strong><Clock format={"HH:mm:ss"} ticking={true}/></strong>
          </p>
        </div>

        <div className="form-group">
          <div className="row m-2">
            <div className="col-md-3">
              <strong>Station Select</strong>
              <select
                class="form-control m-2"
                onChange={this.handleSel}
                value={this.state.station}
              >
                <option value="siam">Siam</option>
                <option value="asok">Asok</option>
                <option value="huaiKhwang">Huai Khwang</option>
                <option value="mochit">Mo Chit</option>
                <option value="thaphra">Tha Phra</option>
              </select>

              <div class="m-2">
                <button
                  class="btn-round btn btn-primary"
                  onClick={this.updateSel}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>

        <hr />

        {this.state.notes.map((note) => {
          return (
            <div className="card card-body shadow-sm m-4">
              <p>
                latitude : {note.latitude} | longitude : {note.longitude}
              </p>
              <p>ID station : {note.id}</p>
            </div>
          );
        })}

        <Footer />
      </div>
    );
  }
}
