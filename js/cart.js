cart = JSON.parse(localStorage.getItem("cartData"));
console.log(cart);

function layout(order) {
    for (let product of cart) {

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
        console.log("Layout done");
    })
    .catch((error) => {
        console.error("Erreur !");
});