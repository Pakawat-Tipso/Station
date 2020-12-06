import React, { Component } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

// import logo from "../images/logo.svg";
import first from "../images/01.png";
import second from "../images/02.png";
import third from "../images/03.png";

export default class HomePage extends Component {
  render() {
    return (
      // <div>
      //   <Header />
      //   <img src={logo} className="App-logo" alt="logo" />
      //   <Footer />
      // </div>
      <div>
        <Header />
        <div
          id="carouselExampleControls"
          class="carousel slide"
          data-ride="carousel"
        >
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img class="d-block w-100" src={first} alt="First slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={second} alt="Second slide" />
            </div>
            <div class="carousel-item">
              <img class="d-block w-100" src={third} alt="Third slide" />
            </div>
          </div>
          <a
            class="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a
            class="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
        <Footer />
      </div>
    );
  }
}
