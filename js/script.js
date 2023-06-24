// VARIABLES
const botonbuscar = document.getElementById('buscar');
let resultado = document.getElementById('resultado');
let peliculadiv = '';
let peliculas = [];


// FUNCIÓN BÚSQUEDA DE PELÍCULAS
botonbuscar.addEventListener('click', event => {
    event.preventDefault();
    let pelicula = $('input').val();

    peliculas = [];
    resultado.innerHTML = '';

    fetch(`https://www.omdbapi.com/?s=${pelicula}&apikey=86775d51&`)
    .then(respuesta => respuesta.json())

    .then(json=>{
        console.log(json.Search);

        for (let i = 0; i < json.Search.length; i++){

            const peli = {
                id: json.Search[i].imdbID,
                title: json.Search[i].Title,
                year: json.Search[i].Year,
                poster: json.Search[i].Poster
                };

            peliculas.push(peli);

            peliculadiv += `<div class="col-sm-3 estilodepeliculas">
                                <div class="card">
                                    <img src="${json.Search[i].Poster}" class="card-img-top" alt="${json.Search[i].Title}" class='img-fluid'>
                                    <div class="card-body">
                                        <h3 class="card-title">${json.Search[i].Title}</h3>
                                        <p class="card-text">${json.Search[i].Year}</p>
                                        <button data-movie-id="${json.Search[i].imdbID}" class="btn btn-primary d-block favorito">Agregar</button>
                                    </div>
                                </div>
                            </div>`;
        }
        resultado.innerHTML = peliculadiv;

        const botonfavorito = document.querySelectorAll('.favorito');
        botonfavorito.forEach(button => {
            button.addEventListener('click', agregarFavorito);
        });
        
    })
    .catch(err=>{console.log(`Hubo un error: ${err}`)})
    .finally(final=>{
        console.log("Ejecutando finally");
        
    });
});



// FUNCIÓN AGREGAR A FAVORITOS
function agregarFavorito(event) {
    const peliculaId = event.target.dataset.movieId;
    const peliculaObj = peliculas.find(pelicula => pelicula.id === peliculaId);
    if (peliculaObj) {

        let peliculasFavoritas = localStorage.getItem('peliculasFavoritas');
        if (peliculasFavoritas) {
            peliculasFavoritas = JSON.parse(peliculasFavoritas);
        } else {
            peliculasFavoritas = []; 
        }


    const peliculaExistente = peliculasFavoritas.find(pelicula => pelicula.id === peliculaObj.id);
        if (!peliculaExistente) {
            peliculasFavoritas.push(peliculaObj);
            localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas)); 
            alert('Película agregada a favoritos');
        } else {
            alert('La película ya está en la lista de favoritos.');
        }
        } else {
            alert('No se encontró la película en la lista de resultados.');
        }
    }




// ESTADO DE CONEXIÓN
const status_element = document.getElementById('status');

window.addEventListener('offline', event => {
    status_element.innerHTML = 'Estas desconectado';
});

window.addEventListener('online', event => {
    status_element.innerHTML = 'Estas conectado';
});

if ( !navigator.onLine ){
    status_element.innerHTML = 'Sin conexion';
    console.log('Sin conexion');
}