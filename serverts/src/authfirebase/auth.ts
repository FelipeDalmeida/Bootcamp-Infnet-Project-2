import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function signInWithEmailPassword(email: string, password: string) {

  // [START auth_signin_password]
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log(user)

      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return errorCode
    });



  // [END auth_signin_password]
}

export const singInModified = async (email: string, password: string) => { //função modificada para conseguir esperar resposta na pagina de login
  let err = { code: "" }
  const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    .catch((error) => {
      if (error) {
        console.log(error.message);
        err = { ...err, code: error.code }
      }
    })
  if(response){console.log(response.user?.uid)}
  return err
}

function signUpWithEmailPassword(email: string, password: string) {
  let err = { code: "" }
  // [START auth_signup_password]
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      // var errorMessage = error.message;
      err = { ...err, code: error.code }
      console.log(errorCode)
    });
  return err
  // [END auth_signup_password]
}

export const singUpModified = async (email: string, password: string) => {
  let err = { code: "" }
  const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch((error) => {
      if (error) {
        console.log(error.code);
        err = { ...err, code: error.code }
      }
    })

  return err

}

function sendPasswordReset() {
  const email = "sam@example.com";
  // [START auth_send_password_reset]
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}


export function verifyUserConected() {
  let response=false;
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logado")
      // ...
    } else {
      console.log("Deslogando")
    }
  });
  return response
}

export function singOut() {
  firebase.auth().signOut().then(function () {

    console.log("Sign-out successful.")
    // Sign-out successful.
  }).catch(function (error) {

    console.log("An error happened.")
    // An error happened.
  });
}
export { signInWithEmailPassword, signUpWithEmailPassword, }