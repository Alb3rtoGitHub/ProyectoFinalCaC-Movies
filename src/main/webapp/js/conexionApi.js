const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMDNkOWEyY2YzMWM4Njc0NGI3ZTc1YTgzMGI5YmVkMSIsInN1YiI6IjY2NTRhMDgzYmVmMDgxNzExNTA2YjBmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.y4NM_fEdsxO8udZHJh1Kc-w1L7ZuX4--_q0JLY1ENj4'
    }
};


function getPeliculas() {
    const respuesta = fetch(`https://api.themoviedb.org/3/movie/top_rated`, options);

    respuesta
    .then(response => response.json())
    .then(response => renderPeliculas(response))//fulfilled
    .catch(error => console.log(error))//rejected
}

function renderPeliculas(response) {
    console.log(response);
    const peliculas = response.results;
    let rows = '';
    for (let pelicula of peliculas) {
        rows += `
        <tr>
            <td>${pelicula.title}</td>
            <td>${pelicula.release_date}</td>
            <td>${pelicula.vote_average}</td>
            <td>
              <img src="https://www.themoviedb.org/t/p/w220_and_h330_face/${pelicula.poster_path}" alt="" class="img-fluid" width="150px">
            </td>
        </tr>
        `
    }
    let listaPeliculas = `
        <h1 class="text-center p-2 bg-info fs-3 mb-3 bg-dark text-white">Listado de Películas</h1>
    `
    let encabezado = `
            <tr>
                <th scope="col">Título</th>
                <th scope="col">Año</th>
                <th scope="col">Puntuación</th>
                <th>Imagen</th>
            </tr>
        `
    document.querySelector('#listaPeliculas').innerHTML = listaPeliculas;
    document.querySelector('#encabezado').innerHTML = encabezado;
    // document.getElementById("peliculas").innerHTML = rows;
    document.querySelector('#peliculas').innerHTML = rows;
}