let tabla = document.getElementById("tablaLibros")

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

            tabla.innerHTML += `
                <tr>
                    <td><img src="${imagen}" alt="Portada de ${titulo}"></td>
                    <td>${titulo}</td>
                    <td>${autor}</td>
                    <td>${genero}</td>
                    <td>${año}</td>
                    <td>
                        <a href="detalle-libro.html?id=${id}">
                            Ver detalle
                        </a>
                    </td>
                </tr>
            `
        }
    })