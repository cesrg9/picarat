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

   if(!nombre || nombre == ''){
      document.getElementById('error').style.display = 'flex';
      document.getElementById('error').innerHTML = 'Debes seleccionar una opción';
   } else {
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
           document.getElementById('error').style.display = 'none';
           window.modal1.close()
         }
      }
   })
   }
})


$('.btn_modify').click(async () => {
   
   nombre = document.getElementById('nombres_carta').value
   precio = document.getElementById('precio').value
   descripcion = document.getElementById('descripcion_carta').value.replace(/\n/g, '<br>');
   disponible = (document.getElementById('disponible').value === "true")

   info = {
      Titulo : nombre,
      Precio : precio,
      Descripcion : descripcion,
      Disponibilidad : disponible
   }


   for (key in info){
      if(info[key] === "" || info[key] === undefined){
         delete info[key]
      }
   }

   raw = {
      coll : 'carta',
      data : info,
      query: { "data.Titulo" : nombre }
   }

   if(!nombre || nombre == ''){
      document.getElementById('error').style.display = 'flex';
      document.getElementById('error').innerHTML = 'Debes seleccionar una opción';
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
           document.getElementById('error').style.display = 'none';
           window.modal1.close()
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

$('.btn_confirm').click(async () => {
   
   nombre = document.getElementById('nombre').value
   precio = document.getElementById('precio2').value
   descripcion = document.getElementById('descripcion_carta2').value.replace(/\n/g, '<br>');
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
           document.getElementById('error2').style.display = 'none';
         }
      },
      error: (xhr) => {
         const errorMessage = xhr.responseJSON.error;
         document.getElementById('error2').style.display = 'flex';
         document.getElementById('error2').innerHTML = errorMessage;
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