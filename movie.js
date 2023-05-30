const $cardList = document.querySelector('#cardList');

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTA1NGIwNTlmNjAyODg0MzM4Y2RiZjJmYWIxNWE3MyIsInN1YiI6IjY0NzA4ZDkzNzI2ZmIxMDEyMzBiMWQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mqGeqA8R2YIHQ7ylB2GYYpyAVvSxuBWpFkIi1MQal3Y',
  },
};

fetch('https://api.themoviedb.org/3/movie/popular?language=ko&page=1', options)
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results;
    movies.forEach((e) => {
      let _id = e.id;
      let _poster = 'https://image.tmdb.org/t/p/w500' + e.poster_path;
      let _title = e.title;
      let _overview = e.overview;
      let _rate = e.vote_average;
      let _releaseDate = e.release_date;
      console.log(_releaseDate);
      createCard(_id, _poster, _title, _overview, _rate, _releaseDate);
    });
  })
  .catch((err) => console.error(err));

function createCard(_id, _poster, _title, _overview, _rate, _releaseDate) {
  const div = document.createElement('div');
  $cardList.appendChild(div);
  div.className = 'movie-card';
  div.id = _id;
  const movieCard = document.getElementById(_id);

  const poster = document.createElement('img');
  const title = document.createElement('h3');
  const overview = document.createElement('p');
  const rate = document.createElement('p');
  const releaseDate = document.createElement('p');
  poster.src = _poster;
  title.innerText = _title;
  overview.innerText = _overview;
  rate.innerText = `평점 : ${_rate}`;
  releaseDate.innerText = `개봉 : ${_releaseDate}`;

  movieCard.appendChild(poster);
  movieCard.appendChild(title);
  movieCard.appendChild(overview);
  movieCard.appendChild(rate);
  movieCard.appendChild(releaseDate);
}
