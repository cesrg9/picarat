document.addEventListener('DOMContentLoaded', () => {

   raw = {
      coleccion: 'articulos'
   }
   $.ajax({
      url: '/articulos',
      type: 'POST',
      data: JSON.stringify(raw),
      contentType: 'application/json',
      success: async (response) => {
         await cargarArticulos(response.articulos);
         await getButton();
         await cargarInfoModal();
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

$('.btn_close').click(() => {
   window.modal1.close();
   window.modal2.close();
})

$('.btn_delete').click(() => {

   let nombre = document.getElementById('titulos_album').value;
   raw = {
      coll : 'articulos',
      data : {
         Titulo : nombre,
      }
   }

   $.ajax({
      url: '/deleteElement',
      type: 'POST',
      data: JSON.stringify(raw),
      contentType: 'application/json',
      error: function(xhr, status, error) {
         if (xhr.status === 500) {
           console.log('Error: No hay usuario logueado');
         }
       }
   }).done(() => {
      Swal.fire({
         title: "¡Elemento modificado!",
         text: "Los cambios se verán reflejados al refrescar la página",
         icon: "success"
     });
     window.modal1.close()
   })
})

$('.btn_confirm').click(async () => {
   
   let nombre = document.getElementById('nombre').value;
   let artista = document.getElementById('artista').value;
   let date = document.getElementById('date').value;
   let estado = document.getElementById('estado').value;
   let url = document.getElementById('url').value;
   let descripcion = document.getElementById('descripcion').value;

   let raw = {
      coll: 'articulos',
      data: {
          Titulo: nombre,
          Artista: artista,
          Release: date,
          Estado: estado,
          Foto: url,
          Descripcion: descripcion
      }
  };

   $.ajax({
      url: '/addElement',
      type: 'POST',
      data: JSON.stringify(raw),
      contentType: 'application/json'
   }).done(() => {
      Swal.fire({
         title: "¡Elemento añadido!",
         text: "Los cambios se verán reflejados al refrescar la página",
         icon: "success"
     });
     window.modal2.close();
   })
})

$('.btn_modify').click(async () => {
   
   let nombre = document.getElementById('titulos_album').value;
   let estado = document.getElementById('estado2').value;
   let url = document.getElementById('url2').value;
   let descripcion = document.getElementById('descripcion2').value;

   info = {
      Titulo: nombre,
      Estado: estado,
      Foto: url,
      Descripcion: descripcion
   }

   for (key in info){
      if(info[key] == "" || info[key] == undefined){
         delete info[key]
      }
   }

   let raw = {
      coll: 'articulos',
      data: info,
      query: {"data.Titulo" : nombre }
   };
   
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
            document.getElementById('error').style.display = 'none'
            window.modal1.close()
         }
      }
   })
   

})


function cargarArticulos(data){

   const main = document.querySelector('.main');

   for (let i = 0; i < data.length; i++) {
      let info = data[i].data;

      if(i%2 == 0){
         pos = 'der';
      } else {
         pos = 'izq';
      }
      let elemento = `<div class="padre ${pos}">
      <div class="elemento">
          <div class="foto">
              <img src='${info.Foto}'>
          </div>
          <div class="info_elemento">
              <div class="titulo">
                  ${info.Titulo} (${info.Release})
              </div>
              <div class="especificaciones">
                  <div class="autor">
                  <b>Autor</b><br>${info.Artista}
                  </div>
                  <div class="estado">
                     <b>Estado</b><br>${info.Estado}
                  </div>
              </div>
              <div class="descripcion">
                  <b>Descripción</b>
                  <br>
                  <br>
                  ${info.Descripcion}
              </div>
          </div>
      </div>
      </div>`

      main.innerHTML += elemento;
   }

}

async function getButton(){

   $.ajax({
      url: '/getButton',
      type: 'POST',
      success: async (response) => {
         if(response){
            document.querySelector('.main').innerHTML += response
            await $('.admin_btn').click(() =>{
               window.modal1.showModal()
            })
            await $('.admin_btn2').click(() =>{
               window.modal2.showModal()
            })
         }
      }
   })
}

function cargarInfoModal(){

   
   raw = {
      coleccion: 'articulos'
   }
   $.ajax({
       url: '/getInfo',
       type: 'POST',
       data: JSON.stringify(raw),
       contentType: 'application/json',
       success: (response) => {

         select = document.getElementById('titulos_album')

         response.forEach(element => {
            titulo = `<option class="evento"> ${element.data.Titulo}</option>`
            select.innerHTML += titulo
         });
       }
   })
}