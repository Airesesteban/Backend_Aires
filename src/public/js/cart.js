  function getCartById(cid) {
    fetch(`/api/carts/${cid}`, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Carro recuperado:', data);
      })
      .catch(error => {
        console.error('Error al recuperar carrito:', error);
      });
  }
  
  function getCartByUserId(userId) {
    fetch(`/api/user/${userId}/cart`, {
        method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Carro recuperado:', data);
      })
      .catch(error => {
        console.error('Error al recuperar carrito:', error);
      });
  }

  function addProductToCart(cid,pid) {
    console.log(cid,pid);
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Producto agregado al carrito:', data);
      })
      .catch(error => {
        console.error('Error al agregar producto al carrito:', error);
      });
  }

  function deleteProduct(cid,pid) {
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Producto eliminado:', data);
      })
      .catch(error => {
        console.error('Error al eliminar el producto:', error);
      });
  }

  function deleteAllProducts(cid) {
    fetch(`/api/carts/${cid}`, {
        method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Productos eliminados:', data);
      })
      .catch(error => {
        console.error('Error al eliminar los productos:', error);
      });
  }

  function updateProductQuantity(cid,pid,quantity) {
    fetch(`/api/carts/${cid}/product/${pid}`, {
        method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({quantity})
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Cantidad actualizada:', data);
      })
      .catch(error => {
        console.error('Error al actualizar la cantidad:', error);
      });
  }

  function purchase(cid) {
    fetch(`/api/carts/${cid}/purchase`, {
        method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Carrito comprado', data);
      })
      .catch(error => {
        console.error('Error al comprar carrito:', error);
      });
  }
