import {dbRef, db} from '../service/firebase.config';

const collRef = db.collection('overskudsmad');

export const addAfhentningToDataBase = async () => {
    const docRef = await collRef.add(afhentning);
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

}

export const setAfhentningToActive = (currentAfhentning, data) => {
    const ref = collRef.doc(currentAfhentning).update(data)
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

