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

let added = {
    id: "",
    qty: "",
    clr: ""
}

function addToCart() {

}

document
    .getElementById("colors")
    .addEventListener("change", function(choice) {
        if (choice.target.value = "") {
            alert("Choisissez une couleur");
        } else {
            added.clr = choice.target.value;
            console.log(choice.target.value);
            console.log(added.clr);
        }

    })

document
    .getElementById("addToCart")
    .addEventListener("click", function() {

})

fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {
            return response.json();                         // Get everything
        }
    })
    .then((data) => {                                       // Get the couch with its ID
        var pageUrl = window.location.href;                 // Get the current page URL
        var url = new URL(pageUrl);                         // Object URL is a built-in API in browsers
        var searchParams = new URLSearchParams(url.search);
        if (searchParams.has("id")) {                       // Checking if url has id
            var id = searchParams.get("id");                // Assigning the id to var
            
            for (let product of data) {                     // Match the id to its object
                if (product._id === id) {
                    console.log(product.name);
                    return product;                         // Return the object
                }
            }

        } else {
            console.error("id non récupéré")
        }
    })
    .then((couch) => {
        layoutProduct(couch);                               // Send to layout
        console.log("Layout done");
    })
    .catch((error) => {
        console.error("Erreur !");
});