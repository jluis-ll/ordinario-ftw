let nombre = document.getElementById("nombre")
let correo = document.getElementById("correo")
let mensaje = document.getElementById("mensaje")
let btnEnviar = document.getElementById("btnEnviar")
let resultado = document.getElementById("resultadoValidacion")

btnEnviar.addEventListener("click", validarUsuario)

function validarUsuario(){

    fetch("../XML/usuarios.xml")
        .then(respuesta => respuesta.text())
        .then(datos => {
            let parser = new DOMParser()
            let xml = parser.parseFromString(datos, "text/xml")

            let usuarios = xml.getElementsByTagName("usuario")
            let encontrado = false

            for(let i = 0; i < usuarios.length; i++){
                let usuario = usuarios[i]

                let nombreXML = usuario.getElementsByTagName("nombre")[0].textContent
                let correoXML = usuario.getElementsByTagName("correo")[0].textContent

                if(nombre.value == nombreXML && correo.value == correoXML){
                    encontrado = true
                }
            }

            if(encontrado == true && mensaje.value != ""){
                resultado.innerText = "Usuario válido. Mensaje enviado correctamente."
                resultado.style.color = "green"
            } else {
                resultado.innerText = "Usuario no registrado o mensaje vacío."
                resultado.style.color = "red"
            }
        })
}