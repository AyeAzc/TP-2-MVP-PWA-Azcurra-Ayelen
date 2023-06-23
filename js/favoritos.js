// VARIABLES
let peliculasfav = document.getElementById('peliculasfav');
let favoritasdiv = '';

// FUNCIÓN MOSTRAR FAVORITOS
function mostrarFavoritos() {
    let peliculasFavoritas = localStorage.getItem('peliculasFavoritas');

    if (peliculasFavoritas) {
        peliculasFavoritas = JSON.parse(peliculasFavoritas);
        favoritasdiv = '';

        for (let i = 0; i < peliculasFavoritas.length; i++) {
            favoritasdiv += `<div class="col-sm-3 estilodepeliculas">
                                <div class="card">
                                    <img src="${peliculasFavoritas[i].poster}" class="card-img-top" alt="${peliculasFavoritas[i].title}" class='img-fluid'>
                                    <div class="card-body">
                                        <h3 class="card-title">${peliculasFavoritas[i].title}</h3>
                                        <p class="card-text">${peliculasFavoritas[i].year}</p>
                                        <button data-movie-id="${peliculasFavoritas[i].id}" class="btn btn-primary d-block quitar">Quitar</button>
                                    </div>
                                </div>
                            </div>`;
            }

        peliculasfav.innerHTML = favoritasdiv;

        const botonQuitar = document.querySelectorAll('.quitar');
        botonQuitar.forEach(button => {
            button.addEventListener('click', quitarFavorito);
        });

        console.log(peliculasFavoritas);
    } else {
        alert('No tenés pelis favoritas todavía. Guardá alguna.');
    }
}

// FUNCIÓN ELIMINAR FAVORITO
function quitarFavorito(event) {
    const peliculaId = event.target.dataset.movieId;
    let peliculasFavoritas = localStorage.getItem('peliculasFavoritas');

    if (peliculasFavoritas) {
        peliculasFavoritas = JSON.parse(peliculasFavoritas);

        const peliculaIndex = peliculasFavoritas.findIndex(pelicula => pelicula.id === peliculaId);
        if (peliculaIndex !== -1) {
        peliculasFavoritas.splice(peliculaIndex, 1);
        localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));
        console.log('Película eliminada de favoritos:', peliculaId);
        mostrarFavoritos();
        } else {
            console.log('La película no se encontró en la lista de favoritos.');
        }
    }
}

mostrarFavoritos();