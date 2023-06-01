const $cardList = document.querySelector('#cardList');
const $searchInput = document.querySelector('#searchInput');
const url = 'https://api.themoviedb.org/3/movie/popular?language=ko&page=1';

const options = {
  method: 'GET', // GET 방식으로 가져온다.
  headers: {
    accept: 'application/json', // JSON 형식으로 응답 받기
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjZTA1NGIwNTlmNjAyODg0MzM4Y2RiZjJmYWIxNWE3MyIsInN1YiI6IjY0NzA4ZDkzNzI2ZmIxMDEyMzBiMWQ2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mqGeqA8R2YIHQ7ylB2GYYpyAVvSxuBWpFkIi1MQal3Y',
  },
};

fetch(url, options) //url과 options를 가지고 데이터를 받아온다.
  .then((response) => response.json())
  .then((response) => {
    const movies = response.results; // movies에 데이터 중 영화 객체 배열을 할당
    createMovieCards(movies);
  })
  .catch((err) => console.error(err));

function createMovieCards(movies) {
  movies.forEach((movie) => {
    // destructuring 구조 분해를 이용하여 변수에 영화 객체에서 필요한 값들을 할당
    const { id, poster_path, title, overview, vote_average, release_date } = movie;
    const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`; // base url + url size + poster_path

    const movieCard = document.createElement('div'); // 무비카드 생성
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
      // 무비카드를 클릭하면 id값을 알려주게 이벤트핸들러를 추가
      window.alert(`id: ${id}`);
    });

    $cardList.appendChild(movieCard); // 카드리스트 아래에 무비카드를 추가
  });
}

function searchMovie(input) {
  // 입력값을 인자로 영화를 검색하는 함수
  $cardList.innerText = ''; // 카드리스트를 비움
  fetch(url, options)
    .then((response) => response.json())
    .then((response) => {
      const movies = response.results;
      // 입력받은 문자열을 포함하는지 검사, 대소문자 구분 없이 하기 위해 includes()에서 match()로 변경
      const filteredMovies = movies.filter((movie) => movie.title.match(new RegExp(input, 'i')));
      createMovieCards(filteredMovies); // 제목에 문자열을 포함한 카드 생성
    })
    .catch((err) => console.error(err));
}

document.querySelector('.search').addEventListener('submit', (event) => {
  event.preventDefault(); // form 제출을 막아서 새로고침을 막음
  const inputValue = $searchInput.value;
  searchMovie(inputValue); // 입력된 문자열로 영화 검색
});

document.getElementById('mainTitle').addEventListener('click', () => {
  // 헤더를 클릭하면 페이지가 새로고침되게 이벤트핸들러 추가
  location.reload();
});
