import firebase from "firebase/app";

import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDIEN_X9rs4nwMqFeev0KsqNahCFqDRdP0",
  authDomain: "station-dbrealtime.firebaseapp.com",
  databaseURL: "https://station-dbrealtime.firebaseio.com",
  projectId: "station-dbrealtime",
  storageBucket: "station-dbrealtime.appspot.com",
  messagingSenderId: "580913654472",
  appId: "1:580913654472:web:851915830248e8e3c693fd",
  measurementId: "G-VZFNGT2SCM",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;
export const db = firebase.database();
