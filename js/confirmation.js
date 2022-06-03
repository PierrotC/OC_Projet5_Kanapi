function getId() {
    var pageUrl = window.location.href;                     // Get the current page URL
    var url = new URL(pageUrl);                             // Object URL is a built-in API in browsers
    var searchParams = new URLSearchParams(url.search);

    if (searchParams.has("id")) {                           // Checking if url has id
        return searchParams.get("id");               // Assigning the id to var
    } else {
        console.error("id non récupéré")
    }
}

function printId(id) {
    document.getElementById("orderId").innerText = id;
}
printId(getId())