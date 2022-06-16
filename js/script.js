function layout(products) {                                     // For each product, create a layout

    for (let product of products) {

        let artTag = document.createElement("article");         // Creating variables for each element with their attributes

        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", product.imageUrl);
        imgTag.setAttribute("alt", product.altTxt);

        let hTag = document.createElement("h3");
        hTag.classList.add("productName");

        let parTag = document.createElement("p");
        parTag.classList.add("productDescription");

        let aTag = document.createElement("a");
        aTag.setAttribute("href", "./product.html?id=".concat(product._id));

        document                                                // Setting the layout by appending the elements to their parent node
            .getElementById("items")
                .appendChild(aTag)
                    .appendChild(artTag)
                        .appendChild(imgTag);
        artTag.appendChild(hTag).innerText = product.name;
        artTag.appendChild(parTag).innerText = product.description;
    }
}

fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        layout(data);
    })
    .catch((error) => {
        console.error("Erreur !");
});