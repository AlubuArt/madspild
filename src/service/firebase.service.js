import {dbRef, db} from '../service/firebase.config';

const collRef = db.collection('overskudsmad');

export const addAfhentningToDataBase = async () => {

    const docRef = await collRef.add(afhentning);
    docRef.collection('varer').add({dummy: ''})
    console.log("Document oprette i DB:" + docRef.id)
    return docRef.id;

}



export const addVarerToAfhentning =   (data, currentAfhentning) => {

    const varerRef =  collRef.doc(currentAfhentning).collection('varer').doc();
    varerRef.set(data); 
}

export const getvarerFromDB = (currentAfhentning) => {

    const listOfVarer = [];
    const listRef = collRef.doc(currentAfhentning).collection('varer');
    listOfVarer.push(listRef);
    return listOfVarer;

}


const afhentning = ({

    afhentningssted: ' ',
    aftale: {
        aftager: '',
        kontrakr: ''
    },
    aktiv: false,
    betingelser: 'standard betingelser gælder',
    booketStatus: false,
    kontaktPerson: '',
    leverandør: '',
    tidsrum: '',
}

)

