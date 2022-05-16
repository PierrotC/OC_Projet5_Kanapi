cart = JSON.parse(localStorage.getItem("cartData"));
console.log("cart : " + cart + " cart[0] : " + cart[0] + " cart[1] : " + cart[1]);

for (let product of cart) {                                                 // check every element of the cart array

    function layoutCart(couch) {
        let artTag = document.createElement("article");
        artTag.classList.add("cart__item");
        artTag.setAttribute("data-id", couch._id);
        artTag.setAttribute("data-color", product.clr);
        document.getElementById("cart__items").appendChild(artTag);

        let divImgTag = document.createElement("div")
        divImgTag.classList.add("cart__item__img");

        let imgTag = document.createElement("img");
        imgTag.setAttribute("src", couch.imageUrl);
        imgTag.setAttribute("alt", couch.altTxt);

        let divCtntTag = document.createElement("div");
        divCtntTag.classList.add("cart__item__content");

        let divDescrTag = document.createElement("div");
        divDescrTag.classList.add("cart__item__content__description");

        let hTag = document.createElement("h2");
        hTag.innerText = couch.name;

        let pClrTag = document.createElement("p");
        pClrTag.innerText = product.clr;

        let pPriceTag = document.createElement("p");
        pPriceTag.innerText = couch.price;

        let divSetTag = document.createElement("div");
        divSetTag.classList.add("cart__item__content__settings");

        let divQtyTag = document.createElement("div");
        divQtyTag.classList.add("cart__item__content__settings__quantity");

        let pQtyTag = document.createElement("p");
        pQtyTag.innerText = "Qté : ".concat(product.qty);

        let inputQtyTag = document.createElement("input");
        inputQtyTag.classList.add("itemQuantity");
        inputQtyTag.setAttribute("type", "number");
        inputQtyTag.setAttribute("name", "itemQuantity");
        inputQtyTag.setAttribute("min", "1");
        inputQtyTag.setAttribute("max", "100");
        inputQtyTag.setAttribute("value", product.qty);

        let divDltTag = document.createElement("div");
        divDltTag.classList.add("cart__item__content__settings__delete");

        let pDltTag = document.createElement("p");
        pDltTag.classList.add("deleteItem");
        pDltTag.innerText = "Supprimer";

        artTag
            .appendChild(divImgTag)
                .appendChild(imgTag);
        artTag
            .appendChild(divCtntTag)
                .appendChild(divDescrTag)
                    .appendChild(hTag);
                    divDescrTag.appendChild(pClrTag);
                    divDescrTag.appendChild(pPriceTag);
        artTag
            .appendChild(divSetTag)
                .appendChild(divQtyTag)
                    .appendChild(pQtyTag);
                    divQtyTag.appendChild(inputQtyTag);
                divSetTag.appendChild(divDltTag)
                    .appendChild(pDltTag);

    }

    //   <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    //     <div class="cart__item__img">
    //       <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    //     </div>
    //     <div class="cart__item__content">
    //       <div class="cart__item__content__description">
    //         <h2>Nom du produit</h2>
    //         <p>Vert</p>
    //         <p>42,00 €</p>
    //       </div>
    //       <div class="cart__item__content__settings">
    //         <div class="cart__item__content__settings__quantity">
    //           <p>Qté : </p>
    //           <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
    //         </div>
    //         <div class="cart__item__content__settings__delete">
    //           <p class="deleteItem">Supprimer</p>
    //         </div>
    //       </div>
    //     </div>
    //   </article>

    fetch("http://localhost:3000/api/products/".concat(product.id))         // get their individual info based on id
        .then((response) => {
            if (response.ok) {
                console.log("response ok");
                return response.json();
            }
        })
        .then((data) => {
            console.log("data : " + data + " id récupéré : " + data._id + " imageURL : " + data.imageUrl);
            layoutCart(data);
        })
        .catch((error) => {
            console.error("Erreur !");
    });
}