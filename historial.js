
// creamos un nuevo array que obtenga los datos del localStorage

let compras = [];

compras.push(JSON.parse(localStorage.getItem("selectoresHistorial")));


// Los datos del localStorage van a ordenarse de la siguiente manera en pantalla

compras[0].forEach(el => {
    let listaCompras = document.createElement("p");
    listaCompras.innerHTML = `has comprado ${el.cantidad} unidad/es de ${el.variedad}` 
    document.querySelector("#listaCompras").appendChild(listaCompras);
});