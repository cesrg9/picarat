$('#btn_open').click(function () {

    let email = document.getElementById('email_login').value
    let pssw = document.getElementById('pssw_login').value 

    Swal.fire({
        title: "¡Acceso permitido!",
        text: "Ya puedes acceder a todas las funciones como usuario",
        icon: "success"
      });
})

$('#btn_open2').click(function () {

    let email = document.getElementById('email').value
    let pssw = document.getElementById('pssw').value
    let nombre = document.getElementById('nombre').value
    let tlf = document.getElementById('tlf').value


    Swal.fire({
        title: "Oops...",
        text: "Ya existe un usuario registrado con ese correo",
        icon: "error"
    });
})