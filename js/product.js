function layoutProduct(couch) {
    let imgTag = document.createElement("img");
    imgTag.setAttribute("src", couch.imageUrl);
    imgTag.setAttribute("alt", couch.altTxt);

    for (color of couch.colors) {
        let option = document.createElement("option");
            option.setAttribute("value", color);
            option.innerText = color;
        
        document
        .getElementById("colors")
        .appendChild(option);
    }

    document
        .querySelector("title")
        .innerText = couch.name;
    
    document
        .querySelector("article .item__img")
        .appendChild(imgTag);

    document
        .getElementById("title")
        .innerText = couch.name;

    document
        .getElementById("price")
        .innerText = couch.price;
    
    document
        .getElementById("description")
        .innerText = couch.description;
}

function getProductId() {
    var pageUrl = window.location.href;                     // Get the current page URL
    var url = new URL(pageUrl);                             // Object URL is a built-in API in browsers
    var searchParams = new URLSearchParams(url.search);

    if (searchParams.has("id")) {                           // Checking if url has id
        return searchParams.get("id");               // Assigning the id to var
    } else {
        console.error("id non récupéré")
    }
}
var couchId = getProductId();

function getCart() {
    let currentCartJSON = localStorage.getItem("cartData");                         // getting cart in local storage
    if (currentCartJSON) {
        const cart = JSON.parse(currentCartJSON);
        return cart;
    } else {
        const cart = [];
        return cart;
    }
}

document
    .getElementById("addToCart")
    .addEventListener("click", function() {
        let added = {
            id: "",
            qty: "",
            clr: ""
        }
        added.clr = document.getElementById("colors").value;                            // getting the chosen color
        added.qty = document.getElementById("quantity").value;                          // getting the chosen quantity
        added.id = couchId;

        let kanapName = document.getElementById('title').innerText;

        const cart = getCart();

        let sameProduct = false;
        let productKey;
        for(let i in cart) {                                                            // checking if couch already added
                if (cart[i].id == added.id && cart[i].clr == added.clr) {
                    sameProduct = true;
                    productKey = i;
                }
            }

        if (!added.clr) {
            alert("Veuillez choisir une couleur");
        } else if (added.qty == 0) {
            alert("Veuillez choisir une quantité")
        } else if (sameProduct){
            for (let i = 0; i < added.qty; i++) {                                       // increment qty in cart depending on qty added
                cart[productKey].qty ++;
            }
            alert(added.qty + ' ' + kanapName + ' ' + added.clr + " ajouté(s) au panier !");
        } else {
            cart.push(added);                                                           // new object added in cart
            alert(added.qty + ' ' + kanapName + ' ' + added.clr + " ajouté(s) au panier !");
        }

        localStorage.setItem("cartData", JSON.stringify(cart));                         // update cart in localStorage
    })

fetch("http://localhost:3000/api/products/".concat(couchId))
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((couch) => {
        layoutProduct(couch);                               // Send to layout
    })
    .catch((error) => {
        console.error("Erreur !");
});