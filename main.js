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

        calcularStock(cantidad) {
            let newStock = 0;
            let placeToPrint = document.getElementById(`position-${this.id}`);
            if (cantidad <= this.stock) {
                newStock = this.stock - cantidad;
                placeToPrint.innerHTML = `Hay ${newStock} bolsas disponibles`
            } else {
                placeToPrint.innerHTML = `No hay stock de cafe ${this.variedad}`;
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



    //definimos las variables

    let bolsasCafe = [];
    let historial = [];

    bolsasCafe.push(new Productos(1, "Sumatra", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHv3Tsc4BvdyNweyONNC7QI6XU9Z1GfuZLgA&usqp=CAU", 890, "oscuro", 14));
    bolsasCafe.push(new Productos(2, "Colombia", "https://st3.depositphotos.com/3246763/14277/v/600/depositphotos_142778305-stock-illustration-coffee-logo-made-from-the.jpg", 890, "medio", 14));
    bolsasCafe.push(new Productos(3, "Peru", "https://admin.tiendapower.com/storage/images/products/60b7aaad6dc781622649517.jpg", 890, "oscuro", 14));
    bolsasCafe.push(new Productos(4, "Guatemala", "https://admin.tiendapower.com/storage/images/products/60b6bf5f3b39a1622589279.jpg", 910, "medio", 14));
    bolsasCafe.push(new Productos(5, "Brasil", "https://lh3.googleusercontent.com/VGlZRkYj1TIOuI0gVo_-TMqWPQxQqI-glqIFJO5vyaYkiekES6Nxlfa0_oe-kGVzBpGUeZWhnDkNWfPENqOZmq9lUPK6rrcX5Q", 890, "rubio", 14));

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


    //  definimos funciones
    ////    Enviaremos y codificaremos el array de precios

    const fillGrid = (number) => {
        $(`.product-${bolsasCafe[number].id}`).prepend(
            ` 
                <h2 class="card-title">${bolsasCafe[number].variedad}</h2>
                <img src="${bolsasCafe[number].imagen}" alt="cafe-${bolsasCafe[number].variedad}"
                class="card-img">
                <p class="card-p">${bolsasCafe[number].tostado}</p>
                <p id="position-${bolsasCafe[number].id}">Hay ${bolsasCafe[number].stock} bolsas disponiles</p>
                <h3 class="card-price">${bolsasCafe[number].precio}</h3>
                `);
    }

    fillGrid(0);
    fillGrid(1);
    fillGrid(2);
    fillGrid(3);
    fillGrid(4);



    const imprimirFondos = () => {
        let verificarMonto = 0;
        verificarMonto = JSON.parse(localStorage.getItem("nuevoMonto"));
        return verificarMonto;
    }

    const verificarPrecioTotal = () => {
        let montoResta = 0;
        montoResta = JSON.parse(localStorage.getItem("totalCompra"));
        return montoResta;
    }


    const calcularResto = () => {
        if (imprimirFondos() >= verificarPrecioTotal()) {
            $("#chargedWallet").append(`
            <p>${imprimirFondos() - verificarPrecioTotal()}$</p>
            `);
            $("#chargedWallet p:nth-child(2)").css({
                "display": "none",
            });
        }
    }

    // calcular precio total
    const precioTotal = () => {
        let precioTotal = 0;
        $(".eachPrice").each(function () {
            let precioItem = parseFloat($(this).text());
            precioTotal = precioTotal + precioItem;
        })
        $("#total-price").text(`${precioTotal}$`);
        localStorage.setItem("totalCompra", JSON.stringify(precioTotal));
    }


    const agregarItemCarrito = (a, b) => {
        //buscamos datos
        let nombre = a.variedad;
        let cantidad = b.value;
        let precio = `<span class="eachPrice">${parseFloat(a.precio * cantidad)}</span>`;
        let remove = `<button class="remove">X</button>`
   
        if (a.stock == 0) {
            $("#articulos").append(`<li>No hay mas articulos del seleccionado  ${remove}</li>`);
        } else {
            $("#articulos").append(`<li>${cantidad} bolsas de cafe ${nombre} - $${precio}  ${remove}</li>`);
            historial.push(a);
            localStorage.setItem("bolsasCafe", JSON.stringify(historial));
        }
    }


    //definimos los eventos

    selectBtnSumatra.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[0].calcularStock(selectSumtara.value, `stock_atribute--${bolsasCafe[0].variedad}`);
        agregarItemCarrito(bolsasCafe[0], selectSumtara);
        precioTotal();
        $(".remove").on("click", function () {
            $(this).parent().remove();
            precioTotal();
        })
    }


    selectBtnColombia.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[1].calcularStock(selectColombia.value, `stock_atribute--${bolsasCafe[1].variedad}`);
        agregarItemCarrito(bolsasCafe[1], selectColombia);
        precioTotal();
        $(".remove").on("click", function () {
            $(this).parent().remove();
            precioTotal();
        })
    }


    selectBtnPeru.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[2].calcularStock(selectPeru.value, `stock_atribute--${bolsasCafe[2].variedad}`);
        agregarItemCarrito(bolsasCafe[2], selectPeru);
        precioTotal();
        $(".remove").on("click", function () {
            $(this).parent().remove();
            precioTotal();
        })
        localStorage.setItem("bolsaCafe", JSON.stringify(bolsasCafe[2]));
    }


    selectBtnGuatemala.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[3].calcularStock(selectGuatemala.value, `stock_atribute--${bolsasCafe[3].variedad}`);
        agregarItemCarrito(bolsasCafe[3], selectGuatemala);
        precioTotal();
        $(".remove").on("click", function () {
            $(this).parent().remove();
            precioTotal();
        })
    }


    selectBtnBrasil.onclick = (e) => {
        e.preventDefault();
        bolsasCafe[4].calcularStock(selectBrasil.value, `stock_atribute--${bolsasCafe[4].variedad}`);
        agregarItemCarrito(bolsasCafe[4], selectBrasil);
        precioTotal();
        $(".remove").on("click", function () {
            $(this).parent().remove();
            precioTotal();
        })
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

    $("#compra_btn").on("click", (e) => {
        e.preventDefault();
        calcularResto(precioTotal());
        $(e.target).addClass("hide");
        $("#carrito_compra").append(`
        Muchísimas gracas por tu compra`);
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

    // Concatenando animaciones para que se oculte y se muestre el carrito


    $("#btn_openCarrito").on("click", function (e) {
        e.preventDefault();
        let carrito_section = $("#carrito_compra");
        carrito_section.toggleClass("seccion_carrito--active");
        $("#btn_openCarrito").toggleClass("btn_openCarrito--active");
        $(".title").toggleClass("title_animation");
    })


})



