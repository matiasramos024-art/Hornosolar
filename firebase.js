//==================================================
// FIREBASE.JS
// HORNO SOLAR PARA SECADO DE MADERA
//==================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


//==================================================
// CONFIGURACIÓN FIREBASE
//==================================================

const firebaseConfig = {

    apiKey: "AIzaSyCW-33fyIQrNTRHJXhXwgLf1dvTAp9iBhY",

    authDomain: "hornosolarmadera.firebaseapp.com",

    databaseURL: "https://hornosolarmadera-default-rtdb.firebaseio.com",

    projectId: "hornosolarmadera",

    storageBucket: "hornosolarmadera.firebasestorage.app",

    messagingSenderId: "364459845091",

    appId: "1:364459845091:web:6ba34abccbc20b1dabacd6"

};


//==================================================
// INICIALIZAR FIREBASE
//==================================================

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);


//==================================================
// REFERENCIAS
//==================================================

// Control del horno
const refEnviar = ref(db, "enviar");

// Datos enviados por el ESP32
const refTemperatura = ref(db, "temperatura");
const refHumedad     = ref(db, "humedad");
const refEstado      = ref(db, "estado");


//==================================================
// CONTROL DEL HORNO
//==================================================

export function iniciarHorno()
{
    return set(refEnviar, 1);
}

export function apagarHorno()
{
    return set(refEnviar, 0);
}


//==================================================
// TEMPERATURA
//==================================================

export function escucharTemperatura(callback)
{
    onValue(refTemperatura, (snapshot) =>
    {
        callback(snapshot.val());
    });
}


//==================================================
// HUMEDAD
//==================================================

export function escucharHumedad(callback)
{
    onValue(refHumedad, (snapshot) =>
    {
        callback(snapshot.val());
    });
}


//==================================================
// ESTADO
//==================================================

export function escucharEstado(callback)
{
    onValue(refEstado, (snapshot) =>
    {
        callback(snapshot.val());
    });
}
