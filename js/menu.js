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
    document.querySelectorAll("#precioDolar").forEach((producto)=>{
        producto.classList.add("d-none")
    })
    document.querySelectorAll("#precioPeso").forEach((producto)=>{
        producto.classList.remove("d-none")
    })
}

/* ------------------------------------ */

/* Función */
function evaluarSiTienenLaClaseDNone(idDeSeccion){
    if (!document.querySelector(idDeSeccion).classList.contains("d-none")) {
        document.querySelector(idDeSeccion).classList.add("d-none")
    }

    if (!document.querySelector("#seccionDefault").classList.contains("d-none")) {
        document.querySelector("#seccionDefault").classList.add("d-none")
    }
}



/* ------------------------------------ */

/* Elegir Selector de tipo de comida */
document.querySelector("#botonHamburguesas").addEventListener("click",()=>{
    document.querySelector("#seccionHamburguesas").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

})

document.querySelector("#botonHamburguesasDePollo").addEventListener("click",()=>{
    document.querySelector("#seccionHamburguesasDePollo").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

})

document.querySelector("#botonPapasYComplementos").addEventListener("click",()=>{
    document.querySelector("#seccionPapasYComplementos").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

})

document.querySelector("#botonBebidas").addEventListener("click",()=>{
    document.querySelector("#seccionBebidas").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionPostres")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

})

document.querySelector("#botonPostres").addEventListener("click",()=>{
    document.querySelector("#seccionPostres").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionEnsaladas")

})

document.querySelector("#botonEnsaladas").addEventListener("click",()=>{
    document.querySelector("#seccionEnsaladas").classList.remove("d-none")

    evaluarSiTienenLaClaseDNone("#seccionHamburguesas")
    evaluarSiTienenLaClaseDNone("#seccionHamburguesasDePollo")
    evaluarSiTienenLaClaseDNone("#seccionPapasYComplementos")
    evaluarSiTienenLaClaseDNone("#seccionBebidas")
    evaluarSiTienenLaClaseDNone("#seccionPostres")

})


/* ------------------------------------ */

/* Funcion de los botones */
/* Dark Mode */
document.querySelector("#idBotonModoOscuro").addEventListener("click",()=>{
    document.querySelector(".headerIndex").classList.toggle("headerIndexModoOscuro")
    document.querySelector(".navHome").classList.toggle("navHomeModoOscuro")
    document.querySelector(".productosContenedor").classList.toggle("productosContenedorModoOscuro")
    document.querySelector("#idBotonModoOscuro").classList.toggle("botonesIndexModoOscuroActivado")
    document.querySelector("#idBotonCarrito").classList.toggle("botonesIndexCarritoModoOscuroActivado")
    document.querySelector("#idBotonCambiarPrecio").classList.toggle("botonesIndexCambiarPrecioModoOscuroActivado")

    if (document.querySelector(".headerIndex").classList.contains("headerIndexModoOscuro")) {
        localStorage.setItem("modoOscuro",true)
    } else {
        localStorage.setItem("modoOscuro",false)
    }

})

/* ------ */

/* Cambiar Precio */
document.querySelector("#idBotonCambiarPrecio").addEventListener("click",()=>{

    document.querySelectorAll("#precioDolar").forEach((producto)=>{
        producto.classList.toggle("d-none")
    })
    document.querySelectorAll("#precioPeso").forEach((producto)=>{
        producto.classList.toggle("d-none")
    })

    if (document.querySelector("#precioDolar").classList.contains("d-none")) {
        localStorage.setItem("precioDolarActivado",false)
    }else{
        localStorage.setItem("precioDolarActivado",true)
    }
})