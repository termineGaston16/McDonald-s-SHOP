/* Recorrer el LocalStorage */
/* Dark Mode */
if (localStorage.getItem("modoOscuro") == "true") {
    document.querySelector(".headerIndex").classList.add("headerIndexModoOscuro")
    document.querySelector(".productosContenedor").classList.add("productosContenedorModoOscuro")
    document.querySelector("#idBotonCarritoVolver").classList.add("botonesCarritoVolverModoOscuroActivado")
}

/* ------ */

/* Cambiar Precio*/
if (localStorage.getItem("precioDolarActivado") == "false") {
    document.querySelectorAll("#precioDolar").forEach((producto) => {
        producto.classList.add("d-none")
    })
    document.querySelectorAll("#precioPeso").forEach((producto) => {
        producto.classList.remove("d-none")
    })
}

/* ------ */

/* Productos en el carrito */
let productosAlmacenados=""
if (localStorage.getItem("productosEnElCarro")!="") {
     productosAlmacenados = JSON.parse(localStorage.getItem("productosEnElCarro"))
}

/* ------------------------------------ */
/* Funciones */
function actualizarTituleCarrito() {
    if (localStorage.getItem("indexProductosEnElCarrito") == null) {
        document.title = `
        💛 Tu Carrito 💛 — McDonald's SHOP 
        `
    } else {
        document.title = `
        💛 (${localStorage.getItem('indexProductosEnElCarrito')}) Tu Carrito 💛 — McDonald's SHOP 
        `
    }
}

function cargarProductosTraidosDelCarrito() {
    document.querySelector("#contendorCargarProductoDefaultDelCarrito").innerHTML = ""

    if (localStorage.getItem("indexProductosEnElCarrito") == 0) {


        div1 = document.createElement("div");
        div1.classList.add("col")
        div1.classList.add("productosContenedorSub3")
        div1.innerHTML = ` 
            <div class="card shadow-sm productosContenedorEnElCarrito">
                    <p class="tituloEnElCarritoVacio">Tu carrito está vacío</p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"
                        class="bi bi-cart-dash logoProductosContenedorEnElCarrito" viewBox="0 0 16 16">
                        <path d="M6.5 7a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z" />
                         <path
                         d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                        </svg>
                    <p class="tituloEnElCarritoVacio">¡Compra productos para llenarlo!</p>
            </div>
                `;

        document.querySelector("#contendorCargarProductoDefaultDelCarrito").append(div1);


    } else {

        productosAlmacenados.forEach(producto => {
            div1 = document.createElement("div");
            div1.classList.add("col")
            div1.classList.add("productosContenedorSub3")
            div1.innerHTML = ` 
            <div class="card shadow-sm productosContenedorSub4">
                <img src="${producto.ilustracion}" alt="${producto.nombre}"
             class="productosContenedorSub4Imagen">
            <div class="card-body productosContenedorDescripcion">
            <h5 class="productosContenedorNombreProducto">${producto.nombre} — x(${producto.cantidad})</h5>
            <div
            class="d-flex justify-content-between align-items-center  productosContenedorDescripcionBotones">
            <button type="button"
            <small class="productosContenedorDescripcionPrecio" id="precioDolar">$${producto.precioDolar * producto.cantidad}.</small>
            <small class="productosContenedorDescripcionPrecio d-none" id="precioPeso">${producto.precioPesos * producto.cantidad}args.</small>
            </div>
         </div>
        </div>
                `;

            document.querySelector("#contendorCargarProductoDefaultDelCarrito").append(div1);
        });
    }
}

/* ------------------------------------ */
/* Funcion de los botones */
/* Volver atrás */
document.querySelector("#idBotonCarritoVolver").addEventListener("click", () => {
    window.location.href = "../index/menu.html";
});

/* Borrar todo el Carrito */
document.querySelector("#idBotonCarritoBorrarAll").addEventListener("click", ()=>{
    productosAlmacenados.splice(0,productosAlmacenados.lenght)
    localStorage.setItem("indexProductosEnElCarrito",0)
    localStorage.setItem("productosEnElCarro","")
    cargarProductosTraidosDelCarrito()
})

/* ------------------------------------ */
actualizarTituleCarrito()
cargarProductosTraidosDelCarrito()