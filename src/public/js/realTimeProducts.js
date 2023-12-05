const socket = io();

socket.on("productosActualizados", (products) => {

    productsDiv.innerHTML = "";

    products.forEach((prod) => {

      productsDiv.innerHTML += `

          <div class="product-container shadow">

            <p>Title: ${prod.title}</p>

            <p>Description: ${prod.description}</p>

            <p>Price: ${prod.price}</p>

            <p>Thumbnail: ${prod.thumbnail}</p>

            <p>Category: ${prod.category}</p>

            <p>Status: ${prod.status}</p>

            <p>Code: ${prod.code}</p>

            <p>Stock: ${prod.stock}</p>

            <p>pid: ${prod.id}</p>

          </div>

          `;

    });

  });

let form = document.getElementById("formProduct");
  form.addEventListener("submit", (evt) => {
    evt.preventDefault();
  
    let title = form.elements.title.value;
    let description = form.elements.description.value;
    let stock = form.elements.stock.value;
    let thumbnail = form.elements.thumbnail.value;
    let category = form.elements.category.value;
    let price = form.elements.price.value;
    let code = form.elements.code.value;
    let status = form.elements.status.checked; 
  
    socketClient.emit("addProduct", {
      title,
      description,
      stock,
      thumbnail,
      category,
      price,
      code,
      status, 
  
    });
  
    form.reset();
  });