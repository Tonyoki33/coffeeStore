
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