document.addEventListener('DOMContentLoaded', async () => {

    await cargarReservas()
    await cargarEventos()

})





$('#btn_open').click(function () { //reserva para mesa

    raw = {
        date : document.getElementById('dia_reserva').value,
        n_personas : document.getElementById('comensales_reserva').value
    }

    $.ajax({
        url: '/asignarReserva',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            if(response == 'ok'){
                Swal.fire({
                    title: "Reserva pendiente",
                    text: "Tu reserva pasará a ser confirmada por un administrador",
                    icon: "success"
                });
            }
        }
    })
})

$('#btn_open2').click(function () { // reserva para evento

    evento = document.getElementById('reserva_evento').value

    console.log(evento)

    Swal.fire({
        title: "Oops...",
        text: "No puedes hacer una reserva si no estás registrado...",
        icon: "info"
    });
})

function cargarReservas(){
    raw = {
        coleccion: 'reservas'
    }
    $.ajax({
        url: '/reservas',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            console.log(response)
        }
    })
}



function cargarEventos(){

    raw = {
        coleccion: 'eventos'
    }
    $.ajax({
        url: '/getInfo',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {

            select = document.getElementById('reserva_evento')

            response.forEach(element => {
                titulo = `<option class="evento"> ${element.data.Titulo}</option>`
                select.innerHTML += titulo
            });
        }
    })
}