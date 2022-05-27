(function () {
  //Variables
  var formulario = document.getElementsByTagName('form')[0],
    elementos = document.getElementsByName('texto'),
    boton = document.getElementById('form-button');

  var validarTexto = function (e) {
    if (document.texto.value == 0) {
      alert('Completa el campo');
      e.preventDefault();
    }
  };

  var validar = function (e) {
    validarTexto(e);
  };
  document.addEventListener('submit', validar);
})();
