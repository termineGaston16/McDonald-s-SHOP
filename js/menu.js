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
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("precioDolarActivado") == "false") {
        document.querySelectorAll(".precioDolar").forEach((producto) => {
            producto.classList.add("d-none");
        });
        document.querySelectorAll(".precioPeso").forEach((producto) => {
            producto.classList.remove("d-none");
        });
    }
});


/* ------ */

/* Productos en el carrito */
let prudctosDelCarrito = []
if (localStorage.getItem("productosEnElCarro") != "") {
    prudctosDelCarrito = JSON.parse(localStorage.getItem("productosEnElCarro"))
}


/* ------------------------------------ */
/* Arrays */
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

function cargarProductos(ruta, catergoriaDelProducto, idDelContenedor) {
    return new Promise((resolve, reject) => {
        fetch(ruta)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de json ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function cargarProductosDefault(ruta) {
    return new Promise((resolve, reject) => {
        fetch(ruta)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de json ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}

function buscarProductoPorInput(ruta) {
    return new Promise((resolve, reject) => {
        fetch(ruta)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de json ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
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

    /* agregar al carrito*/
    agregarAlCarrito('../js/productos.json')
        .then(todosLosProductos => {
            let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

            botonesAniadir.forEach(boton => {
                boton.addEventListener("click", (e) => {
                    let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                    /*  AGREGAR PRODUCTO AL CARRITO */
                    if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                        let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                        productosEnElCarrito[index].cantidad++;

                        Swal.fire({
                            position: "top-end",
                            title: "¡Producto sumado!",
                            showConfirmButton: false,
                            timer: 500
                        })
                    } else {
                        productoEncontrado.cantidad = 1;
                        productosEnElCarrito.push(productoEncontrado)

                        Swal.fire({
                            position: "top-end",
                            title: "¡Producto agregado!",
                            showConfirmButton: false,
                            timer: 500
                        });
                    }

                    actualizarLogoCarrito()
                    localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                })
            });
        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });
}

function actualizarLogoCarrito() {
    document.querySelector("#idBotonCarrito").innerHTML = ""
    console.log(productosEnElCarrito);
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

function agregarAlCarrito(ruta) {
    return new Promise((resolve, reject) => {
        fetch(ruta)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error de json ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                resolve(data);
            })
            .catch(error => {
                reject(error);
            });
    });
}


/* ------------------------------------ */
/* Elegir Selector de tipo de comida */
document.querySelector("#botonHamburguesas").addEventListener("click", () => {
    document.querySelector("#seccionHamburguesas").classList.remove("d-none")

    /* cargar producuto*/
    cargarProductos('../js/productos.json', "hamburguesa", "#contendorCargarProductoHamburgesas")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoHamburgesas").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "hamburguesa";
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
                document.querySelector("#contendorCargarProductoHamburgesas").append(div1);
            })

            /* agregar al carrito */
            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });

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

    cargarProductos('../js/productos.json', "hamburguesa-de-pollo", "#contendorCargarProductoHamburgesasDePollo")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoHamburgesasDePollo").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "hamburguesa-de-pollo";
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
                document.querySelector("#contendorCargarProductoHamburgesasDePollo").append(div1);
            })

            /* agregar al carrito */
            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });

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

    cargarProductos('../js/productos.json', "papas-y-complementos", "#contendorCargarProductoPapasYComplementos")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoPapasYComplementos").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "papas-y-complementos";
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
                document.querySelector("#contendorCargarProductoPapasYComplementos").append(div1);
            })

            /* agregar productos */
            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });



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

    cargarProductos('../js/productos.json', "bebidas", "#contendorCargarProductoBebidas")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoBebidas").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "bebidas";
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
                document.querySelector("#contendorCargarProductoBebidas").append(div1);
            })

            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });




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

    cargarProductos('../js/productos.json', "postres", "#contendorCargarProductoPostres")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoPostres").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "postres";
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
                document.querySelector("#contendorCargarProductoPostres").append(div1);
            })
            /* agregar al carrito  */
            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });

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

    cargarProductos('../js/productos.json', "ensalada", "#contendorCargarProductoEnsaladas")
        .then(todosLosProductos => {
            document.querySelector("#contendorCargarProductoEnsaladas").innerHTML = "";

            let productosFiltrados = todosLosProductos.filter(function (producto) {
                return producto.categoria.nombre === "ensalada";
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
                document.querySelector("#contendorCargarProductoEnsaladas").append(div1);
            })

            /* agregar al carrito  */
            agregarAlCarrito('../js/productos.json')
                .then(todosLosProductos => {
                    let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                    botonesAniadir.forEach(boton => {
                        boton.addEventListener("click", (e) => {
                            let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                            /*  AGREGAR PRODUCTO AL CARRITO */
                            if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                productosEnElCarrito[index].cantidad++;

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto sumado!",
                                    showConfirmButton: false,
                                    timer: 500
                                })
                            } else {
                                productoEncontrado.cantidad = 1;
                                productosEnElCarrito.push(productoEncontrado)

                                Swal.fire({
                                    position: "top-end",
                                    title: "¡Producto agregado!",
                                    showConfirmButton: false,
                                    timer: 500
                                });
                            }

                            actualizarLogoCarrito()
                            localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                        })
                    });
                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });


        })
        .catch(error => {
            console.error('Error al cargar datos:', error);
        });


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
cargarProductosDefault('../js/productos.json')
    .then(todosLosProductos => {
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

        agregarAlCarrito('../js/productos.json')
            .then(todosLosProductos => {
                let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                botonesAniadir.forEach(boton => {
                    boton.addEventListener("click", (e) => {
                        let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                        /*  AGREGAR PRODUCTO AL CARRITO */
                        if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                            let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                            productosEnElCarrito[index].cantidad++;

                            Swal.fire({
                                position: "top-end",
                                title: "¡Producto sumado!",
                                showConfirmButton: false,
                                timer: 500
                            })
                        } else {
                            productoEncontrado.cantidad = 1;
                            productosEnElCarrito.push(productoEncontrado)

                            Swal.fire({
                                position: "top-end",
                                title: "¡Producto agregado!",
                                showConfirmButton: false,
                                timer: 500
                            });
                        }

                        actualizarLogoCarrito()
                        localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                    })
                });
            })
            .catch(error => {
                console.error('Error al cargar datos:', error);
            });


    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });


buscarProductoPorInput('../js/productos.json')
    .then(todosLosProductos => {
        let nombreDelProductoABuscar = "";
        let objetosEncontrados = [];
        document.querySelector("#idBuscadorNav").addEventListener("input", (e) => {
            nombreDelProductoABuscar = e.target.value;

            objetosEncontrados = todosLosProductos.filter(producto => {
                const primerasLetrasProducto = producto.nombre.substring(0, nombreDelProductoABuscar.length);
                return primerasLetrasProducto.toLowerCase() === nombreDelProductoABuscar.toLowerCase();
            });

            if (objetosEncontrados.length === 0) {
                cargarProductosDefault('../js/productos.json')
                    .then(todosLosProductos => {
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

                        agregarAlCarrito('../js/productos.json')
                            .then(todosLosProductos => {
                                let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                                botonesAniadir.forEach(boton => {
                                    boton.addEventListener("click", (e) => {
                                        let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                                        /*  AGREGAR PRODUCTO AL CARRITO */
                                        if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                            let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                            productosEnElCarrito[index].cantidad++;

                                            Swal.fire({
                                                position: "top-end",
                                                title: "¡Producto sumado!",
                                                showConfirmButton: false,
                                                timer: 500
                                            })
                                        } else {
                                            productoEncontrado.cantidad = 1;
                                            productosEnElCarrito.push(productoEncontrado)

                                            Swal.fire({
                                                position: "top-end",
                                                title: "¡Producto agregado!",
                                                showConfirmButton: false,
                                                timer: 500
                                            });
                                        }

                                        actualizarLogoCarrito()
                                        localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                                    })
                                });
                            })
                            .catch(error => {
                                console.error('Error al cargar datos:', error);
                            });


                    })
                    .catch(error => {
                        console.error('Error al cargar datos:', error);
                    });
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
            cargarProductosDefault('../js/productos.json')
                .then(todosLosProductos => {
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

                    agregarAlCarrito('../js/productos.json')
                        .then(todosLosProductos => {
                            let botonesAniadir = document.querySelectorAll(".productosContenedorDescripcionBotonesAniadirAlCarrito")

                            botonesAniadir.forEach(boton => {
                                boton.addEventListener("click", (e) => {
                                    let productoEncontrado = todosLosProductos.find(producto => producto.id == e.target.id)

                                    /*  AGREGAR PRODUCTO AL CARRITO */
                                    if (productosEnElCarrito.some(producto => producto.id == productoEncontrado.id)) {
                                        let index = productosEnElCarrito.findIndex(producto => producto.id == productoEncontrado.id)
                                        productosEnElCarrito[index].cantidad++;

                                        Swal.fire({
                                            position: "top-end",
                                            title: "¡Producto sumado!",
                                            showConfirmButton: false,
                                            timer: 500
                                        })
                                    } else {
                                        productoEncontrado.cantidad = 1;
                                        productosEnElCarrito.push(productoEncontrado)

                                        Swal.fire({
                                            position: "top-end",
                                            title: "¡Producto agregado!",
                                            showConfirmButton: false,
                                            timer: 500
                                        });
                                    }

                                    actualizarLogoCarrito()
                                    localStorage.setItem("productosEnElCarro", JSON.stringify(productosEnElCarrito))
                                })
                            });
                        })
                        .catch(error => {
                            console.error('Error al cargar datos:', error);
                        });


                })
                .catch(error => {
                    console.error('Error al cargar datos:', error);
                });
        })

    })
    .catch(error => {
        console.error('Error al cargar datos:', error);
    });

actualizarLogoCarrito()




