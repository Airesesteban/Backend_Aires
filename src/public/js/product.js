function deleteProduct(pid) {
    fetch(`/api/products/${pid}`,{
        method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Producto eliminado con exito:', data);
      })
      .catch(error => {
        console.error('Error al eliminar producto:', error);
      });
}