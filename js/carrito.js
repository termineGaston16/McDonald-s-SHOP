/* ------------------------------------ */
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
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".precioDolar").forEach((producto) => {
            producto.classList.add("d-none")
        })
        document.querySelectorAll(".precioPeso").forEach((producto) => {
            producto.classList.remove("d-none")
        })
    });

}

/* ------------------------------------ */
/* Productos en el carrito */
let productosAlmacenados = ""
if (localStorage.getItem("productosEnElCarro") != "") {
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
    document.querySelector("#idPrecioTotal").innerHTML = ""
    localStorage.setItem("precioTotalDolar", 0)
    localStorage.setItem("precioTotalPesos", 0)
    let precioTotalDolar = 0;
    let precioTotalPesos = 0;


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

        /* --- */
        document.querySelector("#idPrecioTotal").innerText = "Precio Total: $0";


    } else {
        productosAlmacenados.forEach(producto => {
            div1 = document.createElement("div");
            div1.classList.add("col")
            div1.classList.add("productosContenedorSub3")
            div1.innerHTML = ` 
            <div class="card shadow-sm productosContenedorSub4">
           
            <button type="button" class="btn-close botonCloseCarrito" id="${producto.id}" style="margin-bottom: 8px;" aria-label="Close"></button>
            <img src="${producto.ilustracion}" alt="${producto.nombre}"
             class="productosContenedorSub4Imagen">
            <div class="card-body productosContenedorDescripcion">
            <h5 class="productosContenedorNombreProducto">${producto.nombre} — x(${producto.cantidad})</h5>
            <div
            class="d-flex justify-content-between align-items-center  productosContenedorDescripcionBotones">
            <small class="productosContenedorDescripcionPrecio precioDolar">$${producto.precioDolar * producto.cantidad}.</small>
            <small class="productosContenedorDescripcionPrecio precioPeso d-none">${producto.precioPesos * producto.cantidad}args.</small>
            </div>
            </div>
            </div>
                `;

            precioTotalDolar += producto.precioDolar * producto.cantidad;
            precioTotalPesos += producto.precioPesos * producto.cantidad;

            document.querySelector("#contendorCargarProductoDefaultDelCarrito").append(div1);

            cerrarProductoCarrito()
        });

        localStorage.setItem("precioTotalDolar", precioTotalDolar)
        localStorage.setItem("precioTotalPesos", precioTotalPesos)

        if (localStorage.getItem("precioDolarActivado") == "false") {
            document.querySelector("#idPrecioTotal").innerText = `Precio Total: ${precioTotalPesos}$`;
        } else {
            document.querySelector("#idPrecioTotal").innerText = `Precio Total: ${precioTotalDolar}$`;
        }
    }
}

function cerrarProductoCarrito() {
    let botonClose = document.querySelectorAll(".botonCloseCarrito");

    botonClose.forEach(boton => {
        boton.addEventListener("click", (e) => {
            let productoEncontrado = productosAlmacenados.find(producto => producto.id == e.target.id);

            /* ELIMINARLO DEL CARRITO */
            if (productoEncontrado) {

                /* Restar la cantidad del producto index desde el local */
                let index1 = localStorage.getItem("indexProductosEnElCarrito");
                localStorage.setItem("indexProductosEnElCarrito", index1 - productoEncontrado.cantidad);

                /* Borrar el producto desde el array */
                let index = productosAlmacenados.findIndex(producto => producto.id == productoEncontrado.id);
                if (index !== -1) {
                    productosAlmacenados.splice(index, 1);
                }

                /* Actualizar el producto en el local */
                localStorage.setItem("productosEnElCarro", JSON.stringify(productosAlmacenados));

                if (productosAlmacenados.length === 0) {
                    localStorage.setItem("productosEnElCarro", "");
                }

                cargarProductosTraidosDelCarrito();
                actualizarTituleCarrito();
            }
        });
    });
}


/* ------------------------------------ */
/* Funcion de los botones */
/* Volver atrás */
document.querySelector("#idBotonCarritoVolver").addEventListener("click", () => {
    window.location.href = "../index/menu.html";
});

/* Borrar todo el Carrito */
document.querySelector("#idBotonCarritoBorrarAll").addEventListener("click", () => {

    if (localStorage.getItem("indexProductosEnElCarrito")==0) {
        Swal.fire({
            text: "No hay productos en el carrito",
            confirmButtonText: "Confirmar",
        })
    }else{
        Swal.fire({
            text: "¿Estás seguro/a de borrar tus productos?",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Rechazar",
        }).then((result) => {
            if (result.isConfirmed) {
    
                productosAlmacenados.splice(0, productosAlmacenados.lenght)
                localStorage.setItem("indexProductosEnElCarrito", 0)
                localStorage.setItem("productosEnElCarro", "")
                cargarProductosTraidosDelCarrito()
                actualizarTituleCarrito();
    
                Swal.fire({
                    text: "Todos los productos fueron eliminados.",
                    confirmButtonText: "Okis"
                });
            }
        });
    }
})

/* Pagar */
document.querySelector("#idBotonCarritoPagar").addEventListener("click", () => {
    let datosPersonales = {};
    localStorage.setItem("datosDelComprador", "")

    if (localStorage.getItem("indexProductosEnElCarrito")==0) {
        Swal.fire({
            text: "No hay productos en el carrito",
            confirmButtonText: "Confirmar",
        })
    }else{
        Swal.fire({
            title: "Introduce tus datos personales:",
            html:
                '<input id="nombreIntroducido" class="swal2-input" placeholder="Nombre" autocapitalize="off">' +
                '<input id="apelleidoIntroducido" class="swal2-input" placeholder="Apellido" autocapitalize="off">' +
                '<input id="dniIntroducido" class="swal2-input" placeholder="DNI" autocapitalize="off">',
            showCancelButton: true,
            confirmButtonText: "Aceptar",
            cancelButtonText: "Rechazar",
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let nombre = document.getElementById('nombreIntroducido').value;
                let apellido = document.getElementById('apelleidoIntroducido').value;
                let dni = document.getElementById('dniIntroducido').value;
    
                if (!nombre || !apellido || !dni) {
                    Swal.showValidationMessage("Todos los campos son obligatorios");
                } else {
                    datosPersonales = { nombre, apellido, dni };
                }
            },
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.setItem("datosDelComprador", JSON.stringify(datosPersonales))
                window.open('../index/comprobanteDeCompra.html', '_blank');
    
                setTimeout(function () {
                    productosAlmacenados.splice(0, productosAlmacenados.length);
                    localStorage.setItem("indexProductosEnElCarrito", 0);
                    localStorage.setItem("productosEnElCarro", "");
                    cargarProductosTraidosDelCarrito();
                    actualizarTituleCarrito();
                    location.reload();
                }, 1500);
    
            }
        });
    }
});


/* ------------------------------------ */
actualizarTituleCarrito()
cargarProductosTraidosDelCarrito()

