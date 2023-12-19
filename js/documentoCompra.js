/* Numero de Orden */
let numeroAleatorio1 = Math.random();
let numeroDeOrden = Math.floor(numeroAleatorio1 * 1000);

/* Numero De Cuil */
let numeroAleatorio2 = Math.random();
let numeroDeCuil = Math.floor(numeroAleatorio2 * 100000);

/* Numero Aletorio */
let numeroAleatorio3 = Math.random();
let numeroAletorioSolo = Math.floor(numeroAleatorio2 * 9);

/* Fecha de Hoy */
let fechaActual = new Date();

let dia = fechaActual.getDate();
let mes = fechaActual.getMonth() + 1;
let anio = fechaActual.getFullYear();

let fechaDeHoy = dia + '/' + mes + '/' + anio;

/* Hora Actual */
var horaActual = new Date();

var horas = horaActual.getHours();
var minutos = horaActual.getMinutes();
var segundos = horaActual.getSeconds();

var horaDeHoy = horas + ':' + minutos + ':' + segundos;

/* Datos de la Persona */
let datosDelCliente = JSON.parse(localStorage.getItem("datosDelComprador"))

let nombreDelCliente = datosDelCliente.nombre;
let apellidoDelCliente = datosDelCliente.apellido;
let dniDelCliente = datosDelCliente.dni;

console.log(nombreDelCliente);
console.log(apellidoDelCliente);
console.log(dniDelCliente);

/* Productos Comprados */
let productosComprados = JSON.parse(localStorage.getItem("productosEnElCarro"))


/* Preparar Tiquet */
document.querySelector("#idTiqueContenido").innerHTML = "";

document.querySelector("#idTiqueContenido").innerHTML = `
    <h2 class="tiqueNumeroDeOrden">NRO ORDEN: ${numeroDeOrden}</h2>
    <hr>
    <div class="tiqueContendorInfoMac">
        <p class="tiqueContendorInfoMacP">ARCOS DORADOS ARGENTINA SOCIEDAD ANONIMA.</p>
        <p class="tiqueContendorInfoMacP">CUIT Nro: ${numeroAletorioSolo}-${numeroDeCuil}-${numeroAletorioSolo + numeroAletorioSolo}</p>
        <p class="tiqueContendorInfoMacP">Ing. Brutos ${numeroAletorioSolo + numeroAletorioSolo}-${numeroDeCuil}-${numeroAletorioSolo}</p>
        <p class="tiqueContendorInfoMacP">Direción: Anónima.</p>
        <p class="tiqueContendorInfoMacP">Inicio de actividades: 04/02/1986</p>
    </div>
    <hr>
    <div class="tiqueContendorInfoActual">
                <div class="row tiqueContendorInfoActualDates">
                    <div class="col-xl-6 col-md-6 col-sm-12 tiqueContendorInfoActualDatesSub">
                        <p class="tiqueContendorInfoActualP">Fecha Hoy: ${fechaDeHoy}</p>
                    </div>
                    <div class="col-xl-6 col-md-6 col-sm-12 tiqueContendorInfoActualDatesSub">
                        <p class="tiqueContendorInfoActualP">Hora: ${horaDeHoy}</p>
                    </div>
                </div>
                <div class="row tiqueContendorInfoActualCliente">
                    <div class="col-xl-6 col-md-6 col-sm-12 tiqueContendorInfoActualClienteSub">
                        <p class="tiqueContendorInfoActualP">Nombre: ${nombreDelCliente}</p>
                        <p class="tiqueContendorInfoActualP">Apellido: ${apellidoDelCliente}</p>
                    </div>
                    <div class="col-xl-6 col-md-6 col-sm-12 tiqueContendorInfoActualClienteSub">
                        <p class="tiqueContendorInfoActualP">Dni: ${dniDelCliente}</p>
                    </div>
                </div>
            </div>
            <hr>
`;

if (localStorage.getItem("precioDolarActivado") == "true") {
    productosComprados.forEach(productoComprado => {
        div1 = document.createElement("div");
        div1.classList.add("tiqueContendorProductos")
        div1.innerHTML = `
                    <p class="tiqueContendorProductosP">ID - ${productoComprado.id}</p>
                    <p class="tiqueContendorProductosP">Alimento - ${productoComprado.nombre}</p>
                    <p class="tiqueContendorProductosP">Precio - ${productoComprado.precioDolar}$</p>
                    <p class="tiqueContendorProductosP">(Cantidad: ${productoComprado.cantidad})</p>
                    <hr>
        `
        document.querySelector("#idTiqueContenido").append(div1);
    });

    precioFinal = document.createElement("p");
    precioFinal.classList.add("tiquePrecioTotal")
    precioFinal.innerHTML = `
        TOTAL: $${localStorage.getItem("precioTotalDolar")}
    `
    document.querySelector("#idTiqueContenido").append(precioFinal);

}else{

    productosComprados.forEach(productoComprado => {
        div1 = document.createElement("div");
        div1.classList.add("tiqueContendorProductos")
        div1.innerHTML = `
                    <p class="tiqueContendorProductosP">ID - ${productoComprado.id}</p>
                    <p class="tiqueContendorProductosP">Alimento - ${productoComprado.nombre}</p>
                    <p class="tiqueContendorProductosP">Precio - ${productoComprado.precioPesos}$</p>
                    <p class="tiqueContendorProductosP">(Cantidad: ${productoComprado.cantidad})</p>
                    <hr>
        `
        document.querySelector("#idTiqueContenido").append(div1);
    });

    precioFinal = document.createElement("p");
    precioFinal.classList.add("tiquePrecioTotal")
    precioFinal.innerHTML = `
        TOTAL: $${localStorage.getItem("precioTotalPesos")}
    `
    document.querySelector("#idTiqueContenido").append(precioFinal);
}

if (localStorage.getItem("comerAquí") == "true") {
    dondeComera = document.createElement("p");
    dondeComera.innerHTML = `
        ¡PARA COMER AQUÍ!
    `
    document.querySelector("#idTiqueContenido").append(dondeComera);
} else {
    dondeComera = document.createElement("p");
    dondeComera.innerHTML = `
        ¡PARA LLEVAR!
    `
    document.querySelector("#idTiqueContenido").append(dondeComera);
}


