// Configuración
const API_KEY = 'AIzaSyBwuRYm0dWpM66LqiZapdMEUPDQ3nXVnnM';
const cantidad = 8; 
let trailersdiv = '';


function trailersPopulares() {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${cantidad}&q=trailer&type=video&videoCategoryId=44&key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
        const trailers = data.items;
        mostrarTrailers(trailers);
    })
    .catch(error => {
        alert('Error: no hay trailers populares, todos son aburridos', error);
    });
}

function mostrarTrailers(trailers) {
    const contenedorTrailers = document.getElementById('contenedor-trailers');
    let trailersdiv = '';

    trailers.forEach(trailer => {
        const videoId = trailer.id.videoId;
        const titulo = trailer.snippet.title;

        const iframe = document.createElement('iframe');
        iframe.src = `https://www.youtube.com/embed/${videoId}`;
        iframe.title = titulo;
        iframe.allowFullscreen = true;

        trailersdiv += `
            <div class="col-sm-3 estilodepeliculas">
                <div class="card">
                    <div class="card-body">
                        <h3 class="card-title">${titulo}</h3>
                    </div>
                    ${iframe.outerHTML}
                </div>
            </div>
        `;
    });

    contenedorTrailers.innerHTML = trailersdiv;
}

trailersPopulares();
