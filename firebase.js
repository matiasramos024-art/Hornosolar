//==================================================
// FIREBASE.JS
// HORNO SOLAR PARA SECADO DE MADERA
//==================================================

// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    get,
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

const refEnviar = ref(db, "enviar");

const refTemperatura = ref(db, "horno/temperatura");

const refHumedad = ref(db, "horno/humedad");

const refEstado = ref(db, "horno/estado");


//==================================================
// ESCRIBIR EN FIREBASE
//==================================================

export function iniciarHorno()
{
    return set(refEnviar,1);
}

export function apagarHorno()
{
    return set(refEnviar,0);
}


//==================================================
// LEER TEMPERATURA
//==================================================

export function escucharTemperatura(callback)
{
    onValue(refTemperatura,(snapshot)=>
    {
        callback(snapshot.val());
    });
}


//==================================================
// LEER HUMEDAD
//==================================================

export function escucharHumedad(callback)
{
    onValue(refHumedad,(snapshot)=>
    {
        callback(snapshot.val());
    });
}


//==================================================
// LEER ESTADO
//==================================================

export function escucharEstado(callback)
{
    onValue(refEstado,(snapshot)=>
    {
        callback(snapshot.val());
    });
}