let tabla = document.getElementById("tablaUsuarios")
let buscador = document.getElementById("buscarUsuario")
let btnBuscar = document.getElementById("btnBuscar")
let usuariosGuardados = []

let solicitud = new XMLHttpRequest()

solicitud.open("GET", "../XML/usuarios.xml", true)

solicitud.onreadystatechange = function () {

    if (solicitud.readyState == 4 && solicitud.status == 200) {

        let parser = new DOMParser()
        let xml = parser.parseFromString(solicitud.responseText, "text/xml")

        let usuarios = xml.getElementsByTagName("usuario")

        for (let i = 0; i < usuarios.length; i++) {

            let usuario = usuarios[i]

            let nombre = usuario.getElementsByTagName("nombre")[0].textContent
            let correo = usuario.getElementsByTagName("correo")[0].textContent

            usuariosGuardados.push({
                nombre: nombre,
                correo: correo
            })
        }

        mostrarUsuarios(usuariosGuardados)
    }
}

solicitud.send()

function mostrarUsuarios(usuarios) {

    tabla.innerHTML = ""

    for (let i = 0; i < usuarios.length; i++) {

        let usuario = usuarios[i]

        tabla.innerHTML += `
            <tr>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
            </tr>
        `
    }
}

btnBuscar.addEventListener("click", filtrar)

function filtrar() {

    let texto = buscador.value.toLowerCase()
    let resultados = []

    for (let i = 0; i < usuariosGuardados.length; i++) {

        let usuario = usuariosGuardados[i]

        if (usuario.nombre.toLowerCase().includes(texto) ||
            usuario.correo.toLowerCase().includes(texto)) {

            resultados.push(usuario)
        }
    }

    mostrarUsuarios(resultados)
}