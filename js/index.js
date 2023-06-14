document.addEventListener('DOMContentLoaded', function() {
  const formulario = document.querySelector('#miFormulario');
  const modalExito = document.querySelector('#modalExito');

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

  function guardarDatos() {
    const datos = {
      nombre: document.querySelector('#nombre').value,
      email: document.querySelector('#email').value,
      mensaje: document.querySelector('#mensaje').value
    };

    const datosJson = JSON.stringify(datos);
    localStorage.setItem('formularioDatos', datosJson);
  }

  function enviarResultados() {
    setTimeout(function() {
      formulario.reset();
      formulario.classList.remove('was-validated');

      modalExito.style.display = 'block';
      modalExito.classList.add('show');

      setTimeout(function() {
        closeModal();
      }, 3000);

      localStorage.removeItem('formularioDatos');
    }, 1000);
  }

  function closeModal() {
    modalExito.style.display = 'none';
    modalExito.classList.remove('show');
  }

  function cargarDatosGuardados() {
    const datosJson = localStorage.getItem('formularioDatos');

    if (datosJson) {
      const datos = JSON.parse(datosJson);
      document.querySelector('#nombre').value = datos.nombre;
      document.querySelector('#email').value = datos.email;
      document.querySelector('#mensaje').value = datos.mensaje;
    }
  }

  cargarDatosGuardados();

  const modalCerrar = modalExito.querySelector('.close');
  modalCerrar.addEventListener('click', function() {
    closeModal();
  });
});