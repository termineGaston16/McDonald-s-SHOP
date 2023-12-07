/* Recorrer el LocalStorage */
/* Dark Mode */
if (localStorage.getItem("modoOscuro") == "true") {
    document.querySelector(".bodyIndex").classList.add("bodyIndexModoOscuro")
    document.querySelector(".headerIndex").classList.add("headerIndexModoOscuro")
    document.querySelector(".mainIndex").classList.add("mainIndexModoOscuro")
    document.querySelector("#idBotonModoOscuro").classList.add("botonesIndexModoOscuroActivado")
}
/* ------ */
/* ------------------------------------ */

/* Funcion de los botones */
document.querySelector("#idBotonModoOscuro").addEventListener("click",()=>{
    document.querySelector(".bodyIndex").classList.toggle("bodyIndexModoOscuro")
    document.querySelector(".headerIndex").classList.toggle("headerIndexModoOscuro")
    document.querySelector(".mainIndex").classList.toggle("mainIndexModoOscuro")
    document.querySelector("#idBotonModoOscuro").classList.toggle("botonesIndexModoOscuroActivado")

    if (document.querySelector(".headerIndex").classList.contains("headerIndexModoOscuro")) {
        localStorage.setItem("modoOscuro",true)
    } else {
        localStorage.setItem("modoOscuro",false)
    }

})

/* ------------------------------------ */

/* Elegir si comer aquí o llevar */
document.querySelector("#botonComerAqui").addEventListener("click",()=>{
    localStorage.setItem("comerAquí",true)
    window.location.href = "index/menu.html";
})

document.querySelector("#botonComerLlevar").addEventListener("click",()=>{
    localStorage.setItem("comerAquí",false)
    window.location.href = "index/menu.html";
})
