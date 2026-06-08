let tabla = document.getElementById("tablaAutores")
let buscador = document.getElementById("buscarAutor")
let btnBuscar = document.getElementById("btnBuscar")
let autoresGuardados = []

fetch("../XML/autores.xml")
    .then(respuesta => respuesta.text())
    .then(datos => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(datos, "text/xml")

        let autores = xml.getElementsByTagName("autor")

        for (let i = 0; i < autores.length; i++) {
            let autor = autores[i]

            let nombre = autor.getElementsByTagName("nombre")[0].textContent
            let nacionalidad = autor.getElementsByTagName("nacionalidad")[0].textContent
            let nacimiento = autor.getElementsByTagName("nacimiento")[0].textContent
            let biografia = autor.getElementsByTagName("biografia")[0].textContent
            let obra = autor.getElementsByTagName("obra")[0].textContent

            autoresGuardados.push({
                nombre: nombre,
                nacionalidad: nacionalidad,
                nacimiento: nacimiento,
                biografia: biografia,
                obra: obra
            })
        }
        mostrarAutores(autoresGuardados)
    })

function mostrarAutores(autores) {
    tabla.innerHTML = ""
    for (let i = 0; i < autores.length; i++) {
        let autor = autores[i]
        tabla.innerHTML += `
                <tr>
                    <td>${autor.nombre}</td>
                    <td>${autor.nacionalidad}</td>
                    <td>${autor.nacimiento}</td>
                    <td>${autor.biografia}</td>
                    <td>${autor.obra}</td>
                </tr>
            `
    }
}

btnBuscar.addEventListener("click", filtrar)

function filtrar() {
    let texto = buscador.value.toLowerCase()
    let resultados = []
    for (let i = 0; i < autoresGuardados.length; i++) {
        let autor = autoresGuardados[i]
        if (autor.nombre.toLowerCase().includes(texto) ||
            autor.nacionalidad.toLowerCase().includes(texto) ||
            autor.nacimiento.includes(texto)||
            autor.obra.toLowerCase().includes(texto)) {
            resultados.push(autor)
        }
    }
    mostrarAutores(resultados)
}