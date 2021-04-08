import {firebase_app} from '../service/firebase.config'
import 'firebase/storage';

const db = firebase_app.firestore()
const coll = db.collection('users/')

export const signupUserInDatabase = async (data, pass) => {

    const userObj = await firebase_app.auth().createUserWithEmailAndPassword(data.kontaktEmail, pass);
    const user = userObj.user;
    const userID = user.uid;
    await coll.doc(userID).set({
        userID: userID,
        virksomhedsNavn: data.virksomhedsNavn,
        virksomhedsCVR: data.virksomhedsCVR, 
        kontaktEmail: data.kontaktEmail
    })

    localStorage.setItem('userID', userID);
    localStorage.setItem("authenticated", true)
}


export const loginUser = async (email, pass) => {

    const loggedInUser = await firebase_app.auth().signInWithEmailAndPassword(email, pass);
    const uid = loggedInUser.user.uid;
    localStorage.setItem('userID', uid);
    localStorage.setItem("authenticated", true)
}

export const logoutUser = async () => {
    localStorage.removeItem('userID')
    localStorage.removeItem('authenticated');
    firebase_app.auth().signOut()
}