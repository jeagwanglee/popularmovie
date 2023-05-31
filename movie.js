const $cardList = document.querySelector('#cardList');
const $searchInput = document.querySelector('#searchInput');
const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTA1NGIwNTlmNjAyODg0MzM4Y2RiZjJmYWIxNWE3MyIsInN1YiI6IjY0NzA4ZDkzNzI2ZmIxMDEyMzBiMWQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mqGeqA8R2YIHQ7ylB2GYYpyAVvSxuBWpFkIi1MQal3Y',
  },
};

fetch(url, options)
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results;
    createCard(movies);
  })
  .catch((err) => console.error(err));

function createCard(movies) {
  movies.forEach((movie) => {
    const { id, poster_path, title, overview, vote_average, release_date } = movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.id = id;
    movieCard.innerHTML = `
          <img src="${posterUrl}">
          <h3>${title}</h3>
          <p>${overview}</p>
          <p>평점: ${vote_average}</p>
          <p>개봉: ${release_date}</p>
        `;

    movieCard.addEventListener('click', () => {
      window.alert(`id: ${id}`);
    });

    $cardList.appendChild(movieCard);
  });
}

function searchMovie(input) {
  $cardList.innerText = '';
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results;
      const filteredMovies = movies.filter((movie) => movie.title.match(new RegExp(input, 'i')));
      createCard(filteredMovies);
    })
    .catch((err) => console.error(err));
}

document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault();
  const inputValue = $searchInput.value;
  searchMovie(inputValue);
});

document.getElementById('mainTitle').addEventListener('click', () => {
  location.reload();
});
