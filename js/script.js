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

        document                                                // Setting the layout by appending the elements to their main node
            .getElementById("items")
                .appendChild(aTag)
                    .appendChild(artTag)
                        .appendChild(imgTag);
        artTag.appendChild(hTag).innerText = product.name;
        artTag.appendChild(parTag).innerText = product.description;
    }
}

/* <a href="./product.html?id=42">
            <article>
              <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
              <h3 class="productName">Kanap name1</h3>
              <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
            </article>
          </a> */

fetch("http://localhost:3000/api/products")
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((data) => {
        layout(data);
        console.log("Layout done");
    })
    .catch((error) => {
        console.error("Erreur !");
});