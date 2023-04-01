import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import { auth } from './routes/auth'
import { pacientesController } from "./controllers/pacientesController";
import { antropometricaController } from "./controllers/avAntropometricaController";


// Firebase Inicio
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.FIREBASE_APIKEY,
    authDomain: process.env.FIREBASE_AUTHDOMAIN,
    projectId: process.env.FIREBASE_PROJECTID,
    storageBucket: process.env.FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
    appId: process.env.FIREBASE_APPID,
    measurementId: process.env.FIREBASE_MEASUREMENTID
  };
  

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig)

// Firebase Fim
// verifyUserConected()

const app=express();
app.use(express.json());
app.use(cors());
app.use("/auth",auth)
app.use("/pacientes",pacientesController)
app.use("/antropometrica",antropometricaController)
//app.use("/compcorp",compcorp)


const port =8080;
const host="0.0.0.0";

app.listen(port,host,()=>{
    console.log(`Servidor express iniciado em http://${host}:${port}`);
})



