// Obtener referencia al formulario
const formulario = document.querySelector('#miFormulario');
const modalExito = document.querySelector('#modalExito');

// Evento submit del formulario
formulario.addEventListener('submit', function(event) {
  event.preventDefault();

  if (formulario.checkValidity() === false) {
    event.stopPropagation();
    formulario.classList.add('was-validated');
  } else {
    guardarDatos();
    enviarResultados();
  }
});

// Funcion para guardar los datos del formulario en el almacenamiento local
function guardarDatos() {
  const datos = {
    nombre: document.querySelector('#nombre').value,
    email: document.querySelector('#email').value,
    mensaje: document.querySelector('#mensaje').value
  };

  const datosJson = JSON.stringify(datos);
  localStorage.setItem('formularioDatos', datosJson);
}

// Funcion para simular el envio de resultados al servidor
function enviarResultados() {
  // Simulación de envío de resultados al servidor
  setTimeout(function() {
    // Limpiar el formulario
    formulario.reset();
    formulario.classList.remove('was-validated');

    // Mostrar ventana modal de éxito
    modalExito.style.display = 'block';
    modalExito.classList.add('show');

    // Cerrar la ventana modal después de 3 segundos
    setTimeout(function() {
      closeModal();
    }, 3000);

    // Eliminar los datos guardados en el almacenamiento local
    localStorage.removeItem('formularioDatos');
  }, 1000);
}

// Cargar los datos del formulario guardados en el almacenamiento local
function cargarDatosGuardados() {
  const datosJson = localStorage.getItem('formularioDatos');

  if (datosJson) {
    const datos = JSON.parse(datosJson);
    document.querySelector('#nombre').value = datos.nombre;
    document.querySelector('#email').value = datos.email;
    document.querySelector('#mensaje').value = datos.mensaje;
  }
}

// Cerrar la ventana modal de éxito
function closeModal() {
  modalExito.style.display = 'none';
  modalExito.classList.remove('show');
}

cargarDatosGuardados();

const modalCerrar = modalExito.querySelector('.close');
modalCerrar.addEventListener('click', function() {
  closeModal();
});
