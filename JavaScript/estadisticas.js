let totalLibros = document.getElementById("totalLibros")
let totalAutores = document.getElementById("totalAutores")
let libroMasVisto = document.getElementById("libroMasVisto")
let generoPrincipal = document.getElementById("generoPrincipal")
let contenedorBarras = document.getElementById("contenedorBarras")

fetch("../XML/libros.xml")
    .then(respuesta => respuesta.text())
    .then(datos => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(datos, "text/xml")

        let libros = xml.getElementsByTagName("libro")

        totalLibros.innerText = libros.length

        let mayorVista = 0
        let tituloMayorVista = ""
        let generoMasRepetido = ""
        let generos = {}

        for (let i = 0; i < libros.length; i++) {
            let libro = libros[i]

            let titulo = libro.getElementsByTagName("titulo")[0].textContent
            let genero = libro.getElementsByTagName("genero")[0].textContent
            let vistas = libro.getElementsByTagName("vistas")[0].textContent

            if (parseInt(vistas) > mayorVista) {
                mayorVista = parseInt(vistas)
                tituloMayorVista = titulo
            }

            if (generos[genero] == undefined) {
                generos[genero] = 1
            } else {
                generos[genero]++
            }

            contenedorBarras.innerHTML += `
                <div class="barra">
                    <p>${titulo}</p>
                    <div class="progreso">
                        <div class="relleno" style="width: ${parseInt(vistas) / 25}%"></div>
                    </div>
                    <span>${vistas} vistas</span>
                </div>
            `
        }

        libroMasVisto.innerText = tituloMayorVista

        let mayorGenero = 0

        for (let genero in generos) {
            if (generos[genero] > mayorGenero) {
                mayorGenero = generos[genero]
                generoMasRepetido = genero
            }
        }

        generoPrincipal.innerText = generoMasRepetido
    })

fetch("../XML/autores.xml")
    .then(respuesta => respuesta.text())
    .then(datos => {
        let parser = new DOMParser()
        let xml = parser.parseFromString(datos, "text/xml")

        let autores = xml.getElementsByTagName("autor")

        totalAutores.innerText = autores.length
    })