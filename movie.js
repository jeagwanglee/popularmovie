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
    let _id = movie.id;
    let _poster = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    let _title = movie.title;
    let _overview = movie.overview;
    let _rate = movie.vote_average;
    let _releaseDate = movie.release_date;

    const div = document.createElement('div');
    div.className = 'movie-card';
    div.id = _id;

    const poster = document.createElement('img');
    poster.src = _poster;

    const title = document.createElement('h3');
    title.innerText = _title;

    const overview = document.createElement('p');
    overview.innerText = _overview;

    const rate = document.createElement('p');
    rate.innerText = `평점 : ${_rate}`;

    const releaseDate = document.createElement('p');
    releaseDate.innerText = `개봉 : ${_releaseDate}`;

    $cardList.appendChild(div);
    const movieCard = document.getElementById(_id);

    movieCard.appendChild(poster);
    movieCard.appendChild(title);
    movieCard.appendChild(overview);
    movieCard.appendChild(rate);
    movieCard.appendChild(releaseDate);
    movieCard.addEventListener('click', function () {
      window.alert(`id : ${_id}`);
    });
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
