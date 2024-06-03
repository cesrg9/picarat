$('#btn_open').click(function () {

    let email = document.getElementById('email_login').value
    let pssw = document.getElementById('pssw_login').value 
    raw = {
        email : email,
        pssw : pssw
    }

    $.ajax({
        url: '/login',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            if(response == 'ok'){
                Swal.fire({
                    title: "¡Acceso permitido!",
                    text: "Ya puedes acceder a todas las funciones como usuario",
                    icon: "success"
                });
                document.getElementById('error').style.display = 'none'
            } else {
                document.getElementById('error').style.display = 'flex'
            }
        }
    })




})






$('#btn_open2').click(function () {

    let email = document.getElementById('email').value
    let pssw = document.getElementById('pssw').value
    let nombre = document.getElementById('nombre').value
    let tlf = document.getElementById('tlf').value

    raw = {
        email : email,
        pssw : pssw,
        nombre : nombre,
        tlf : tlf
    }

    $.ajax({
        url: '/register',
        type: 'POST',
        data: JSON.stringify(raw),
        contentType: 'application/json',
        success: async (response) => {
            if(response == 'ok'){
                Swal.fire({
                    title: "¡Ya te has registrado!",
                    text: "Ya puedes acceder a todas las funciones como usuario",
                    icon: "success"
                });
                document.getElementById('error2').style.display = 'none'
            } else {
                document.getElementById('error2').style.display = 'flex'
            }
        }
    })
})