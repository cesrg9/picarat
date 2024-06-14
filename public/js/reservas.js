document.addEventListener('DOMContentLoaded', async () => {

    raw = {
        coleccion: 'reservas'
    }

    $.ajax({
        url: '/reservas',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {

            if (response.bool) {
                await cargarReservasAdmin(response.reservas)
                await cargarParticipantes()
            } else {
                await cargarReservasUser(response.reservas)
            }
            await cargarEventos()
        },
        error: function () {
            alert("Algo salió mal");
        }
    })
})




$('#btn_confirm').click(function () { //reserva para mesa
    
    document.getElementById('error').style.display = 'none'
    raw = {
        date: document.getElementById('dia_reserva').value,
        n_personas: document.getElementById('comensales_reserva').value,
        estado: 'Pendiente'
    }
    $.ajax({
        url: '/asignarReserva',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            Swal.fire({
                title: "Reserva pendiente",
                text: "Tu reserva pasará a ser confirmada por un administrador",
                icon: "success"
                });
        },
        error: (xhr) => {
            const errorMessage = xhr.responseJSON.error;
            document.getElementById('error').style.display = 'flex';
            document.getElementById('error').innerHTML = errorMessage;
        }
    })
})

$('#btn_confirm2').click(function () { // reserva para evento


    raw = {
        evento: document.getElementById('reserva_evento').value,
        estado: 'Pendiente'
    }

    $.ajax({
        url: '/asignarEvento',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            if (response == 'ok') {
                Swal.fire({
                    title: "Reserva pendiente",
                    text: "Tu reserva pasará a ser confirmada por un administrador",
                    icon: "success"
                });
            }
        }
    })
})


function cargarReservasUser(reservas) {

    padre = document.getElementById('historico_reservas')

    if (reservas.length != 0) {
        reservas.forEach(reserva => {
            if (reserva.data.evento) {

                info = reserva.data.evento.replace(/_/g, " ");
                reserva_container = `<div class="reserva">
                <span>Evento:</span> ${info}<br>
                <span>Estado:</span> ${reserva.data.estado}
                </div>`
            } else {
                reserva_container = `<div class="reserva">
                <span>Fecha:</span>${reserva.data.fecha}<br>
                <span>Nº de personas:</span> ${reserva.data.n_personas} <br>
                <span>Estado:</span> ${reserva.data.estado}
                </div>`
            }

            padre.innerHTML += reserva_container
        });
    } else {
        reserva_container = `<div class="reserva">
                <span>Vaya...</span> Parece que todavía no has hecho ninguna reserva<br>
                Prueba a hacer una reserva
                </div>`
        padre.innerHTML += reserva_container
    }


}


function cargarReservasAdmin(reservas) {

    padre = document.getElementById('historico')

    if (reservas.length != 0) {
        reservas.forEach(reserva => {
            if (reserva.data.evento) {

                info = reserva.data.evento.replace(/_/g, " ");
                reserva_container = `<div class="reserva">
                <span>Email:</span> ${reserva.data.email}<br>
                <span>Evento:</span> ${info}<br>
                <span>Estado:</span> ${reserva.data.estado}<br>
                <button class="approved boton_reservas" data-value="${reserva._id}"  value="${info}//${reserva.data.email}">Aprobar reserva</button><button class="denied boton_reservas" data-value="${reserva._id}">Denegar reserva</button>
                </div>`
            } else {
                reserva_container = `<div class="reserva">
                <span>Email:</span> ${reserva.data.email}<br>
                <span>Fecha:</span>${reserva.data.fecha}<br>
                <span>Nº de personas:</span> ${reserva.data.n_personas} <br>
                <span>Estado:</span> ${reserva.data.estado}<br>
                <button class="approved boton_reservas" data-value="${reserva._id}">Aprobar reserva</button><button class="denied boton_reservas" data-value="${reserva._id}">Denegar reserva</button>
                </div>`
            }

            padre.innerHTML += reserva_container
        });
    } else {
        reserva_container = `<div class="reserva">
                <span>¡Listo!</span> Ya estás al día con todas las peticiones<br>
                </div>`
        padre.innerHTML += reserva_container
    }

    $('.approved').click(async event => {
        info = $(event.target).val().split('//')
        id = $(event.target).data('value')
        evento = info[0]
        email = info[1]
        await sendUpdate(id, 'Aprobada', evento, email)
        window.location.reload();
    })
    $('.denied').click(event => {
        id = $(event.target).data('value')
        sendUpdate(id, 'Denegada')
        window.location.reload();
    })
}

async function sendUpdate(id, estado, evento, email) {
    raw = {
        coll: 'reservas',
        data: { 'estado': estado },
        query: { "_id": id }
    }

   await $.ajax({
        url: '/modifyElement',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async () => {
            raw2 = {
                coll: 'eventos',
                email : email,
                query: { 'data.Titulo': evento }
            }
            await $.ajax({
                url: '/modifyParticipantes',
                type: 'POST',
                data: JSON.stringify(raw2),
                contentType: 'application/json',
            })
        }
    }).done(() => {
        Swal.fire({
            title: "¡Reserva Aprovada!",
            text: "Los cambios se verán reflejados al refrescar la página",
            icon: "success"
        });
    })

}

function cargarEventos() {

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
                if(element.data.N_participantes > element.data.Participantes.length){
                    titulo = `<option class="evento"> ${element.data.Titulo}</option>`
                    select.innerHTML += titulo
                }
            });
        }
    })
}

function cargarParticipantes(){
    raw = {
        coleccion: 'eventos'
    }
    $.ajax({
        url: '/getInfo',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            plazas = document.getElementById('plazas')
            document.getElementById('titulo_plazas').style.display = 'flex'

            
            response.forEach(element => {
                plazas_restantes = element.data.N_participantes - element.data.Participantes.length
                evento = `<p class='evento'>${element.data.Titulo}: ${plazas_restantes} plazas disponibles <br>`
                plazas.innerHTML += evento
            });
        }
    })
}