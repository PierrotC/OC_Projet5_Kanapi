let cart = JSON.parse(localStorage.getItem("cartData"));
const layoutPromises = [];

function displayProduct(productId, productClr, productQty) {
    return new Promise((resolve) => {                                          // send promise to be resolved

        fetch("http://localhost:3000/api/products/".concat(productId))         // get their individual info based on id
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
        })
        .then((couch) => {
            let artTag = document.createElement("article");
            artTag.classList.add("cart__item");
            artTag.setAttribute("data-id", productId);
            artTag.setAttribute("data-color", productClr);
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
            pClrTag.innerText = productClr;

            let pPriceTag = document.createElement("p");
            pPriceTag.innerText = couch.price;

            let divSetTag = document.createElement("div");
            divSetTag.classList.add("cart__item__content__settings");

            let divQtyTag = document.createElement("div");
            divQtyTag.classList.add("cart__item__content__settings__quantity");

            let pQtyTag = document.createElement("p");
            pQtyTag.innerText = "Qté : ".concat(productQty);

            let inputQtyTag = document.createElement("input");
            inputQtyTag.classList.add("itemQuantity");
            inputQtyTag.setAttribute("type", "number");
            inputQtyTag.setAttribute("name", "itemQuantity");
            inputQtyTag.setAttribute("min", "1");
            inputQtyTag.setAttribute("max", "100");
            inputQtyTag.setAttribute("value", productQty);

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
            resolve();                                                          // resolve the promise once layout is done
        })
        .catch((error) => {
            console.error("Erreur !");
        });

            
    });
}


for (let product of cart) {                                                         // check every element of the cart array and display it
    const returnedPromise = displayProduct(product.id, product.clr, product.qty);
    layoutPromises.push(returnedPromise);                                           // push the returned promise to the array
}

Promise.all(layoutPromises).then(() => {                                            // once everything has loaded, manage the events

    console.log(cart);
    const deleteBtnArray = document.getElementsByClassName("deleteItem");           // listen click on delete buttons

    for (let deleteBtn of deleteBtnArray) {
    
        deleteBtn.addEventListener('click', () => {
            for (let item of cart) {
                const deletedProduct = deleteBtn.closest('.cart__item');
                const deletedId = deletedProduct.dataset.id;
                const deletedClr = deletedProduct.dataset.color;
        
                if (item.id == deletedId && item.clr == deletedClr) {
                    console.log(cart);
                    cart.splice(cart.indexOf(item), 1);
                    localStorage.setItem("cartData", JSON.stringify(cart));
                    console.log(cart);
                }
            }
            deleteBtn.closest('.cart__item').remove();
        });
    }

    const qtyInputs = document.getElementsByClassName('itemQuantity');

    for (let qtyInput of qtyInputs) {

        qtyInput.addEventListener('change', (e) => {
            for (let item of cart) {
                const changedProduct = qtyInput.closest('.cart__item');
                const changedId = changedProduct.dataset.id;
                const changedClr = changedProduct.dataset.color;
        
                if (item.id == changedId && item.clr == changedClr) {
                    console.log(cart);
                    item.qty = e.target.value;
                    localStorage.setItem("cartData", JSON.stringify(cart));
                    console.log(cart);
                } 
            }
        })
    }
});

