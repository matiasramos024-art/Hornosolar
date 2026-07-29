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
const led=document.querySelector(".ledEstado");

let datosRecibidos=false;
let temperatura=0;

function dibujarVelocimetro(temp)
{
    ctx.clearRect(0,0,320,220);

    //---------------------------------
    // Arco principal
    //---------------------------------

    const gradiente=ctx.createLinearGradient(40,0,280,0);

    gradiente.addColorStop(0,"#00ff55");
    gradiente.addColorStop(.5,"#ffe600");
    gradiente.addColorStop(1,"#ff3b30");

    ctx.beginPath();
    ctx.arc(160,170,120,Math.PI,0);

    ctx.lineWidth=10;
    ctx.strokeStyle=gradiente;
    ctx.stroke();

    //---------------------------------
    // Marcas
    //---------------------------------

    ctx.strokeStyle="white";
    ctx.fillStyle="white";
    ctx.font="16px Arial";
    ctx.textAlign="center";

    for(let i=0;i<=10;i++)
    {

        let ang=Math.PI+(i*Math.PI/10);

        let x1=160+Math.cos(ang)*102;
        let y1=170+Math.sin(ang)*102;

        let x2=160+Math.cos(ang)*120;
        let y2=170+Math.sin(ang)*120;

        ctx.beginPath();
        ctx.moveTo(x1,y1);
        ctx.lineTo(x2,y2);
        ctx.lineWidth=3;
        ctx.stroke();

        if(i<10)
        {
            let numero=i*5;

            let xn=160+Math.cos(ang)*85;
            let yn=170+Math.sin(ang)*85+5;

            ctx.fillText(numero,xn,yn);
        }

    }

    //---------------------------------
    // Aguja
    //---------------------------------

    let angulo=Math.PI+(temp/50)*Math.PI;

    let x=160+Math.cos(angulo)*90;
    let y=170+Math.sin(angulo)*90;

    ctx.beginPath();

    ctx.moveTo(160,170);
    ctx.lineTo(x,y);

    ctx.lineWidth=6;
    ctx.strokeStyle="#ff2222";
    ctx.stroke();

    //---------------------------------
    // Centro
    //---------------------------------

    ctx.beginPath();
    ctx.arc(160,170,10,0,2*Math.PI);
    ctx.fillStyle="#ff2222";
    ctx.fill();

    //---------------------------------
    // Texto °C
    //---------------------------------

    ctx.fillStyle="white";
    ctx.font="20px Arial";
    ctx.fillText("°C",160,145);
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

    if(valor==="FUNCIONANDO")
    {
        led.style.background="#00ff55";
        led.style.boxShadow="0 0 18px #00ff55";
    }
    else
    {
        led.style.background="#ff3333";
        led.style.boxShadow="0 0 18px #ff3333";
    }

});

apagar.onclick=async()=>{

    apagar.disabled=true;

    apagar.innerHTML="APAGANDO...";

    await apagarHorno();

    window.location.href="index.html";

};

dibujarVelocimetro(0);
