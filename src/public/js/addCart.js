function obtenerCartId() {
   
    return 'cart';
  }
  

  function addToCart(pid) {
    const cid = obtenerCartId();
  
    if (!cidd) {
      console.error('Error: cid no válido');
      return;
    }
  
    fetch(`/api/dbCarts/${cid}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pid: pid,
        quantity: 1, 
      }),
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
        console.error('Error al agregar al carrito:', error);
      });
  }