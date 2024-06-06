document.addEventListener('DOMContentLoaded', () => {

    $.ajax({
        url: '/',
        type: 'POST',
        success : async (response) => {
            await cargarEventos(response);
            await funcionalidadBotones();
        }
    })
})



function cargarEventos(eventosArray){

    const eventContainer = document.querySelector('.event_container');

    eventosArray.forEach(evento => {
        
        let info = evento.data;

        if (info.Descripcion.length > 250){
            info.Descripcion = info.Descripcion.substring(0,250)
            info.Descripcion += '...'
        }

        
        divEvento =`<div class="event_info">
                        <p>
                            <span class="subtitulo">${info.Titulo}</span>
                            <br><br>
                            ${info.Descripcion}
                        </p>
                        <button class="btn_open" data-value='${evento._id}'>
                            + Info
                        </button>
                    </div>`

        
        eventContainer.innerHTML += divEvento;

    });
}


function funcionalidadBotones(){

    $('.btn_open').click(event => {
        
        id_evento = $(event.target).data('value')
        showInfoEvento(id_evento)
    })    
    
    $('.btn_close').click(() => {
        window.modal1.close()
    })
}


function showInfoEvento(id){

    raw = {
        'id' : id
    }

    $.ajax({
        url: '/getInfoEvento',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: (response) =>{
            
            document.querySelector('#titulo_evento').innerHTML = response.Titulo
            document.querySelector('#fecha_evento').innerHTML = response.Fecha
            document.querySelector('#organizador_evento').innerHTML = response.Organizador
            document.querySelector('#descripcion_evento').innerHTML = response.Descripcion

        }
    })

    funcionalidadBotones()
    window.modal1.showModal()

}