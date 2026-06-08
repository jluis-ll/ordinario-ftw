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
        let librosGuardados = []

        for (let i = 0; i < libros.length; i++) {
            let libro = libros[i]

            let titulo = libro.getElementsByTagName("titulo")[0].textContent
            let genero = libro.getElementsByTagName("genero")[0].textContent
            let vistas = libro.getElementsByTagName("vistas")[0].textContent

            librosGuardados.push({
                titulo: titulo,
                genero: genero,
                vistas: parseInt(vistas)
            })

            if (parseInt(vistas) > mayorVista) {
                mayorVista = parseInt(vistas)
                tituloMayorVista = titulo
            }

            if (generos[genero] == undefined) {
                generos[genero] = 1
            } else {
                generos[genero]++
            }
        }

        librosGuardados.sort(function (a, b) {
            return b.vistas - a.vistas
        })

        contenedorBarras.innerHTML = ""

        for (let i = 0; i < librosGuardados.length; i++) {
            let libro = librosGuardados[i]

            contenedorBarras.innerHTML += `
                <div class="barra">
                    <p>${libro.titulo}</p>
                    <div class="progreso">
                        <div class="relleno" style="width: ${libro.vistas / 40}%"></div>
                    </div>
                    <span>${libro.vistas} vistas</span>
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