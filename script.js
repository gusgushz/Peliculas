//Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//Function to fetch data from API
let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
    //if input field is empty
    if (movieName.length <= 0) {
        result.innerHTML = `<h3> class="msg">Por favor ingrese el nombre de una pelicula </h3>`;
    }
    //if input field is NOT empty
    else {
        fetch (url)
        .then ((res) => res.json())
        .then ((data) => {
            //if movie exists in database
            if (data.Response == "True") {
                result.innerHTML = `
                <div class="info">
                    <img src=${data.Poster} class="poster">
                    <div>
                        <h2>${data.Title}</h2>
                        <div class="rating">
                            <img src="star-icon.svg">
                            <h4>${data.imdbRating}</h4>
                        </div>
                        <div class="details">
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtume}</span>
                        </div>
                        <div class="genre">
                            <div>${data.Genre.split(",").join("</div><div>")}</div>
                        </div>
                    </div>
                </div>
                <div class="end">
                    <div class="plot">
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                    </div>
                    <div class="cast">
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    </div>
                </div>
                `;
            }
            //if movie does Not exists in database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        //if error occurs
        .catch (() => {
            result.innerHTML = `<h3 class="msg"> Error Occurred</h3>`;
        });
    }
};
searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);