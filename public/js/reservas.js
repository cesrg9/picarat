$('#btn_open').click(function () {

    let dia = document.getElementById('dia_reserva').value
    let npersonas = document.getElementById('comensales_reserva').value

    console.log(dia, npersonas)

    Swal.fire({
        title: "Reserva realizada!",
        text: "Tu reserva va a ser revisada por un administrador",
        icon: "success"
      });
})

$('#btn_open2').click(function () {

    evento = document.getElementById('reserva_evento').value

    console.log(evento)

    Swal.fire({
        title: "Oops...",
        text: "No puedes hacer una reserva si no estás registrado...",
        icon: "info"
    });
})