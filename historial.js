
// creamos un nuevo array que obtenga los datos del localStorage

let compras = [];

compras.push(JSON.parse(localStorage.getItem("selectoresHistorial")));


// Los datos del localStorage van a ordenarse de la siguiente manera en pantalla

compras[0].forEach(el => {
    let listaCompras = document.createElement("p");
    listaCompras.innerHTML = `has comprado ${el.cantidad} unidad/es de ${el.variedad}` 
    document.querySelector("#listaCompras").appendChild(listaCompras);
});

//  vamos a traer mediante AJAX datos de usuarios para que se pueda ver quienes compraron en la tienda

////    Declaramos una constante con el link a llamar

const URLGET = "https://jsonplaceholder.typicode.com/users";

//////  Llamamos a nuestro link mediante el boton de mostrar comentarios de usuarios

$("#mostrarComentarios").on("click",function(e){
    e.preventDefault();
    $.get(URLGET,function(data,status){
        if (status === "success"){
            let datos = data;
            for (const name of datos){
                $("#comentariosUsuarios").append(
                    `
                    <div class="user_comments">
                    <h2>${name.name}</h2>
                    <p>Actualmente vivo en ${name.address.city} y mi pedido llegó existosamente, estoy supersatisfecho con el café</p>
                    </div>
                    
                    `)
            }
        }
    })
})