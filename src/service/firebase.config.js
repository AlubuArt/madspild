import firebase from "firebase/app";
import 'firebase/firestore';
import "firebase/auth";
import 'firebase/database'
import 'firebase/storage';

const config = require("./app_config.json")

// Firebase 
export const firebase_app = firebase.initializeApp({

    apiKey: config.firebase.apiKey,
    authDomain:config.firebase.authDomain,
    databaseURL: config.firebase.databaseURL,
    projectId: config.firebase.projectId,
    storageBucket: config.firebase.storageBucket,
    messagingSenderId: config.firebase.messagingSenderId,
    appId:config.firebase.appId,
    measurementId: config.firebase.measurementId

});


export const db =  firebase.firestore();
export const dbRef = firebase.database();




