let onEnterPress = (event) => {
    if (event.keyCode === 13) {
        search();
    }
};


let rockArtists = [
    "queen",
    "u2",
    "thepolice",
    "eagles",
    "thedoors",
    "oasis",
    "thewho",
    "bonjovi",
];

let popArtists = [
    "maroon5",
    "coldplay",
    "onerepublic",
    "jamesblunt",
    "katyperry",
    "arianagrande",
];

let hipHopArtists = [
    "eminem",
    "snoopdogg",
    "lilwayne",
    "drake",
    "kanyewest",
];

let search = () => {
    let div = document.querySelector("#searchResults .row");
    div.innerHTML = "";
    let searchQuery = document.querySelector("#searchField").value;

    if (searchQuery.length > 2) {
        document.querySelector("#searchResults").classList.remove("d-none");

        fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + searchQuery,
            {
                method: "GET",
                headers,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((artists) => {
                let songs = artists.data;

                for (let i = 0; i < songs.length; i++) {
                    div.innerHTML += albumCard(songs[i]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};

function albumCard(songInfo) {
    return `
      <div class="col text-center" id=${songInfo.id}>
        <a href="/album.html?id=${songInfo.album.id}">
          <img class="img-fluid" src=${songInfo.album.cover_medium} alt="img of ${songInfo.artist.name}">
        </a>
          <p> 
            <a href="/album.html?id=${songInfo.album.id}">
              Album: "${songInfo.album.title}"
            </a>
          <br>
            <a href="/artistPage.html?id=${songInfo.artist.id}">
              Artist: "${songInfo.artist.name}"
            </a>
          </p>
      </div>
    `;
}

let headers = new Headers({
    "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    "x-rapidapi-key": "4013e328ffmsh3feb54311ce7296p1c3cc4jsnd3ad09e0821d",
});

window.onload = function () {
    let rockRandomArtists = [];
    let popRandomArtists = [];
    let hipHopRandomArtists = [];

    while (rockRandomArtists.length < 4) {
        let artist =
            rockArtists[Math.floor(Math.random() * rockArtists.length)];

        if (!rockRandomArtists.includes(artist)) {
            rockRandomArtists.push(artist);
        }
    }

    while (popRandomArtists.length < 4) {
        let artist =
            popArtists[Math.floor(Math.random() * popArtists.length)];

        if (!popRandomArtists.includes(artist)) {
            popRandomArtists.push(artist);
        }
    }

    while (hipHopRandomArtists.length < 4) {
        let artist =
            hipHopArtists[Math.floor(Math.random() * hipHopArtists.length)];

        if (!hipHopRandomArtists.includes(artist)) {
            hipHopRandomArtists.push(artist);
        }
    }

    for (let j = 0; j < rockRandomArtists.length; j++) {
        fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
            rockRandomArtists[j],
            {
                method: "GET",
                headers,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((artists) => {
                let songInfo = artists.data;
                let div = document.querySelector("#rockSection");
                div.innerHTML += albumCard(songInfo[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    for (let j = 0; j < popRandomArtists.length; j++) {
        fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
            popRandomArtists[j],
            {
                method: "GET",
                headers,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((artists) => {
                let songInfo = artists.data;
                let div = document.querySelector("#popSection");
                div.innerHTML += albumCard(songInfo[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    for (let j = 0; j < hipHopRandomArtists.length; j++) {
        fetch(
            "https://deezerdevs-deezer.p.rapidapi.com/search?q=" +
            hipHopRandomArtists[j],
            {
                method: "GET",
                headers,
            }
        )
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then((artists) => {
                let songInfo = artists.data;
                let div = document.querySelector("#hipHopSection");
                div.innerHTML += albumCard(songInfo[0]);
            })
            .catch((error) => {
                console.log(error);
            });
    }
};