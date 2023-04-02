var http = require('http')

var fs = require('fs')

function readFile(filePath, res){ 
	fs.readFile(filePath, function (error, html) {
		//La funcion "readFile" tiene el metodo "readFile" para leer los archivos html de la pagina.
		//Dentro de dicho metodo, podemos controlar (infimamente) el error que apareceria si no 
		//existe la pagina. Esto tambien ocurre en caso de que todo funcionara correctamente. 
		if (error) {
			res.statusCode = 404
			res.setHeader('Content-Type', 'text/html')
			res.end('No se encontro el archivo')
		} else {
			res.write(html)
			res.end()
		}
	}) 
}

http.createServer(function (req, res) {
	res.statusCode = 200 //Se establece nuestra respuesta con el codigo 200.
	res.setHeader('Content-Type', 'text/html') //Se estable el header como html.

	var url = req.url

	//Estas condicionales sirven como el "manejador" de rutas de la pagina. 
	//Si bien no es la forma mas optima de administrarlas, es un primer paso y nos sirve 
	//para ver como son las bases de una aplicacion con node.js sin ningun tipo de frameworks o librerias.
	if (url === '/servicios') {
		//La funcion "readFile" se encarga de todo lo relacionado a lo que se muestre en la pagina.
		readFile('./views/pages/servicios.html', res)  
	} else if (url === '/galeria') {
		readFile('./views/pages/galeria.html', res)
	} else if (url === '/sobrenosotros') {
		readFile('./views/pages/nosotros.html', res)
	} else if (url === '/nuestrahistoria') {
		readFile('./views/pages/historia.html', res)
	} else if (url === '/testimonios') {
		readFile('./views/pages/testimonio.html', res)
	} else if (url === '/contactenos') {
		readFile('./views/pages/contacto.html', res)
	} else {
		readFile('./views/index.html', res)
	}

	//Escuchamos cualquier solicitud POST
	if (req.method === 'POST') {
		//Variable para almacenar datos del form
        let data = '';
		//guardamos cada chunk en la variable data (chunks son los fragmentos de data que llegan 1 por 1)
        req.on('data', chunk => {
            data += chunk.toString();
        });
		//confirmamos que se mando correctamente la data
        req.on('end', () => {
            console.log(data);
            res.end('Data recibida');
        });
    }

}).listen(3000, function () {
	//El metodo "listen" nos sirve para que nuestro servidor pueda ejectuarse
	//en el puerto x. En este caso, esta ejecutandose en el puerto 3000.
	console.log("Server running at 'http://localhost:3000'")
})