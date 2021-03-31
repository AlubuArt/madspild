import {useState} from 'react'
import {signupUserInDatabase} from '../../service/login.service'
import {firebase_app } from '../../service/firebase.config'




const SignupPage = ({value, onChange}) => {

    const [email, setEmail] = useState();
    const [pass, setPass] = useState();

    const signup = async () => {
        try {
          await signupUserInDatabase(email, pass); 
        } catch (error) {
            console.log(error)
        }
        redirectToHomePageAfterSuccess()
        
    }

    const redirectToHomePageAfterSuccess = async () => {
        try{
            await firebase_app.auth().signInWithEmailAndPassword(email, pass);
            onChange(0)

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
        Signup!
        </>

    )
}

export default SignupPage;
