function changeRol(uid) {
    fetch(`/api/users/premium/${uid}`,{
        method: 'PUT',
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
        console.log('Cambio de rol realizado con exito:', data);
      })
      .catch(error => {
        console.error('Error al cambiar el rol:', error);
      });
}

function deleteUser(uid) {
    fetch(`/api/users/${uid}`,{
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
        console.log('Usuario eliminado con exito:', data);
      })
      .catch(error => {
        console.error('Error al eliminar usuario:', error);
      });
}