// Api key
const API_KEY = "api_key=367b896c5cf233db12108d61ab9bed3c";

// Base url
const BASE_URL = "https://api.themoviedb.org/3";

// Api url
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;

// img url
const IMG_URL = "https://image.tmdb.org/t/p/w500";

const searchURL = BASE_URL + `/search/movie?` + API_KEY;

const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const main = document.getElementById("card_main");

const form = document.getElementById("form");

const search = document.getElementById("search");

const searchBtn = document.getElementById("searchBtn");

const errorCode = "Image Unavailabe";

const tagsE1 = document.getElementById("tags");

var selectedGenre = [];

setGenre();
function setGenre() {

  const halfGenres = Math.ceil(genres.length / 2); // calculate half the number of genres
  const slicedGenres = genres.slice(0, halfGenres); // slice the first half of genres

  tagsE1.innerHTML = "";
  slicedGenres.forEach((genre) => {
    const t = document.createElement("div");
    t.classList.add("select");
    t.id = genre.id;
    t.innerText = genre.name;
    t.addEventListener("click", () => {
      if (selectedGenre.length == 0) {
        selectedGenre.push(genre.id);
      } else {
        if (selectedGenre.includes(genre.id)) {
          selectedGenre.forEach((id, idx) => {
            if ((id = genre.id)) {
              selectedGenre.splice(idx, 1);
            }
          });
        } else {
          selectedGenre.push(genre.id);
        }
      }
      console.log(selectedGenre);
      getMovies(API_URL + "&with_genres=" + encodeURI(selectedGenre.join(",")));
    });
    t.addEventListener("click", () => {
      // remove the .active class from the previously selected genre
      const activeTag = document.querySelector(".select.active");
      if (activeTag !== null) {
        activeTag.classList.remove("active");
      }
      // add the .active class to the clicked genre
      t.classList.add("active");
    
      // rest of the code
    });
    tagsE1.append(t);
  });
}

getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
     if(data.results.length!==0){
      showMovies(data.results);
     }
     else{
      main.innerHTML=`<h1 class="error_msg">No Results Found</h1>`
     }
    });
}
function showMovies(data) {
  card_main.innerHTML = "";

  data.forEach(movie => {
    const { title, poster_path, vote_average, release_date } = movie;
    const movieE1 = document.createElement("div");
    movieE1.classList.add("card");
    movieE1.innerHTML = `<div class="card-img">
    <img src="${poster_path? IMG_URL + poster_path: "https://i.ibb.co/749SwPS/error-image.webp"}" alt='${errorCode}'>
</div>
<div class="card-body">
    <div class="rating ">
        <p>${vote_average}</p>
    </div>
    <div class=title-wrap>
        <h4>${title}</h4>
        <p>${release_date}</p>
    </div>
</div>`;
    card_main.appendChild(movieE1);
  });
}

// function getColor(vote) {
//   if (vote >= 8) {
//     return "green";
//   } else if (vote >= 5) {
//     return "orange";
//   } else {
//     return "red";
//   }
// }

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  selectedGenre=[];
  setGenre()

  if (searchTerm) {
    getMovies(searchURL + "&query=" + searchTerm);
  }
});

// menu bar
const target = document.getElementById("mySidebar");
function openNav() {
  target.style.width = "60%";
  document.body.style.overflow = "hidden";
}

function closeNav() {
  target.style.width = "0";
  target.style.display = "hidden";
  document.body.style.overflow = "auto";
}
