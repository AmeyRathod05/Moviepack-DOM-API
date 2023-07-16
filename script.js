const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=56257490a43398efd2e25e4aa628ac4c&page=1'

const IMG_PATH = 'https://image.tmdb.org/t/p/w500https://image.tmdb.org/t/p/w1280'

const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=56257490a43398efd2e25e4aa628ac4c&query="'

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');



// Get initial movies

getMovies(API_URL)

async function getMovies(url){
    const res = await fetch(url);
    const data = await res.json();

    // console.log(data.results); 
    showMovies(data.results);
}

// rendering data into the DOM
function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie)=>{
        // destructuring / pulling values out of movie object
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByRate(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            <h3>Overview</h3>
            <p>${overview}</p>
        </div>
        `
        main.appendChild(movieElement);

    })
}

// color of rating 
function getClassByRate(vote){
    if(vote >= 8){
        return 'green';
    }
    else if(vote >=5){
        return 'orange';
    }else{
        return 'red';
    }
}

// search 
form.addEventListener('submit',(e) => {
    e.preventDefault()

    const searchTerm = search.value;

    if(searchTerm && searchTerm != ''){
     
        getMovies(SEARCH_API + searchTerm)
        search.value = '';
    
    }else {
        window.location.reload()
    }
})
