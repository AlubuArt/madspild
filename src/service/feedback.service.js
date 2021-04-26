import {db} from '../service/firebase.config';

const collFeedback = db.collection('evalueringer');


export const sendFeedbackToDatabase = async (user, data, uim) => {

   
   const docRef =  await collFeedback.doc(user).collection('sessioner').add({});
   docRef.set({
      uim: uim,
      data: data,
  
})
}


export const createTestSession = async (user) => {
   const docRef =  await  collFeedback.add({dummy: "dummy"})
   const ref = await docRef.collection('sessioner').add({});
   ref.set({
      dato: new Date(),
      infraStrukturOpbygning: "",
      infraStrukturSammenligning: "",
      tilpasningIndstllingsmuligheder: "",
      rigtIndhold: "",
      uim: ""

   })

}