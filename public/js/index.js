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

    console.log(id)

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

    window.modal1.innerHTML = ` <!-- Modal de info de eventos-->
    <h3 id="titulo_evento">Título del evento</h3>
    <hr>
    <p><b>Fecha: </b><span id="fecha_evento">dd/mm/aaaa</span></p>
    <p><b>Organizador: </b><span id="organizador_evento">Nombre / Empresa</span></p>
    <p><b>Descripción: </b><span id="descripcion_evento">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sit totam nisi nulla
        voluptate consequatur
        nihil exercitationem inventore! Non odio iusto consequatur dolorem voluptatum similique hic quasi aliquid
        ipsam pariatur?</span></p>
    <hr>
    <button class="btn_close">Cerrar</button>
  `
    funcionalidadBotones()
    window.modal1.showModal()

}