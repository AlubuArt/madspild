import {firebase_app} from '../service/firebase.config'
import 'firebase/storage';


const token = 'lnnlnsa0cjejviue90vbpncasknerfcvubqqwnsocxdp'
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
    localStorage.setItem('token', token)

}