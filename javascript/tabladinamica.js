document.addEventListener("DOMContentLoaded", iniciar)

function iniciar() {
    "use strict"
    /*LLAMO A LOS ELEMENTOS DEL DOM*/
    let URL = "http://web-unicen.herokuapp.com/api/groups/011CentenoHansen/conciertos"; /*url dse nuestra base de datos*/
    let tableBody = document.querySelector("#tablebody");
    let formulario = document.querySelector("#formulario");
    let fechaInput = document.querySelector("#fecha");
    let ciudadInput = document.querySelector("#ciudad");
    let estadioInput = document.querySelector("#estadio");
    let horaInput = document.querySelector("#hora");

    let datos = []; //cada vezq obtengo del servidor le voy a ir cargando los nuevos datos

    obtenerDelUrl();

    /*ESPERA EL CLICK PARA LLAMAR A LA FUNCION Q AGREGA NUEVOS DATOS */
    formulario.addEventListener("submit", function(event) {
        event.preventDefault();
        agregarDatos();
    })


    async function agregarDatos() {
        let nuevoEvento = { /*toma el dato que ingresa el usuario en el input y lo guarda dentro del objeto nuevoEvento */
            "thing": {
                "fecha": fechaInput.value,
                "ciudad": ciudadInput.value,
                "estadio": estadioInput.value,
                "hora": horaInput.value
            }
        };
        let post = await fetch(URL, {
            "method": "post", //aca le mando los datos a la url para q se me guardenn en algun llado xq sino al actualizar se pierden
            "mode": "cors", //relaja las restricciones de seguridad
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(nuevoEvento) //convierto mi objeto en cadena d caracteres
        })
        if (post.ok) {
            /*avisar al uruario q salio bien*/
        } else {
            /*avisar q hubo error*/
        }
        obtenerDelUrl();
    }

    async function obtenerDelUrl() { //me traigo los datos
        let peticion = await fetch(URL);
        peticion = await peticion.json(); //aca vuelvo a convertir mi objeto, q antes converti en cadena d caracteres, en objeto 
        actualizar(peticion.conciertos);
    }

    function actualizar(arreglo) { //aaca los proceso
        tableBody.innerHTML = ""; //dejo la tabla vacia
        datos = []; //dejo el arreglo vacio
        arreglo.forEach( /*recorre todo el arreglo*/
            function(concierto) {
                let fila = document.createElement("tr");
                let columnaFecha = document.createElement("td");
                let columnaCiudad = document.createElement("td");
                let columnaEstadio = document.createElement("td");
                let columnaHora = document.createElement("td");
                let borrarCelda = document.createElement("td");
                let modificar = document.createElement("td");
                let botonBorrar = document.createElement("button");
                let botonModificar = document.createElement("button");

                columnaFecha.innerHTML = concierto.thing.fecha; /*el dato que me intersa esta adentro del atributo thing*/
                columnaCiudad.innerHTML = concierto.thing.ciudad;
                columnaEstadio.innerHTML = concierto.thing.estadio;
                columnaHora.innerHTML = concierto.thing.hora;
                botonBorrar.innerHTML = "borrar";
                botonModificar.innerHTML = "modificar";

                fila.appendChild(columnaFecha);
                fila.appendChild(columnaCiudad);
                fila.appendChild(columnaEstadio);
                fila.appendChild(columnaHora);
                fila.appendChild(borrarCelda);
                borrarCelda.appendChild(botonBorrar);
                fila.appendChild(modificar);
                modificar.appendChild(botonModificar);

                tablebody.appendChild(fila);

                botonBorrar.addEventListener("click", function(e) {
                    e.preventDefault();
                    borrarEvento(concierto._id);

                });
                botonModificar.addEventListener("click", function(e) {
                    e.preventDefault();
                    modificarEvento(concierto._id);
                });

                let objeto = { /*se busca en el arreglo lo que se pide en el input*/
                    "id": concierto.id,
                    "fecha": concierto.thing.fecha,
                    "ciudad": concierto.thing.ciudad,
                    "estadio": concierto.thing.estadio,
                    "hora": concierto.thing.hora
                }
                datos.push(objeto);
            })
    }

    /*el boton borrar espera el click y llama a la funcion que borra los elementos de la tabla*/
    async function borrarEvento(id) { //busco el evento que quiero borrar atraves del id
        let URLborrar = URL + "/" + id;
        let respuesta = await fetch(URLborrar, {
            "method": "delete"
        });
        obtenerDelUrl();
    }

    async function modificarEvento(id) {
        let URLmodificar = URL + "/" + id;
        let objModificado = {
            "thing": {
                "fecha": fechaInput.value,
                "ciudad": ciudadInput.value,
                "estadio": estadioInput.value,
                "hora": horaInput.value
            }
        }
        let respuesta = await fetch(URLmodificar, {
            /*reeemplaza los datos, borrar y agrega la nuevo*/
            "method": "put",
            "mode": "cors",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(objModificado) //convierto mi objeto en cadena d caracteres
        });

        obtenerDeUrl();
    }
    /*el boton agregar varios epera el click, para agregar 3 filas con el contenido q el usuario introdujo en los input */
    let agregarVarios = document.querySelector("#botonAgregarVarios");
    agregarVarios.addEventListener("click", agregarVariosTabla);

    function agregarVariosTabla() {
        for (let i = 0; i < 3; i++) {
            agregarDatos();
        }

    }
    let filtro = document.querySelector("#filtro");

    let botonFiltro = document.querySelector("#botonFiltro");
    botonFiltro.addEventListener("click", function(e) {
        e.preventDefault();
        filtrado();
    });

    function filtrado() {
        let auxiliar = [];
        for (let i = 0; i < datos.length; i++) {

            if (datos[i].ciudad === filtro.value) {
                auxiliar.push(datos[i]); /*agrego el dato al arreglo auxiliar*/
            }
        }
        mostrarConFiltro(auxiliar);
    }

    function mostrarConFiltro(aux) { /*paaso por parametros el arreglo auxiliar filtrado*/
        tableBody.innerHTML = ""; //dejo la tabla vacia
        aux.forEach( /*recorre todo el arreglo*/
            function(concierto) { /*muestro solo lo que filtro*/
                let fila = document.createElement("tr");
                let columnaFecha = document.createElement("td");
                let columnaCiudad = document.createElement("td");
                let columnaEstadio = document.createElement("td");
                let columnaHora = document.createElement("td");
                let borrarCelda = document.createElement("td");
                let modificar = document.createElement("td");
                let botonBorrar = document.createElement("button");
                let botonModificar = document.createElement("button");

                columnaFecha.innerHTML = concierto.fecha; /*el dato que me intersa esta adentro del atributo thing*/
                columnaCiudad.innerHTML = concierto.ciudad;
                columnaEstadio.innerHTML = concierto.estadio;
                columnaHora.innerHTML = concierto.hora;
                botonBorrar.innerHTML = "borrar";
                botonModificar.innerHTML = "modificar";

                fila.appendChild(columnaFecha);
                fila.appendChild(columnaCiudad);
                fila.appendChild(columnaEstadio);
                fila.appendChild(columnaHora);
                fila.appendChild(borrarCelda);
                borrarCelda.appendChild(botonBorrar);
                fila.appendChild(modificar);
                modificar.appendChild(botonModificar);

                tablebody.appendChild(fila);

                botonBorrar.addEventListener("click", function(e) {
                    e.preventDefault();
                    borrarEvento(concierto.id);

                });
                botonModificar.addEventListener("click", function(e) {
                    e.preventDefault();
                    modificarEvento(concierto.id);
                });
            })
    }

    let botonQuitarFiltro = document.querySelector("#quitarFiltro");
    botonQuitarFiltro.addEventListener("click", function(e) {
        e.preventDefault();
        obtenerDelUrl();

    });
}