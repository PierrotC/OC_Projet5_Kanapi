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
    
    currentCouch = couch;                   // get the current product object out
}

let cart = [];
let currentCouch = [];                      // stocks info of the couch in the page

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
        added.id = currentCouch._id;
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
        } else {
            cart.push(added);                                                           // new object added in cart
        }

        localStorage.setItem("cartData", JSON.stringify(cart));                         // update cart in localStorage
        let testCart = localStorage.getItem("cartData");
        console.log("Envoyé vers le panier : " + testCart);
    })

var pageUrl = window.location.href;                     // Get the current page URL
var url = new URL(pageUrl);                             // Object URL is a built-in API in browsers
var searchParams = new URLSearchParams(url.search);

if (searchParams.has("id")) {                           // Checking if url has id
    var couchId = searchParams.get("id");                    // Assigning the id to var
} else {
    console.error("id non récupéré")
}

console.log(couchId);

fetch("http://localhost:3000/api/products/".concat(couchId))
    .then((response) => {
        if (response.ok) {
            return response.json();                         // Get everything
        }
    })
    .then((couch) => {
        layoutProduct(couch);                               // Send to layout
        console.log("Layout done");
    })
    .catch((error) => {
        console.error("Erreur !");
});