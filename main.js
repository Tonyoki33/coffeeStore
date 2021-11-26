$(() => {

    // Definimos clases
    class Productos {
        constructor(id, variedad, imagen, precio, tostado, stock, selector) {
            this.id = id;
            this.variedad = variedad;
            this.imagen = imagen
            this.precio = precio;
            this.tostado = tostado;
            this.stock = stock;
            this.selector = selector
        }

        calcularStock(cantidad, position) {
            let newStock = 0;
            if (cantidad <= this.stock) {
                newStock = this.stock - cantidad;
                let positiveNewStock = document.createElement("p");
                positiveNewStock.setAttribute("id", "positiveStock");
                document.getElementById(position).innerHTML = `Hay ${newStock} de bolsas disponibles`;
            } else {
                let negativeNewStock = document.createElement("p");
                negativeNewStock.setAttribute("id", "negativeStock");
                document.getElementById(position).innerHTML = `No hay stock de cafe ${this.variedad}`;
            }
            return this.stock = newStock;
        }


        calcularPrecio(cantidad) {
            let newPrice = 0;
            newPrice = this.precio * cantidad;
            return newPrice;
        }

        calculoFondos(fondos, cantidad) {
            let newPrice = 0;
            newPrice = this.precio * cantidad;
            if (fondos.value > newPrice) {
                let newFunds = fondos.value - newPrice;
                document.getElementById("chargedWallet").innerHTML = `<p>${newFunds}$</p>`;
                return newFunds;
            } else {
                document.getElementById("chargedWallet").innerHTML = `Necesitas más dinero`;
            }
        }

    }

    class CarritoCompras {
        constructor(variedad, cantidad, precio) {
            this.variedad = variedad;
            this.cantidad = cantidad;
            this.precio = precio;
        }
    }


    //definimos las variables

    let bolsasCafe = [];

    let carroCompras = [[]];

    bolsasCafe.push(new Productos(0, "Sumatra", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHv3Tsc4BvdyNweyONNC7QI6XU9Z1GfuZLgA&usqp=CAU", 890, "oscuro", 14));
    bolsasCafe.push(new Productos(1, "Colombia", "https://st3.depositphotos.com/3246763/14277/v/600/depositphotos_142778305-stock-illustration-coffee-logo-made-from-the.jpg", 890, "medio", 14));
    bolsasCafe.push(new Productos(2, "Peru", "https://admin.tiendapower.com/storage/images/products/60b7aaad6dc781622649517.jpg", 890, "oscuro", 14));
    bolsasCafe.push(new Productos(3, "Guatemala", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSROSog1kO-NqerHygFAmMSFAWM9zEgPlty1g&usqp=CAU", 910, "medio", 14));
    bolsasCafe.push(new Productos(4, "Brasil", "https://d2r9epyceweg5n.cloudfront.net/stores/624/466/products/dsc018461-87578569c01cf9700215328738010466-1024-1024.png", 890, "rubio", 14));

    //Vamos a mostrar la wallet con el dinero final
    let walletTitle = document.createElement("h3");
    walletTitle.innerHTML = "Tu cartera";
    document.getElementById("wallet").prepend(walletTitle);


    //buscamos por medio de querys los selectores y botones de los productos
    const selectSumtara = document.querySelector("#select_sumatra");
    const selectBtnSumatra = document.querySelector("#btn_sumatra");

    const selectColombia = document.querySelector("#select_colombia");
    const selectBtnColombia = document.querySelector("#btn_colombia");

    const selectPeru = document.querySelector("#select_peru");
    const selectBtnPeru = document.querySelector("#btn_peru");

    const selectGuatemala = document.querySelector("#select_guatemala");
    const selectBtnGuatemala = document.querySelector("#btn_guatemala");

    const selectBrasil = document.querySelector("#select_brasil");
    const selectBtnBrasil = document.querySelector("#btn_brasil");




    // jQuery section

    const likeSumatra = $("#like_btn--sumatra");
    const likeColombia = $("#like_btn--colombia");
    const likePeru = $("#like_btn--peru");
    const likeGuatemala = $("#like_btn--guatemala");
    const likeBrasil = $("#like_btn--brasil");

    // representamos la lista del array let bolsasCafe = []; en el HTML
    bolsasCafe.forEach(el => {
        let bolsaTitulo = document.createElement("h2");
        bolsaTitulo.innerHTML = el.variedad;
        document.getElementById("product_data").appendChild(bolsaTitulo);

        let cafeTostado = document.createElement("p");
        cafeTostado.innerHTML = `El tostado es: ${el.tostado}`;
        document.getElementById("product_data").appendChild(cafeTostado);

        let cafeImg = document.createElement("img");
        cafeImg.setAttribute("src", el.imagen);
        cafeImg.setAttribute("class", "img_class");
        document.getElementById("product_data").appendChild(cafeImg);

        let cafePrecio = document.createElement("p");
        cafePrecio.innerHTML = `${el.precio}`;
        cafePrecio.setAttribute("class", "precio");
        document.getElementById("product_data").appendChild(cafePrecio);

        let cafeStock = document.createElement("p");
        cafeStock.innerHTML = `Hay ${el.stock} de bolsas disponibles`;
        cafeStock.setAttribute("id", `stock_atribute--${el.variedad}`);
        document.getElementById("product_data").appendChild(cafeStock);

    })


    //  definimos funciones
    ////    Enviaremos y codificaremos el array de precios


    const imprimirFondos = () => {
        let verificarMonto = 0;
        verificarMonto = JSON.parse(localStorage.getItem("nuevoMonto"));
        return verificarMonto;
    }

    const enviarCarrito = () => {
        localStorage.setItem("carrito", JSON.stringify(bolsasCafe));
        return carroCompras;
    }




    //definimos los eventos


    /*estamos creando el carrito de compras, creamos un each para poder definir facilmente los valores del
    array carroCompras en el DOM*/

    selectBtnSumatra.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[0].calcularStock(selectSumtara.value, `stock_atribute--${bolsasCafe[0].variedad}`);
        enviarCarrito();

        // carroCompras.slice(1).forEach(el => {
        //     $("#articulos").append(
        //         `
        //         <div id="nuevo_articulo">
        //         <h3>Bolsas de cafe ${el.variedad}</h3>
        //         <p>Deseas llevar ${el.cantidad}</p>
        //         <h4>Seran ${el.precio}$</h4>
        //         </div>
        //         `
        //     )
            

        // });
    }



    selectBtnColombia.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[1].calcularStock(selectColombia.value, `stock_atribute--${bolsasCafe[1].variedad}`);
        enviarCarrito();
    }


    selectBtnPeru.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[2].calcularStock(selectPeru.value, `stock_atribute--${bolsasCafe[2].variedad}`);
        enviarCarrito();   
    }


    selectBtnGuatemala.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[3].calcularStock(selectGuatemala.value, `stock_atribute--${bolsasCafe[3].variedad}`);
        enviarCarrito();
    }


    selectBtnBrasil.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[4].calcularStock(selectBrasil.value, `stock_atribute--${bolsasCafe[4].variedad}`);
        console.log(guardarCompra(bolsasCafe[4].variedad, selectBrasil.value));
        enviarCarrito();

    }

    // charge-btn enviará la información de los fondos al localStorage
    ////    Luego de enviar la informacion, cambiaremos las clases de en todos los divs de la wallet
    //////      luego traeremos por medio de la funcion imprimirFondos() la info y la imprimiremos en la wallet
    ////////      Para finalizar haremos que ese monto impreso se pueda sumar y restar con las compras

    $("#charge-btn").on("click", function (e) {
        e.preventDefault();
        //1
        localStorage.setItem("nuevoMonto", JSON.stringify(($("#monto-carga").val())));
        imprimirFondos();
        //2
        $("#wallet").addClass("walletOff");
        $("#chargedWallet").addClass("chargedWallet_on");
        //3
        $("#chargedWallet").append(`
        <p>${imprimirFondos()}$</p>
        `);
        $("#chargedWallet p:first-child").css({
            "display": "none",
        });
    })



    // jQuery

    likeSumatra.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("like_btn--active");
        console.log(bolsasCafe[0].variedad);
    })

    likeColombia.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("like_btn--active");
        console.log(bolsasCafe[1].variedad);
    })

    likePeru.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("like_btn--active");
        console.log(bolsasCafe[2].variedad);
    })

    likeGuatemala.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("like_btn--active");
        console.log(bolsasCafe[3].variedad);
    })

    likeBrasil.on("click", function (e) {
        e.preventDefault();
        $(this).toggleClass("like_btn--active");
        console.log(bolsasCafe[4].variedad);
    })
})


// Concatenando animaciones para que se oculte y se muestre el carrito

$("#btn_openCarrito").on("click", function (e) {
    e.preventDefault();
    let carrito_section = $("#carrito_compra");
    carrito_section.toggleClass("seccion_carrito--inactive");
    $("#btn_openCarrito").toggleClass("btn_openCarrito--active");
    $("#carrito_compra h2").animate({
        "opacity": "0.6"}
    );

})

