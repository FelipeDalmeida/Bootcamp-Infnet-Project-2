import dotenv from "dotenv";
dotenv.config();

import express from 'express';
import cors from 'cors';
import {pacientes} from "./routes/pacientes"
import { antropometrica } from './routes/avAntropometrica';
import { compcorp } from './routes/avComposicaoCorportal';
import { auth } from './routes/auth'


// Firebase Inicio
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDK1Q207NqneW0Aw9zLyzN0Ih5UDzWoo-E",
    authDomain: "treinohard.firebaseapp.com",
    projectId: "treinohard",
    storageBucket: "treinohard.appspot.com",
    messagingSenderId: "768996095831",
    appId: "1:768996095831:web:0b7005133bc39ecd75f012",
    measurementId: "G-3LDXRPQGX6"
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
app.use("/pacientes",pacientes)
app.use("/antropometrica",antropometrica)
app.use("/compcorp",compcorp)


const port =8080;
const host="0.0.0.0";

app.listen(port,host,()=>{
    console.log(`Servidor express iniciado em http://${host}:${port}`);
})



