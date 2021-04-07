import {dbRef, db} from '../service/firebase.config';

const collRef = db.collection('overskudsmad');
const collUser = db.collection('users')

export const addAfhentningToDataBase = async (userID) => {
    const docRef = await collRef.add({});
    docRef.set({
        afhentningsadresse: ' ',
        by: '',
        postnummer: '',
        aftale: {
            aftager: '',
            kontrakr: ''
        },
        aktiv: "ikke oprettet",
        betingelser: 'standard betingelser gælder',
        booketStatus: false,
        kontaktPerson: '',
        tidsrumFra: '',
        tidsrumTil: '',
        id: docRef.id,
        userID: userID
        
    })
    return docRef.id;
}


export const addVarerToAfhentning =   (data, currentAfhentning) => {
    const varerRef =  collRef.doc(currentAfhentning).collection('varer').doc();
    varerRef.set({
        title: data.title,
        mængdeEnhed: data.mængdeEnhed,
        mængde: data.mængde,
        id: varerRef.id
    }); 
}

export const getvarerFromDB = async (currentAfhentning) => {
    const result = []
    const ref = db.collection('overskudsmad/' + currentAfhentning + '/varer')
    await ref.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    return result;
}

export const deleteVarerFromAfhentning = (currentAfhentning, docID) => {
    db.collection('overskudsmad/' + currentAfhentning + '/varer').doc(docID).delete();
    return
}

export const redigerVareInDatabase = (currentAfhentning, docID) => {
    db.collection('overskudsmad/' + currentAfhentning + '/varer').doc(docID)
}

export const getSelectedVareFromDatabase = async (currentAfhentning, docID) => {
    const ref =  db.collection('overskudsmad/' + currentAfhentning + '/varer');
    const selected = await ref.doc(docID).get()
    console.log(selected.data())
   
}

export const setAfhentningToActive = (currentAfhentning, data) => {
    const ref = collRef.doc(currentAfhentning).update(data)
}

export const getAfhentningFromDatabase = async (currentAfhentning) => {
    const ref = await collRef.doc(currentAfhentning).get();
    console.log(ref.data())
    return ref.data();
}

export const getAfhentningerFromDatabase = async () => {
    const result = []
    await collRef.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data())
        })
    })
    return result;
}

export const getUsersAfhentninger = async (userID) => {
    const result = []
    await collRef.where('userID', "==", userID).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            result.push(doc.data());
        })
    })
    return result;


}

export const sletAfhentningFraDatabase = (docID) => {
    collRef.doc(docID).delete();
    db.collection('overskudsmad/' + docID + '/varer').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           const deleteDoc = doc.id;
           db.collection('overskudsmad/' + docID + '/varer').doc(deleteDoc).delete();
           
        })
    
    })
    return
}


export const updateUserDataInDatabase = (userData, userID) => {
    var ref = collUser.doc(userID);
    ref.set({
        virksomhedsCVR: userData.virksomhedsCVR,
        afhentningsadresse: userData.afhentningsadresse,
        by: userData.by,
        postnummer: userData.postnummer,
        tidsrum: userData.tidsrum,
        kontaktPerson: userData.kontaktPerson,
        note: userData.note,
        kontaktEmail: userData.kontaktEmail,
        virksomhedsNavn: userData.virksomhedsNavn, 
    }, {merge: true})

}

export const getUserData = async (userID) => {
    var data; 
    var ref = collUser.doc(userID);
    await ref.get().then((doc) => {
        data = doc.data();
    })
    return data;
}

