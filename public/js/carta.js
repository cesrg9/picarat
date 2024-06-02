document.addEventListener('DOMContentLoaded', () => {

   raw = {
      coleccion: 'carta'
   }

   $.ajax({
      url: '/carta',
      type: 'POST',
      data: JSON.stringify(raw),
      contentType: 'application/json',
      success: async (response) => {
         await cargarCarta(response)
      }
   })
})


function cargarCarta(carta) {

   const main = document.querySelector('.main');
   divElemento = ''

   for (let i = 0; i < carta.length; i += 3) {

      const row = carta.slice(i, i + 3);
      let divElemento = ''
      let divPadre = ''

      row.forEach(element => {
         let info = element.data

         divElemento += `<div class="elemento">
                           <div class="titulo">
                              ${info.Titulo}
                           </div>
                           <div class="descripcion">
                              Descripción
                           </div>
                           <div class="texto">
                              ${info.Descripcion}
                           </div>
                           <div class="precio">
                              Precio: ${info.Precio}€
                           </div>
                        </div>`
      });

      divPadre = `<div class="container_padre">${divElemento}</div>`
      main.innerHTML += divPadre


  }
}