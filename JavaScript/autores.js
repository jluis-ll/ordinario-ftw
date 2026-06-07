let tabla = document.getElementById("tablaAutores")

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

            tabla.innerHTML += `
                <tr>
                    <td>${nombre}</td>
                    <td>${nacionalidad}</td>
                    <td>${nacimiento}</td>
                    <td>${biografia}</td>
                    <td>${obra}</td>
                </tr>
            `
        }
    })