const form = document.getElementById('form');
const moviesList =document.querySelector('.movies-list');
const input = document.getElementById('input');

const endpoint = 'https://api.themoviedb.org/3/';
const res = 'search/movie';
const apiKey = 'f24a0fd18f52218851075901c5a108a0';
const apiUrl = `${endpoint}${res}?api_key=${apiKey}`;

const fetchMovies = (searchQuery) => fetch(apiUrl + `&query=${searchQuery}`)
		.then(response => {
			if (response.ok) {
				return response.json();
			}

			throw new Error (
				'error while fetching: ' + response.statusText
			);
		})
		.then(data => data.results)
		.catch(error => console.log('error'))
  

const renderGalleryCards = (movieCards, parent) => {
	let htmlString = '';
	movieCards.forEach(movie => {
	let overview = movie.overview.slice(0,99);
	htmlString += `<div class="movie-list-item">
	<div class="movie-card">
	<span class="movie-card-rating">${movie.vote_average}</span>
	<img  class="movie-card-img" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="poster">
	<div class="movie-info"
	<h3 class="movie-info-title">${movie.title}</h3>
	<p class="movie-info-overview">${overview}...</p>
	<p class="movie-info-release_date">${movie.release_date}</p>
	</div>
	</div>
	</div>`;
	});
	parent.innerHTML= htmlString;
 }

/*results array (json)*/

const formatMovieData = (data) => 
	data.map(item => ({
        title: item.title,
        release_date: item.release_date,
        overview: item.overview.slice(0,99),
  		poster_path: item.poster_path,
        vote_average: item.vote_average
  })
);

/*form submit*/

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
    if (input.value !== '') {
    	fetchMovies(input.value)
    	.then(data => {
			const movies = formatMovieData(data);
			renderGalleryCards(movies, moviesList);
		});
		input.value = "";
    } else {
  		alert('Enter the name of the movie');
    }
});