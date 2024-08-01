// Función para cargar películas en el carrusel de películas Recomendadas
const cargarPeliculasRecomendadas = async () => {
    // Realizamos una petición fetch a la API para obtener las películas más Recomendadas
    const response = await fetch(`${API_URL}/movie/top_rated?language=en-US&page=1`, options);
    const data = await response.json();// Convertimos la respuesta a JSON
    const movies = data.results; // Extraemos las películas de la respuesta
    const recomendadasContainer = document.querySelector('#recomendadasContainer'); // Seleccionamos el contenedor de películas Recomendadas en el DOM

    // Iteramos sobre cada película obtenida para lograr la estructura de html que pongo a continuación:
    /*<div class="peliculaItem">
         <img class="imgRecomendada" src="./assets/img/aclamada_1.jpg" alt="aclamada_1" loading="lazy">
      </div>*/
    movies.forEach(movie => {
        // creo el div peliculaItem
        const peliculaItem = document.createElement('div');
        peliculaItem.classList.add('peliculaItem');
        // creo la imagen
        const img = document.createElement('img');
        img.classList.add('imgRecomendada');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;
        img.loading = 'lazy';
        // relaciono los elementos
        peliculaItem.appendChild(img);
        recomendadasContainer.appendChild(peliculaItem);
    });
};

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDNkOWEyY2YzMWM4Njc0NGI3ZTc1YTgzMGI5YmVkMSIsInN1YiI6IjY2NTRhMDgzYmVmMDgxNzExNTA2YjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y4NM_fEdsxO8udZHJh1Kc-w1L7ZuX4--_q0JLY1ENj4'
    }
};

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDNkOWEyY2YzMWM4Njc0NGI3ZTc1YTgzMGI5YmVkMSIsInN1YiI6IjY2NTRhMDgzYmVmMDgxNzExNTA2YjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y4NM_fEdsxO8udZHJh1Kc-w1L7ZuX4--_q0JLY1ENj4';
const API_URL = 'https://api.themoviedb.org/3';

let paginaActual = 1;

function llamarAPI(page) {
    fetch(`${API_URL}/movie/popular?page=${page}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => dibujarDatos(data));
}

function dibujarDatos(json) {
    const filas = json.results.map(obj => Pelicula(obj));
    document.querySelector('.peliculasTendencia .peliculas').innerHTML = filas.join('');
}

function Pelicula(obj) {
    return `
        <a href="./pages/detalle.html">
            <div class="pelicula">
                <img class="imgTendencia" src="https://image.tmdb.org/t/p/w500/${obj.poster_path}" alt="${obj.title}" loading="lazy">
                <div class="tituloPelicula">
                    <h4>${obj.title}</h4>
                </div>
            </div>
        </a>
    `;
}

// Función para cargar la pagina siguiente
function cargarPaginaSiguiente() {
    paginaActual++;
    llamarAPI(paginaActual);
}

// Función para cargar la pagina anterior
function cargarPaginaAnterior() {
    if (paginaActual > 1) {
        paginaActual--;
        llamarAPI(paginaActual);
    }
}

// Agregar los event listeners a los botones
document.querySelector('.anterior').addEventListener('click', cargarPaginaAnterior);
document.querySelector('.siguiente').addEventListener('click', cargarPaginaSiguiente);

// Llamar a la función para obtener y dibujar los datos iniciales
llamarAPI(paginaActual);
cargarPeliculasRecomendadas();


// ---------------------------NUEVO---------------------------------------------------

function buscarPelicula(busqueda){
    return fetch('/CaC-Movies/peliculas')
            .then(response => response.json())
            .then(peliculas => {
                return peliculas.filter(pelicula => 
                    pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase())
                );
            });
}

function realizarBusqueda(){  
    const terminoBusqueda = document.querySelector('.inputBuscador').value;
    if (terminoBusqueda != '') {
        buscarPelicula(terminoBusqueda)
                .then(resultados => {
                    mostrarResultadosEnModal(resultados);
                });
    } else {
        mostrarResultadosEnModal('');
    }
}

function mostrarResultadosEnModal(resultados){
    if (resultados.length === 0) {
        document.getElementById('resultadosModalBody').innerHTML = '<li class="list-group-item">No se encontraron resultados.</li>';
    } else {
        const modalContent = resultados.map(pelicula => peliculaResultado(pelicula)).join('');
        document.getElementById('resultadosModalBody').innerHTML = modalContent;
    }
    
    const resultadosModal = new bootstrap.Modal(document.getElementById('resultadosModal'));
    resultadosModal.show();
}

function peliculaResultado(pelicula) {
    return `
    <li class="list-group-item">
        <div class="d-flex">
            <img src="./assets/img/${pelicula.imagen}" class="img-fluid rounded" alt="${pelicula.titulo}" style="width: 100px; height: 150px; object-fit: cover;">
            <div class="ms-3">
                <h5 class="mb-1">${pelicula.titulo}</h5>
                <p class="mb-1">${pelicula.sinopsis}</p>
                <small class="text-muted">Lenguaje: ${pelicula.lenguaje}</small>
            </div>
        </div>
    </li>
    `;
}

// Agregar EventListener al botón de Busqueda
document.querySelector('.botonBuscador').addEventListener('click', realizarBusqueda);

// Agregar EventListener a tecla "Enter"
document.querySelector('.inputBuscador').addEventListener('keypress', function (e) {
    if(e.key === 'Enter'){
        e.preventDefault();
        realizarBusqueda();
    }
});

