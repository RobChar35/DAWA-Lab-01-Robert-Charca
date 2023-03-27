var http = require('http')

var fs = require('fs')

function readFile(filePath, response){ 
	fs.readFile(filePath, function (error, html) {
		//La funcion "readFile" tiene el metodo "readFile" para leer los archivos html de la pagina.
		//Dentro de dicho metodo, podemos controlar (infimamente) el error que apareceria si no 
		//existe la pagina. Esto tambien ocurre en caso de que todo funcionara correctamente. 
		if (error) {
			response.statusCode = 404
			response.setHeader('Content-Type', 'text/html')
			response.end('No se encontro el archivo')
		} else {
			response.write(html)
			response.end()
		}
	}) 
}

http.createServer(function (request, response) {
	response.statusCode = 200 //Se establece nuestra respuesta con el codigo 200.
	response.setHeader('Content-Type', 'text/html') //Se estable el header como html.

	var url = request.url

	//Estas condicionales sirven como el "manejador" de rutas de la pagina. 
	//Si bien no es la forma mas optima de administrarlas, es un primer paso y nos sirve 
	//para ver como son las bases de una aplicacion con node.js sin ningun tipo de frameworks o librerias.
	if (url === '/servicios') {
		//La funcion "readFile" se encarga de todo lo relacionado a lo que se muestre en la pagina.
		readFile('./views/pages/servicios.html', response)  
	} else if (url === '/galeria') {
		readFile('./views/pages/galeria.html', response)
	} else if (url === '/sobrenosotros') {
		readFile('./views/pages/nosotros.html', response)
	} else if (url === '/nuestrahistoria') {
		readFile('./views/pages/historia.html', response)
	} else if (url === '/testimonios') {
		readFile('./views/pages/testimonio.html', response)
	} else if (url === '/contactenos') {
		readFile('./views/pages/contacto.html', response)
	} else {
		readFile('./views/index.html', response)
	}

}).listen(3000, function () {
	//El metodo "listen" nos sirve para que nuestro servidor pueda ejectuarse
	//en el puerto x. En este caso, esta ejecutandose en el puerto 3000.
	console.log("Server running at 'http://localhost:3000'")
})