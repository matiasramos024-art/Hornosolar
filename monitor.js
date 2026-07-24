import{

escucharTemperatura,

escucharHumedad,

escucharEstado,

apagarHorno

}

from "./firebase.js";

const canvas=document.getElementById("velocimetro");

const ctx=canvas.getContext("2d");

const txtTemp=document.getElementById("valorTemp");

const txtHum=document.getElementById("valorHum");

const estado=document.getElementById("estado");

const agua=document.getElementById("agua");

const apagar=document.getElementById("btnApagar");

const espera=document.getElementById("espera");
const instrumentos=document.getElementById("instrumentos");

let datosRecibidos=false;

let temperatura=0;

function dibujarVelocimetro(temp)
{

ctx.clearRect(0,0,320,220);

ctx.beginPath();

ctx.arc(160,170,120,Math.PI,0);

ctx.lineWidth=8;

ctx.strokeStyle="white";

ctx.stroke();

for(let i=0;i<=10;i++)
{

let ang=Math.PI+(i*Math.PI/10);

let x1=160+Math.cos(ang)*105;

let y1=170+Math.sin(ang)*105;

let x2=160+Math.cos(ang)*120;

let y2=170+Math.sin(ang)*120;

ctx.beginPath();

ctx.moveTo(x1,y1);

ctx.lineTo(x2,y2);

ctx.stroke();

}

let angulo=Math.PI+(temp/50)*Math.PI;

let x=160+Math.cos(angulo)*90;

let y=170+Math.sin(angulo)*90;

ctx.beginPath();

ctx.moveTo(160,170);

ctx.lineTo(x,y);

ctx.lineWidth=5;

ctx.strokeStyle="red";

ctx.stroke();

ctx.beginPath();

ctx.arc(160,170,8,0,2*Math.PI);

ctx.fillStyle="red";

ctx.fill();

}

escucharTemperatura((valor)=>{

if(valor===null)
    return;

temperatura=valor;

if(!datosRecibidos)
{
    datosRecibidos=true;

    espera.style.display="none";
    instrumentos.style.display="flex";
}

txtTemp.innerHTML=temperatura.toFixed(1)+" °C";

dibujarVelocimetro(temperatura);

});

escucharHumedad((valor)=>{

valor=valor||0;

txtHum.innerHTML=valor.toFixed(0)+" %";

agua.style.height=valor+"%";

});

escucharEstado((valor)=>{

estado.innerHTML=valor;

});

apagar.onclick=async()=>{

await apagarHorno();

window.location.href="index.html";

};

dibujarVelocimetro(0);