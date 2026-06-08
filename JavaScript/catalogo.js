let tabla = document.getElementById("tablaLibros")
let buscador = document.getElementById("buscarLibro")
let btnBuscar = document.getElementById("btnBuscar")
let librosGuardados = []

fetch("../XML/libros.xml")
    .then(respuesta => respuesta.text())
    .then(datos => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(datos, "text/xml")
        let libros = xml.getElementsByTagName("libro")
        for (let i = 0; i < libros.length; i++) {
            let libro = libros[i]
            let id = libro.getElementsByTagName("id")[0].textContent
            let titulo = libro.getElementsByTagName("titulo")[0].textContent
            let autor = libro.getElementsByTagName("autor")[0].textContent
            let genero = libro.getElementsByTagName("genero")[0].textContent
            let año = libro.getElementsByTagName("año")[0].textContent
            let imagen = libro.getElementsByTagName("imagen")[0].textContent

            librosGuardados.push({
                id: id,
                titulo: titulo,
                autor: autor,
                genero: genero,
                año: año,
                imagen: imagen
            })
        }
        mostrarLibros(librosGuardados)
    })
function mostrarLibros(libros) {
    tabla.innerHTML = ""
    for (let i = 0; i < libros.length; i++) {
        let libro = libros[i]
        tabla.innerHTML += `
            <tr>
                <td data-label="Imagen"><img src="${libro.imagen}" alt="Portada de ${libro.titulo}"></td>
                <td data-label="Título">${libro.titulo}</td>
                <td data-label="Autor">${libro.autor}</td>
                <td data-label="Género">${libro.genero}</td>
                <td data-label="Año">${libro.año}</td>
                <td data-label="Acciones">
                    <a href="detalle-libro.html?id=${libro.id}">
                        Ver detalle
                    </a>
                </td>
            </tr>
        `
    }
}

btnBuscar.addEventListener("click", filtrar)

function filtrar() {
    let texto = buscador.value.toLowerCase()
    let resultados = []
    for (let i = 0; i < librosGuardados.length; i++) {
        let libro = librosGuardados[i]
        if (libro.titulo.toLowerCase().includes(texto) ||
            libro.autor.toLowerCase().includes(texto) ||
            libro.genero.toLowerCase().includes(texto) ||
            libro.año.includes(texto)) {
            resultados.push(libro)
        }
    }
    mostrarLibros(resultados)
}