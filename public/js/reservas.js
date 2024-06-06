document.addEventListener('DOMContentLoaded', async () => {

    raw = {
        coleccion : 'reservas'
    }

    $.ajax({
        url: '/reservas',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
    }).done(async (response) => {

        console.log(response.bool)

        if(response.bool){
            await cargarReservasAdmin(response.reservas)
        } else {
            await cargarReservasUser(response.reservas)
        }
        await cargarEventos()
    }).fail(function() {
        alert("Algo salió mal");
    })
})




$('#btn_confirm').click(function () { //reserva para mesa

    raw = {
        date : document.getElementById('dia_reserva').value,
        n_personas : document.getElementById('comensales_reserva').value,
        estado : 'pendiente'
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

$('#btn_confirm2').click(function () { // reserva para evento

    
    raw = {
        evento : document.getElementById('reserva_evento').value,
        estado : 'pendiente'
    }

    $.ajax({
        url: '/asignarEvento',
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


function cargarReservasUser(reservas){
            
    padre = document.getElementById('historico_reservas')

    if(reservas.length != 0){
        reservas.forEach(reserva => {
            if(reserva.data.evento){
    
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


function cargarReservasAdmin(reservas){
            
    padre = document.getElementById('historico_reservas')

    reservas.forEach(reserva => {
        if(reserva.data.evento){

            info = reserva.data.evento.replace(/_/g, " ");
            reserva_container = `<div class="reserva">
            <span>Email:</span> ${reserva.data.email}<br>
            <span>Evento:</span> ${info}<br>
            <span>Estado:</span> ${reserva.data.estado}<br>
            <button class="approved" value="mondongo">Aprobar reserva</button>
            </div>`
        } else {
            reserva_container = `<div class="reserva">
            <span>Email:</span> ${reserva.data.email}<br>
            <span>Fecha:</span>${reserva.data.fecha}<br>
            <span>Nº de personas:</span> ${reserva.data.n_personas} <br>
            <span>Estado:</span> ${reserva.data.estado}<br>
            <button class="approved" data-value="${reserva._id}">Aprobar reserva</button><button class="denied" data-value="${reserva._id}">Denegar reserva</button>
            </div>` 
        }

       padre.innerHTML += reserva_container
    });

    $('.approved').click(event => {
        id = $(event.target).data('value')
        sendUpdate(id, 'Aprobada')
    })
    $('.denied').click(event => {
        id = $(event.target).data('value')
        sendUpdate(id, 'Denegada')
    })    
}

function sendUpdate(id, estado){
    raw = {
        coll : 'reservas',
        data : {'estado' : estado},
        query: { "_id" : id }
     }
    
    $.ajax({
        url: '/modifyElement',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
    }).done( () => {
        Swal.fire({
            title: "¡Reserva Aprovada!",
            text: "Los cambios se verán reflejados al refrescar la página",
            icon: "success"
        });
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