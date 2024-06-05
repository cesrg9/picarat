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
         await getButton()
         await cargarInfoModal()

      }
   })


})

$('.btn_close').click(() => {
   window.modal1.close()
   window.modal2.close()
})


$('.btn_delete').click(() => {
   nombre = document.getElementById('nombres_carta').value
   raw = {
      coll : 'carta',
      data : {
         Titulo : nombre,
      }
   }

   $.ajax({
      url: '/deleteElement',
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
           window.modal1.close()
         }
      }
   })


})


$('.btn_modify').click(async () => {
   
   nombre = document.getElementById('nombres_carta').value
   precio = document.getElementById('precio').value
   descripcion = document.getElementById('descripcion_carta').value
   disponible = (document.getElementById('disponible').value === "true")

   info = {
      Titulo : nombre,
      Precio : precio,
      Descripcion : descripcion,
      Disponibilidad : disponible
   }

   console.log(disponible)

   for (key in info){
      if(info[key] === "" || info[key] === undefined){
         delete info[key]
      }
   }

   raw = {
      coll : 'carta',
      data : info
   }
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
           window.modal1.close()
         }
      }
   })

})

$('.btn_confirm').click(async () => {
   
   nombre = document.getElementById('nombre').value
   precio = document.getElementById('precio2').value
   descripcion = document.getElementById('descripcion_carta2').value
   disponible = (document.getElementById('disponible2').value === "true")

   raw = {
      coll : 'carta',
      data : {
         Titulo : nombre,
         Precio : precio,
         Descripcion : descripcion,
         Disponibilidad : disponible
      }
   }

   $.ajax({
      url: '/addElement',
      type: 'POST',
      data: JSON.stringify(raw),
      contentType: 'application/json',
      success: async (response) => {
         if(response == 'ok'){
            Swal.fire({
               title: "¡Elemento añadido!",
               text: "Los cambios se verán reflejados al refrescar la página",
               icon: "success"
           });
           window.modal2.close()
         }
      }
   })

})

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


function cargarCarta(carta) {

   const main = document.querySelector('.main');
   divElemento = ''

   cartaFiltrada = [];

   carta.forEach(key => {
      if (key.data.Disponibilidad) {
         cartaFiltrada.push(key);
      }
  });
   console.log(cartaFiltrada)


   for (let i = 0; i < cartaFiltrada.length; i += 3) {

      const row = cartaFiltrada.slice(i, i + 3);
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

function cargarInfoModal(){

   
   raw = {
      coleccion: 'carta'
   }
   $.ajax({
       url: '/getInfo',
       type: 'POST',
       data: JSON.stringify(raw),
       contentType: 'application/json',
       success: async (response) => {

           select = document.getElementById('nombres_carta')

           response.forEach(element => {
               titulo = `<option class="evento"> ${element.data.Titulo}</option>`
               select.innerHTML += titulo
           });
       }
   })
}