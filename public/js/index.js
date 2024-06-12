document.addEventListener('DOMContentLoaded', () => {

    $.ajax({
        url: '/',
        type: 'POST',
        success : async (response) => {
            await cargarEventos(response);
            await funcionalidadBotones();
            await cargarInfoModal();
            await getButton();
        },
        error: (xhr) => {
            Swal.fire({
                title: "Oh oh...",
                text: "Parece que estamos teniendo problemas para cargar la información de esta página",
                icon: "error"
            }); 
        } 
    })
})



function cargarEventos(eventosArray){

    const eventContainer = document.querySelector('.event_container');

    eventosArray.forEach(evento => {
        
        let info = evento.data;

        event_date = new Date(info.Fecha)
        today = new Date()



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

        if(today < event_date){
            eventContainer.innerHTML += divEvento;
        }

    });
}


async function funcionalidadBotones(){

    await $('.btn_open').click(event => {
        id_evento = $(event.target).data('value')
        showInfoEvento(id_evento)
    })    
    
    await $('.btn_close').click(() => {
        window.modal1.close()
        window.modal2.close()
        window.modal3.close()
    })
}

$('.btn_modify').click(async () => {
   
    nombre = document.getElementById('nombres_eventos').value
    dia_evento = document.getElementById('dia_evento2').value
    descripcion = document.getElementById('input_descripcion_evento2').value
    organizador = document.getElementById('organizador2').value
 
    info = {
        Titulo : nombre,
        Descripcion : descripcion,
        Fecha : dia_evento,
        Organizador: organizador
    }
 
    for (key in info){
       if(info[key] === "" || info[key] === undefined){
          delete info[key]
       }
    }
 
    raw = {
       coll : 'eventos',
       data : info,
       query: { "data.Titulo" : nombre }
    }
    if(!nombre || nombre == ''){
        document.getElementById('error').style.display = 'flex';
        document.getElementById('error').innerHTML = 'Debes seleccionar un elemento';
    } else {
    $.ajax({
       url: '/modifyElement',
       type: 'POST',
       data: JSON.stringify(raw),
       contentType: 'application/json',
       success: async (response) => {
          if(response == 'ok'){
             Swal.fire({
                title: "¡Elemento modificado!",
                text: "Los cambios se verán reflejados al refrescar la página",
                icon: "success"
            });
            window.modal2.close()
          }
       }
    })
    }
})

$('.btn_confirm').click(async () => {
   
    nombre = document.getElementById('nombre').value
    dia_evento = document.getElementById('dia_evento').value
    descripcion = document.getElementById('input_descripcion_evento').value
    organizador = document.getElementById('organizador').value

    raw = {
       coll : 'eventos',
       data : {
          Titulo : nombre,
          Descripcion : descripcion,
          Fecha : dia_evento,
          Participantes : [],
          Organizador: organizador
       }
    }

    diaDate = new Date(dia_evento)
    today= new Date()

    if(diaDate < today || diaDate == 'Invalid Date'){
        document.getElementById('error').style.display = 'flex';
        document.getElementById('error').innerHTML = 'La fecha introducida no es válida';
    } else {
        $.ajax({
        url: '/addElement',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
                window.modal3.close()
                if(response == 'ok'){
                    Swal.fire({
                        title: "¡Elemento añadido!",
                        text: "Los cambios se verán reflejados al refrescar la página",
                        icon: "success"
                    })
                }
        },
        error: (xhr) => {
                const errorMessage = xhr.responseJSON.error;
                document.getElementById('error').style.display = 'flex';
                document.getElementById('error').innerHTML = errorMessage;
            }
        })
    }
})

$('.btn_delete').click(() => {
    nombre = document.getElementById('nombres_eventos').value
    raw = {
       coll : 'eventos',
       data : {
          Titulo : nombre,
       }
    }
    if(!nombre || nombre == ''){
        document.getElementById('error').style.display = 'flex';
        document.getElementById('error').innerHTML = 'Debes seleccionar un elemento';
    } else {
        $.ajax({
            url: '/deleteElement',
            type: 'POST',
            data: JSON.stringify(raw),
            contentType: 'application/json',
            success: async (response) => {
                window.modal2.close()
                if(response == 'ok'){
                    Swal.fire({
                    title: "¡Elemento modificado!",
                    text: "Los cambios se verán reflejados al refrescar la página",
                    icon: "success"
                });
                }
            }
        })
    }
})

async function showInfoEvento(id){

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

            if(response.Participantes){
                users = ''
                response.Participantes.forEach(element => {
                    users += element + '<br>'
                })
                document.querySelector('#participantes').innerHTML = users
            } else {
                document.querySelector('#participantes_txt').innerHTML = ''
            }


        }
    })

    await funcionalidadBotones()
    window.modal1.showModal()

}


async function getButton(){

    $.ajax({
       url: '/getButton',
       type: 'POST',
       success: async (response) => {
          if(response){
             document.querySelector('.main').innerHTML += response
             await $('.admin_btn').click(() =>{
                window.modal2.showModal()
             })
             await $('.admin_btn2').click(() =>{
                window.modal3.showModal()
             })
          }
         await funcionalidadBotones()

       }
    })
 }
 function cargarInfoModal(){

   
    raw = {
       coleccion: 'eventos'
    }
    $.ajax({
        url: '/getInfo',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
 
            select = document.getElementById('nombres_eventos')
 
            response.forEach(element => {
                titulo = `<option class="evento"> ${element.data.Titulo}</option>`
                select.innerHTML += titulo
            });
        }
    })
 }