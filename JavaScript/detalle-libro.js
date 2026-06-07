let contenedor = document.getElementById("detalleLibro")

let parametros = new URLSearchParams(window.location.search)
let idBuscado = parametros.get("id")

fetch("../XML/libros.xml")
    .then(respuesta => respuesta.text())
    .then(datos => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(datos, "text/xml")

        let libros = xml.getElementsByTagName("libro")

        for (let i = 0; i < libros.length; i++) {
            let libro = libros[i]

            let id = libro.getElementsByTagName("id")[0].textContent

            if (id == idBuscado) {
                let titulo = libro.getElementsByTagName("titulo")[0].textContent
                let autor = libro.getElementsByTagName("autor")[0].textContent
                let genero = libro.getElementsByTagName("genero")[0].textContent
                let año = libro.getElementsByTagName("año")[0].textContent
                let editorial = libro.getElementsByTagName("editorial")[0].textContent
                let paginas = libro.getElementsByTagName("paginas")[0].textContent
                let vistas = libro.getElementsByTagName("vistas")[0].textContent
                let imagen = libro.getElementsByTagName("imagen")[0].textContent
                let descripcion = libro.getElementsByTagName("descripcion")[0].textContent

                contenedor.innerHTML = `
                    <div class="portada">
                        <img src="${imagen}" alt="Portada de ${titulo}">
                    </div>

                    <div class="informacion">
                        <h2>${titulo}</h2>
                        <h3>${autor}</h3>

                        <div class="datos">
                            <p><strong>Género:</strong> ${genero}</p>
                            <p><strong>Año:</strong> ${año}</p>
                            <p><strong>Editorial:</strong> ${editorial}</p>
                            <p><strong>Páginas:</strong> ${paginas}</p>
                            <p><strong>Vistas:</strong> ${vistas}</p>
                            <p><strong>Estado:</strong> Disponible</p>
                        </div>

                        <div class="descripcion">
                            <h4>Descripción</h4>
                            <p>${descripcion}</p>
                        </div>

                        <a href="../index.html" class="btn-regresar">Regresar al inicio</a>
                    </div>
                `
            }
        }
    })