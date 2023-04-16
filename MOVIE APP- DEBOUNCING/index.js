let apiKey = "00b0ed673bf56a49f6fbcbe41d14f744";
let parentNode = document.getElementById("movies");
let movieCard = document.getElementById("movies-card");

async function getData() {
    try {
        let movie = document.getElementById("query").value;

        let response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}&page=1&original_language=en-US`);

        let data = await response.json();

        return data.results;

    } catch (error) {
        console.log(error);
    }
}

function displayData(data) {
    parentNode.innerHTML = "";
    // console.log(data);
    data.forEach((movie) => {
        let p = document.createElement("p");
        p.textContent = movie.original_title;
        parentNode.append(p);

        p.addEventListener("click", function () {
            displayMovie(movie)
            parentNode.style.display = "none";
        })

        let card = document.createElement("div");
        card.setAttribute("id", "card");


    });
}

function displayMovie(movie) {
    document.getElementById("movie-details").innerHTML = "";

    let card = document.createElement("div");
    card.setAttribute("id", "movieCard")

    let image = document.createElement("img");
    image.src = "https://file.kreditings.com/uploads/preview/action-movie-poster-editing-new-background-hd-11658222346u3kueikgdb.jpg";

    let title = document.createElement("h3");
    title.innerHTML = movie.original_title;

    let release = document.createElement("p");
    release.innerHTML = "Release Date :- " + movie.release_date;

    let rating = document.createElement("p");
    rating.innerHTML = "IMDB Rating :- " + movie.vote_average;

    card.append(image, title, release, rating);
    document.getElementById("movie-details").append(card)



}

async function main() {
    let data = await getData();

    if (!data) {
        alert("movie not found!")
    }
    parentNode.style.display = "block"
    displayData(data);
}

let timerId;
function debounce(func, delay) {
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(function () {
        func();
    }, delay);
}

document.querySelector("body").addEventListener("click", ()=> {
    parentNode.style.display = "none";
})