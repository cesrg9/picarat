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
         await cargarArticulos(response)
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
