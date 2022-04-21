"use strict";

let numero = Math.floor(Math.random() * 100); //se crea un num aleatorio y se guarda en la variable NUMERO//
console.log(numero);

document.querySelector("#numeroAleatorio").innerHTML = "Ingrese el siguiente numero: " + numero; //imprimo por pantalla el numero aleatorio//

let boton = document.querySelector("#enviar");
boton.addEventListener("click", captcha); //espera a q haga click en ENVIAR//

function captcha(event) { //funcion q se dispara al hacer click en enviar//
    event.preventDefault(); //para que la info del formulario no se copie en la url//
    //console.log("captcha");
    let valorIngresado = parseInt(document.getElementById("captchainput").value); //traigo lo que la persona ingreso y lo parseo(convierto) para poder compararlo//
    //parseInt(valorIngresado);

    if (numero === valorIngresado) {
        //lleva al html atravez del id leer//
        //alert("es correcto");
        document.querySelector("#leer").innerHTML = "el numero ingresado es correcto";
        console.log(numero);
        console.log(valorIngresado);
        return true


    } else {
        document.querySelector("#leer").innerHTML = "el numero ingresado es incorrecto";
        console.log(numero);
        console.log(valorIngresado);
        //alert("el captcha es incorrecto");
        return false;
    }

}