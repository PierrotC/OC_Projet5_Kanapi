let cart = JSON.parse(localStorage.getItem("cartData"));
const layoutPromises = [];
let productAll = [];

function updatePrice() {
    let price = 0;
        for (product of productAll) {
            price += Number(product.info.price) * Number(product.qty);
        }
        document.getElementById("totalPrice").innerText = price;
}

function updateQty() {
    let nbOfProducts = 0;
        for (product of productAll) {
            nbOfProducts += Number(product.qty);
        }
        document.getElementById("totalQuantity").innerText = nbOfProducts;
}

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
            pQtyTag.innerText = "Qté : ";

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

            // update the totals and merge cart and product info in productAll
            productAll.push({
                clrPicked: productClr,
                qty: productQty,
                info: couch
            })
            updatePrice();
            updateQty();

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

    const deleteBtnArray = document.getElementsByClassName("deleteItem");           // listen click on delete buttons

    for (let deleteBtn of deleteBtnArray) {
    
        deleteBtn.addEventListener('click', () => {
            const deletedProduct = deleteBtn.closest('.cart__item');
            const deletedId = deletedProduct.dataset.id;
            const deletedClr = deletedProduct.dataset.color;

            for (let item of productAll) {
                if (item.info._id == deletedId && item.clrPicked == deletedClr) {
                    productAll.splice(productAll.indexOf(item), 1);
                }
            }

            for (let item of cart) {
                if (item.id == deletedId && item.clr == deletedClr) {
                    cart.splice(cart.indexOf(item), 1);
                    localStorage.setItem("cartData", JSON.stringify(cart));
                }
            }

            deleteBtn.closest('.cart__item').remove();

            // Update total qty and price
            updateQty();
            updatePrice();
        });
    }

    const qtyInputs = document.getElementsByClassName('itemQuantity');

    for (let qtyInput of qtyInputs) {

        qtyInput.addEventListener('change', (e) => {
            const changedProduct = qtyInput.closest('.cart__item');
            const changedId = changedProduct.dataset.id;
            const changedClr = changedProduct.dataset.color;

            for (let item of productAll) {
        
                if (item.info._id == changedId && item.clrPicked == changedClr) {
                    item.qty = e.target.value;                    
                } 
            }

            for (let itemCart of cart) {
                if (itemCart.id == changedId && itemCart.clr == changedClr) {
                    itemCart.qty = e.target.value;
                    localStorage.setItem("cartData", JSON.stringify(cart));
                }
            }
            
            // Update total qty and price
            updateQty();
            updatePrice();
        })
    }
});

const orderBtn = document.getElementById('order');
const form = {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    email: ""
};

function firstNameIsValid() {
    document.getElementById('firstNameErrorMsg').innerText = '';
    let input = document.getElementById('firstName').value;
    let masque = /^([A-z]|-| )+$/g;
    if (masque.test(input)) {
        return true;
    } else {
        document.getElementById('firstNameErrorMsg').innerText = 'Veuillez renseigner un prénom valide';
        return false;
    };
}

function lastNameIsValid() {
    document.getElementById('lastNameErrorMsg').innerText = '';
    let input = document.getElementById('lastName').value;
    let masque = /^([A-z]|-| )+$/g;
    if (masque.test(input)) {
        return true;
    } else {
        document.getElementById('lastNameErrorMsg').innerText = 'Veuillez renseigner un nom valide';
        return false;
    };
}

function addressIsValid() {
    document.getElementById('addressErrorMsg').innerText = '';
    let input = document.getElementById('address').value;
    let masque = /^(\d+|\d+[A-z]{2,3}) [A-z]+ ([A-z]| |-)+$/g;
    if (masque.test(input)) {
        return true;
    } else {
        document.getElementById('addressErrorMsg').innerText = 'Veuillez renseigner une adresse valide';
        return false;
    };
}

function cityIsValid() {
    document.getElementById('cityErrorMsg').innerText = '';
    let input = document.getElementById('city').value;
    let masque = /^([A-z]|-| )+$/g;
    if (masque.test(input)) {
        return true;
    } else {
        document.getElementById('cityErrorMsg').innerText = 'Veuillez renseigner une ville valide';
        return false;
    };
}

function emailIsValid() {
    document.getElementById('emailErrorMsg').innerText = '';
    let input = document.getElementById('email').value;
    let masque = /^\w+@\w+[.][a-z]{2,3}$/g;
    if (masque.test(input)) {
        return true;
    } else {
        document.getElementById('emailErrorMsg').innerText = 'Veuillez renseigner un email valide';
        return false;
    };
}

orderBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // checking for errors in form
    if (firstNameIsValid() && lastNameIsValid() && addressIsValid() && cityIsValid() && emailIsValid()) {
        form.firstName = document.getElementById('firstName').value;
        form.lastName = document.getElementById('lastName').value;
        form.address = document.getElementById('address').value;
        form.city = document.getElementById('city').value;
        form.email = document.getElementById('email').value;

        // creating array of ids in cart
        const cartId = [];
        for (let product of cart) {
            for (let i = 0; i < product.qty; i++) {
                cartId.push(product.id);
            }
        }

        const order = {
            contact: form,
            products: cartId
        }

        fetch('http://localhost:3000/api/products/order', {
            method: "POST",
            headers: { 
                'Accept': 'application/json', 
                'Content-Type': 'application/json' 
                },
            body: JSON.stringify(order)
        })
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
        })
        .then((data) => {
            const confirmationPage = "./confirmation.html?id=".concat(data.orderId);
            window.location.href = confirmationPage;
        });
    }
})