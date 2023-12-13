/* Recorrer el LocalStorage */
/* Dark Mode */
if (localStorage.getItem("modoOscuro") == "true") {
    document.querySelector(".headerIndex").classList.add("headerIndexModoOscuro")
    document.querySelector(".navHome").classList.add("navHomeModoOscuro")
    document.querySelector(".productosContenedor").classList.add("productosContenedorModoOscuro")
    document.querySelector("#idBotonModoOscuro").classList.add("botonesIndexModoOscuroActivado")
    document.querySelector("#idBotonCarrito").classList.add("botonesIndexCarritoModoOscuroActivado")
    document.querySelector("#idBotonCambiarPrecio").classList.add("botonesIndexCambiarPrecioModoOscuroActivado")
}

/* ------ */

/* Cambiar Precio*/
if (localStorage.getItem("precioDolarActivado") == "false") {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".precioDolar").forEach((producto) => {
            producto.classList.add("d-none")
        })
        document.querySelectorAll(".precioPeso").forEach((producto) => {
            producto.classList.remove("d-none")
        })
    });

}

/* ------ */

/* Productos en el carrito */
let prudctosDelCarrito = []
if (localStorage.getItem("productosEnElCarro") != "") {
    prudctosDelCarrito = JSON.parse(localStorage.getItem("productosEnElCarro"))
}

/* ------------------------------------ */
/* Arrays */
const todosLosProductos = [
    {
        id: 1,
        nombre: "Hamburguesa",
        precioDolar: 1,
        precioPesos: 1000,
        ilustracion: "../img/hamburguesas/hamburguesa-con-queso.png",
        categoria: {
            nombre: "hamburguesa",
            id: "h-00"
        }
    }
    ,
    {
        id: 2,
        nombre: "Bacon Cheddar McMelt",
        precioDolar: 20,
        precioPesos: 5500,
        ilustracion: "../img/hamburguesas/bacon-cheddar-mcmelt.png",
        categoria: {
            nombre: "hamburguesa",
            id: "h-01"
        }
    }
    ,
    {
        id: 3,
        nombre: "Big Mac",
        precioDolar: 10,
        precioPesos: 3260,
        ilustracion: "../img/hamburguesas/big-mac.png",
        categoria: {
            nombre: "hamburguesa",
            id: "h-02"
        }
    }
    ,
    {
        id: 4,
        nombre: "Cuarto de Libra con Queso",
        precioDolar: 7,
        precioPesos: 4800,
        ilustracion: "../img/hamburguesas/cuarto-de-libra-con-queso.png",
        categoria: {
            nombre: "hamburguesa",
            id: "h-03"
        }
    }
    ,
    {
        id: 5,
        nombre: "Grand Triple Tasty Bacon",
        precioDolar: 25,
        precioPesos: 9740,
        ilustracion: "../img/hamburguesas/grand-triple-tasty-bacon.png",
        categoria: {
            nombre: "hamburguesa",
            id: "h-04"
        }
    }
    ,
    {
        id: 6,
        nombre: "McCrispy Chick Deluxe Spicy",
        precioDolar: 7,
        precioPesos: 5900,
        ilustracion: "../img/hamburguesa-de-pollo/mccripspy-chicken-deluxe-spicy.png",
        categoria: {
            nombre: "hamburguesa-de-pollo",
            id: "hp-00"
        }
    }
    ,
    {
        id: 7,
        nombre: "Nuggets 4",
        precioDolar: 1,
        precioPesos: 1000,
        ilustracion: "../img/hamburguesa-de-pollo/mcnuggets-4.png",
        categoria: {
            nombre: "hamburguesa-de-pollo",
            id: "hp-01"
        }
    }
    ,
    {
        id: 8,
        nombre: "McPollo",
        precioDolar: 2,
        precioPesos: 2670,
        ilustracion: "../img/hamburguesa-de-pollo/mc-pollo.png",
        categoria: {
            nombre: "hamburguesa-de-pollo",
            id: "hp-02"
        }
    }
    ,
    {
        id: 9,
        nombre: "Papas con Cheddar y Bacon",
        precioDolar: 3,
        precioPesos: 1900,
        ilustracion: "../img/papas-y-complementos/papas-cheddar-y-bacon.png",
        categoria: {
            nombre: "papas-y-complementos",
            id: "pp-00"
        }
    }
    ,
    {
        id: 10,
        nombre: "Papas Grandes",
        precioDolar: 2,
        precioPesos: 800,
        ilustracion: "../img/papas-y-complementos/papas-grandes.png",
        categoria: {
            nombre: "papas-y-complementos",
            id: "pp-01"
        }
    }
    ,
    {
        id: 11,
        nombre: "Papas Kids",
        precioDolar: 1,
        precioPesos: 400,
        ilustracion: "../img/papas-y-complementos/papas-kids.png",
        categoria: {
            nombre: "papas-y-complementos",
            id: "pp-02"
        }
    }
    ,
    {
        id: 12,
        nombre: "Papas Tasty",
        precioDolar: 2,
        precioPesos: 1200,
        ilustracion: "../img/papas-y-complementos/papas-tasty.png",
        categoria: {
            nombre: "papas-y-complementos",
            id: "pp-03"
        }
    }
    ,
    {
        id: 13,
        nombre: "Side Salad",
        precioDolar: 2,
        precioPesos: 1200,
        ilustracion: "../img/papas-y-complementos/side-salad.png",
        categoria: {
            nombre: "papas-y-complementos",
            id: "pp-04"
        }
    }
    ,
    {
        id: 14,
        nombre: "Jugo de Manzana",
        precioDolar: 3,
        precioPesos: 800,
        ilustracion: "../img/bebidas/jugo-de-manzana.png",
        categoria: {
            nombre: "bebidas",
            id: "b-00"
        }
    }
    ,
    {
        id: 15,
        nombre: "Coca Cola chica",
        precioDolar: 1,
        precioPesos: 800,
        ilustracion: "../img/bebidas/coca-colca-chica.png",
        categoria: {
            nombre: "bebidas",
            id: "b-01"
        }
    }
    ,
    {
        id: 16,
        nombre: "Agua sin gas. (500ml)",
        precioDolar: 1,
        precioPesos: 800,
        ilustracion: "../img/bebidas/agua-sin-gas.png",
        categoria: {
            nombre: "bebidas",
            id: "b-02"
        }
    }
    ,
    {
        id: 17,
        nombre: "Cono Combinado",
        precioDolar: 2,
        precioPesos: 600,
        ilustracion: "../img/postres/cono-combinado.png",
        categoria: {
            nombre: "postres",
            id: "ps-00"
        }
    }
    ,
    {
        id: 18,
        nombre: "Cono KitKat",
        precioDolar: 3,
        precioPesos: 1200,
        ilustracion: "../img/postres/cono-kitkat.png",
        categoria: {
            nombre: "postres",
            id: "ps-01"
        }
    }
    ,
    {
        id: 19,
        nombre: "McFlurry Croncantella",
        precioDolar: 7,
        precioPesos: 3600,
        ilustracion: "../img/postres/mcflurry-crocantella.png",
        categoria: {
            nombre: "postres",
            id: "ps-02"
        }
    }
    ,
    {
        id: 20,
        nombre: "Sundae de Chocolate",
        precioDolar: 3,
        precioPesos: 1350,
        ilustracion: "../img/postres/sundae-chocolate.png",
        categoria: {
            nombre: "postres",
            id: "ps-03"
        }
    }
    ,
    {
        id: 21,
        nombre: "Ensalada Deli Fresh Pollo Grille",
        precioDolar: 5,
        precioPesos: 2600,
        ilustracion: "../img/ensaladas/ensalada-deli-fresh-con-pollo-grille.png",
        categoria: {
            nombre: "ensalada",
            id: "en-00"
        }
    }
    ,
    {
        id: 22,
        nombre: "Ensalada Deli Fresh Vegetariana",
        precioDolar: 3,
        precioPesos: 2400,
        ilustracion: "../img/ensaladas/ensalada-deli-fresh-veggie.png",
        categoria: {
            nombre: "ensalada",
            id: "en-01"
        }
    }

]

let productosEnElCarrito = []
productosEnElCarrito = prudctosDelCarrito;

/* ------------------------------------ */
/* Funciones */
function evaluarSiTienenLaClaseDNone(idDeSeccion) {
    if (!document.querySelector(idDeSeccion).classList.contains("d-none")) {
        document.querySelector(idDeSeccion).classList.add("d-none")
    }

    if (!document.querySelector("#seccionDefault").classList.contains("d-none")) {
        document.querySelector("#seccionDefault").classList.add("d-none")
    }
}

function evaluarSiEstanClickeadosEnBarNav(tituloNavBar) {
    if (document.querySelector(tituloNavBar).classList.contains("navClickeado")) {
        document.querySelector(tituloNavBar).classList.remove("navClickeado")
    }
}

function cargarProductos(catergoriaDelProducto, idDelContenedor) {
    document.querySelector(idDelContenedor).innerHTML = "";

    let productosFiltrados = todosLosProductos.filter(function (producto) {
        return producto.categoria.nombre === catergoriaDelProducto;
    });

    productosFiltrados.forEach((producto) => {
        div1 = document.createElement("div");
        div1.classList.add("col")
        div1.classList.add("productosContenedorSub3")
        div1.innerHTML = ` 
        <div class="card shadow-sm productosContenedorSub4">
                <img src="${producto.ilustracion}" alt="${producto.nombre}"
        class="productosContenedorSub4Imagen">
        <div class="card-body productosContenedorDescripcion">
            <h5 class="productosContenedorNombreProducto">${producto.nombre}</h5>
        <div
            class="d-flex justify-content-between align-items-center  productosContenedorDescripcionBotones">
        <button type="button"
            class="btn btn-sm btn-outline-secondary productosContenedorDescripcionBotonesAniadirAlCarrito" id="${producto.id}">Añadir
            al carrito</button>
        <small class="productosContenedorDescripcionPrecio precioDolar">$${producto.precioDolar}.</small>
        <small class="productosContenedorDescripcionPrecio precioPeso d-none">${producto.precioPesos}args.</small>
            </div>
         </div>
        </div>
            
            `;
        document.querySelector(idDelContenedor).append(div1);
    })

    agregarAlCarrito()
}

function cargarProductosDefault() {
    document.querySelector("#seccionDefault").classList.remove("d-none")
    document.querySelector("#contendorCargarProductoDefault").innerHTML = "";

    todosLosProductos.forEach((producto) => {
        div1 = document.createElement("div");
        div1.classList.add("col")
        div1.classList.add("productosContenedorSub3")
        div1.innerHTML = ` 
        <div class="card shadow-sm productosContenedorSub4">
                <img src="${producto.ilustracion}" alt="${producto.nombre}"
        class="productosContenedorSub4Imagen">
        <div class="card-body productosContenedorDescripcion">
            <h5 class="productosContenedorNombreProducto">${producto.nombre}</h5>
        <div
            class="d-flex justify-content-between align-items-center  productosContenedorDescripcionBotones">
        <button type="button"
            class="btn btn-sm btn-outline-secondary productosContenedorDescripcionBotonesAniadirAlCarrito" id="${producto.id}">Añadir
            al carrito</button>
            <small class="productosContenedorDescripcionPrecio precioDolar">$${producto.precioDolar}.</small>
            <small class="productosContenedorDescripcionPrecio precioPeso d-none">${producto.precioPesos}args.</small>
            </div>
         </div>
        </div>
            
            `;
        document.querySelector("#contendorCargarProductoDefault").append(div1);
    })

    document.querySelector("#seccionHamburguesas").classList.add("d-none")
    document.querySelector("#seccionHamburguesasDePollo").classList.add("d-none")
    document.querySelector("#seccionPapasYComplementos").classList.add("d-none")
    document.querySelector("#seccionBebidas").classList.add("d-none")
    document.querySelector("#seccionPostres").classList.add("d-none")
    document.querySelector("#seccionEnsaladas").classList.add("d-none")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

    agregarAlCarrito()
}

function buscarProductoPorInput() {

    let nombreDelProductoABuscar = "";
    let objetosEncontrados = [];
    document.querySelector("#idBuscadorNav").addEventListener("input", (e) => {
        nombreDelProductoABuscar = e.target.value;

        objetosEncontrados = todosLosProductos.filter(producto => {
            const primerasLetrasProducto = producto.nombre.substring(0, nombreDelProductoABuscar.length);
            return primerasLetrasProducto.toLowerCase() === nombreDelProductoABuscar.toLowerCase();
        });

        if (objetosEncontrados.length === 0) {
            cargarProductosDefault();
        } else {
            cargarProductoDeInput(objetosEncontrados);
        }
    });

    document.querySelector("#idBuscadorNav").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    document.querySelector("#idInputClick").addEventListener("click", () => {
        cargarProductosDefault();
    })
}

function cargarProductoDeInput(arrayDelInput) {
    document.querySelector("#contendorCargarProductoDefault").innerHTML = "";

    arrayDelInput.forEach((producto) => {
        div1 = document.createElement("div");
        div1.classList.add("col")
        div1.classList.add("productosContenedorSub3")
        div1.innerHTML = ` 
        <div class="card shadow-sm productosContenedorSub4">
                <img src="${producto.ilustracion}" alt="${producto.nombre}"
        class="productosContenedorSub4Imagen">
        <div class="card-body productosContenedorDescripcion">
            <h5 class="productosContenedorNombreProducto">${producto.nombre}</h5>
        <div
            class="d-flex justify-content-between align-items-center  productosContenedorDescripcionBotones">
        <button type="button"
            class="btn btn-sm btn-outline-secondary productosContenedorDescripcionBotonesAniadirAlCarrito" id="${producto.id}">Añadir
            al carrito</button>
        <small class="productosContenedorDescripcionPrecio precioDolar">$${producto.precioDolar}.</small>
        <small class="productosContenedorDescripcionPrecio precioPeso d-none">${producto.precioPesos}args.</small>
            </div>
         </div>
        </div>
            
            `;
        document.querySelector("#contendorCargarProductoDefault").append(div1);
    })

    agregarAlCarrito()
}

function actualizarLogoCarrito() {
    document.querySelector("#idBotonCarrito").innerHTML = ""
    let indicadorDeProductos = productosEnElCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);

    if (document.querySelector("#idBotonCarrito").classList.contains("botonesIndexCarritoLleno")) {
        document.querySelector("#idBotonCarrito").classList.remove("botonesIndexCarritoLleno")
    }

    if (productosEnElCarrito.length == 0) {
        document.querySelector("#idBotonCarrito").innerHTML = `
        Tu carrito
        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                class="bi bi-cart4 botonesIndexLogo" viewBox="0 0 16 16">
                <path
                    d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
        </svg>
        `
    } else {
        document.querySelector("#idBotonCarrito").classList.add("botonesIndexCarritoLleno")

        if (indicadorDeProductos >= 99) {
            document.querySelector("#idBotonCarrito").innerHTML = `
            Tu carrito
            <div class="botonesIndexLogo">
            +99
            </div>
            `
        } else {
            document.querySelector("#idBotonCarrito").innerHTML = `
        Tu carrito
        <div class="botonesIndexLogo">
        ${indicadorDeProductos}
        </div>
        `
        }
    }

    localStorage.setItem("indexProductosEnElCarrito", indicadorDeProductos)
}

function agregarAlCarrito() {
    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

    botonesAniadir.forEach(boton => {
        boton.addEventListener("click", (e) => {
            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

            /*  AGREGAR PRODUCTO AL CARRITO */
            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                productosEnElCarrito[index].cantidad++;
            } else {
                productoEncontrado.cantidad = 1;
                productosEnElCarrito.push(productoEncontrado)
            }

            actualizarLogoCarrito()
            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
        })
    });
}


/* ------------------------------------ */
/* Elegir Selector de tipo de comida */
document.querySelector("#botonHamburguesas").addEventListener("click", () => {
    document.querySelector("#seccionHamburguesas").classList.remove("d-none")
    cargarProductos("hamburguesa", "#contendorCargarProductoHamburgesas")
    document.querySelector("#hamburguesaNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

})

document.querySelector("#botonHamburguesasDePollo").addEventListener("click", () => {
    document.querySelector("#seccionHamburguesasDePollo").classList.remove("d-none")
    cargarProductos("hamburguesa-de-pollo", "#contendorCargarProductoHamburgesasDePollo")
    document.querySelector("#hamburguesaPolloNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

})

document.querySelector("#botonPapasYComplementos").addEventListener("click", () => {
    document.querySelector("#seccionPapasYComplementos").classList.remove("d-none")
    cargarProductos("papas-y-complementos", "#contendorCargarProductoPapasYComplementos")
    document.querySelector("#papasYComNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

})

document.querySelector("#botonBebidas").addEventListener("click", () => {
    document.querySelector("#seccionBebidas").classList.remove("d-none")
    cargarProductos("bebidas", "#contendorCargarProductoBebidas")
    document.querySelector("#bebidaNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

})

document.querySelector("#botonPostres").addEventListener("click", () => {
    document.querySelector("#seccionPostres").classList.remove("d-none")
    cargarProductos("postres", "#contendorCargarProductoPostres")
    document.querySelector("#postresNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#ensaladaNombreLista")

})

document.querySelector("#botonEnsaladas").addEventListener("click", () => {
    document.querySelector("#seccionEnsaladas").classList.remove("d-none")
    cargarProductos("ensalada", "#contendorCargarProductoEnsaladas")
    document.querySelector("#ensaladaNombreLista").classList.add("navClickeado")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")

    evaluarSiEstanClickeadosEnBarNav("#hamburguesaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#hamburguesaPolloNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#papasYComNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#bebidaNombreLista")
    evaluarSiEstanClickeadosEnBarNav("#postresNombreLista")

})

/* ------------------------------------ */
/* Funcion de los botones */
/* Dark Mode */
document.querySelector("#idBotonModoOscuro").addEventListener("click", () => {
    document.querySelector(".headerIndex").classList.toggle("headerIndexModoOscuro")
    document.querySelector(".navHome").classList.toggle("navHomeModoOscuro")
    document.querySelector(".productosContenedor").classList.toggle("productosContenedorModoOscuro")
    document.querySelector("#idBotonModoOscuro").classList.toggle("botonesIndexModoOscuroActivado")
    document.querySelector("#idBotonCarrito").classList.toggle("botonesIndexCarritoModoOscuroActivado")
    document.querySelector("#idBotonCambiarPrecio").classList.toggle("botonesIndexCambiarPrecioModoOscuroActivado")

    if (document.querySelector(".headerIndex").classList.contains("headerIndexModoOscuro")) {
        localStorage.setItem("modoOscuro", true)
    } else {
        localStorage.setItem("modoOscuro", false)
    }

})

/* ------ */
/* Carrito */
document.querySelector("#idBotonCarrito").addEventListener("click", () => {
    window.location.href = "../index/carrito.html";
})

/* ------ */

/* Cambiar Precio */
document.querySelector("#idBotonCambiarPrecio").addEventListener("click", () => {

    document.querySelectorAll(".precioDolar").forEach((producto) => {
        producto.classList.toggle("d-none")
    })
    document.querySelectorAll(".precioPeso").forEach((producto) => {
        producto.classList.toggle("d-none")
    })

    if (document.querySelector(".precioDolar").classList.contains("d-none")) {
        localStorage.setItem("precioDolarActivado", false)
    } else {
        localStorage.setItem("precioDolarActivado", true)
    }
})

/* ------------------------------------ */
cargarProductosDefault();
buscarProductoPorInput();
actualizarLogoCarrito()

