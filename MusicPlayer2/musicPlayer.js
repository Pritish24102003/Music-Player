import { Data } from "./array/Array.js";

let genreSelect = document.getElementById("genreSelect");
let createInput = document.getElementById("createInput");
let createAlbumbtn = document.getElementById("createPlaylistbtn");
let showPlaylist = document.getElementById("allPlaylistContainer");
let audio = document.getElementById("audio");
let image = document.getElementById("screenImg");
let singerName = document.getElementById("singerName");
let songName = document.getElementById('songName');
let nextBtn = document.getElementById('forwardButton');
let backButton = document.getElementById('backButton');
let addPlaylistContainer = document.getElementById('addSongFromTheCurrent');
let addPlayListBtn = document.getElementById('addPlaylist');
let togglecheck = document.getElementById('toggleCheck');
let currentSong = 0;

// play songs
function playSongs(songUrl, imageUrl, songNameUrl, singerNameUrl){
    audio.src = songUrl; 
    image.src = imageUrl;
    songName.textContent = songNameUrl;
    singerName.textContent= singerNameUrl; 
    audio.play()

    currentSong = Data.findIndex(song=> song.songName===songNameUrl)
}

// forward song
function nextSong(){
    currentSong = (currentSong+1+Data.length)%Data.length;
    let nextSongPlay = Data[currentSong]
    playSongs(nextSongPlay.song,nextSongPlay.image,nextSongPlay.songName,nextSongPlay.singerName);
}

// previous Song
function previousSong(){
    currentSong = (currentSong-1+Data.length)%Data.length;
    let prevSongPlay = Data[currentSong]
    playSongs(prevSongPlay.song,prevSongPlay.image,prevSongPlay.songName,prevSongPlay.singerName)
}


// Filter the song
function handleFilter(){
    let songContainer = document.getElementById("songshowslist");
    let selectedGenre = genreSelect.value;

    const filteredSongs = selectedGenre === "all"? Data: Data.filter(song=> song.genre === selectedGenre);
    songContainer.innerHTML = ""
    filteredSongs.forEach((song)=>{
        let button = document.createElement('button');
        button.setAttribute("class","songList");
        button.setAttribute('onclick', `playSongs('${song.song}', '${song.image}', '${song.songName}', '${song.singerName}')`);

        button.innerHTML = song.songName;
        button.addEventListener('click', function(){
            playSongs(song.song, song.image, song.songName,song.singerName)
        })
        songContainer.appendChild(button);
    })
}

// create Playlist Album
// create Playlist Album
function createPlayAlbum() {
    let text = createInput.value.trim();
    if (text === "") {
        alert("input field cannot be empty");
    } else {
        const playListExists = document.querySelector(`#allPlaylistContainer .songplaylist[data-playlist="${text}"]`);
        if (!playListExists) {
            let button = document.createElement('button');
            button.setAttribute('class', 'songplaylist');
            button.setAttribute('data-playlist', text);
            button.setAttribute('onclick', `displayPlaylist('${text}')`);
            button.innerHTML = text;
            showPlaylist.appendChild(button);
            button.addEventListener('click', function () {
                displayPlaylist(text); // Corrected this line
            });
            Data.forEach(song => {
                if (song.playlist) {
                    song.playlist.push(text);
                } else {
                    song.playlist = [text];
                }
                console.log(song.playlist);
            });
        } else {
            alert('playlist already exists');
        }
    }
    createInput.value = "";
}



// display the playlist song
function displayPlaylist(playlistName){
    let songContainer = document.getElementById('songshowslist');
    songContainer.innerHTML = "";

    const playlistSongs = Data.filter(song => song.playlist && song.playlist.includes(playlistName));
    playlistSongs.forEach(song => {
        let button = document.createElement('button');
        button.setAttribute("class", "songList");
        button.setAttribute('onclick', `playSongs('${song.song}', '${song.image}', '${song.songName}', '${song.singerName}')`);

        button.innerHTML = song.songName;
        button.addEventListener('click', function () {
            playSongs(song.song, song.image, song.songName, song.singerName);
        });
        songContainer.appendChild(button);
    });
}

// Add playlist functionality
// function addPlayList() {
//     let currentPlaySong = Data[currentSong];

//     // Check if the song is already in the playlist
//     let playlistButtons = document.querySelectorAll('.songplaylist');
//     for (let button of playlistButtons) {
//         if (button.innerHTML === currentPlaySong.songName) {
//             alert("Song is already in the playlist");
//             return;
//         }
//     }

//     // If the song is not in the playlist, add it
//     let button = document.createElement('button');
//     button.setAttribute('class', 'songplaylist');
//     button.setAttribute('onclick', `playSongs('${Data[currentSong].song}','${Data[currentSong].image}','${Data[currentSong].songName}','${Data[currentSong].singerName}')`)
//     button.innerHTML = currentPlaySong.songName;
//     button.addEventListener('click', function(){
//         playSongs(currentPlaySong.song, currentPlaySong.image, currentPlaySong.songName, currentPlaySong.singerName)
//     })
//     addPlaylistContainer.appendChild(button);
// }

// Add playlist functionality
function addPlayList() {
    let currentPlaySong = Data[currentSong];

    // Check if the song is already in the playlist
    let playlistButtons = document.querySelectorAll('.songplaylist');
    for (let button of playlistButtons) {
        if (button.innerHTML === currentPlaySong.songName) {
            alert("Song is already in the playlist");
            return;
        }
    }

    // If the song is not in the playlist, add it
    let button = document.createElement('button');
    button.setAttribute('class', 'songplaylist');
    button.setAttribute('data-playlist', 'My Playlist'); // Default playlist for added songs
    button.setAttribute('onclick', `displayPlaylist('My Playlist')`);
    button.innerHTML = currentPlaySong.songName;
    button.addEventListener('click', function () {
        playSongs(currentPlaySong.song, currentPlaySong.image, currentPlaySong.songName, currentPlaySong.singerName);
    });
    addPlaylistContainer.appendChild(button);

    // Update the playlist property for the current song
    if (currentPlaySong.playlist) {
        currentPlaySong.playlist.push();
    } else {
        currentPlaySong.p = [];
    }
}


// search a song
let search = document.getElementById('searchBar');
function searchSong(e){
    let songContainer = document.getElementById("songshowslist");
    if(e.key === 'Enter'){
        songContainer.innerHTML = "";
        let searchItem = search.value? Data.filter((item)=> item.songName.toLocaleLowerCase() === search.value): Data;
        searchItem.forEach((song)=>{
        let button = document.createElement('button');
        button.setAttribute("class","songList");
        button.setAttribute('onclick', `playSongs('${song.song}', '${song.image}', '${song.songName}', '${song.singerName}')`);

        button.innerHTML = song.songName;
        button.addEventListener('click', function(){
            playSongs(song.song, song.image, song.songName,song.singerName)
        })
        songContainer.appendChild(button);
    })

    }

}

function searchSongInput(){
    let songContainer = document.getElementById("songshowslist");
    if(search.value){
        songContainer.innerHTML = "";
        let searchItem = search.value? Data.filter((item)=> item.songName === search.value):Data;
        searchItem.forEach((song)=>{
        let button = document.createElement('button');
        button.setAttribute("class","songList");
        button.setAttribute('onclick', `playSongs('${song.song}', '${song.image}', '${song.songName}', '${song.singerName}')`);

        button.innerHTML = song.songName;
        button.addEventListener('click', function(){
            playSongs(song.song, song.image, song.songName,song.singerName)
        })
        songContainer.appendChild(button);
    })

    }

}


// toggle functionality
function toggleManu(){
    let mainBody = document.getElementsByTagName('body')[0];
    let navBar = document.getElementById('nav-bar');
    let section = document.getElementById('allSongsSection');
    let sectionSongCard = document.getElementById('songcard');
    let playListSection = document.getElementById('playListContainer');
    let screen = document.getElementById('screen');
    let buttonAllSong = document.getElementsByTagName('button');
    let createButton = document.getElementById('createPlaylistbtn');
    if(togglecheck.checked){
        mainBody.style.backgroundColor = "#565657";
        mainBody.style.color = "white";
        navBar.style.background = "#00c4ff8a";
        section.style.background = "#263238";
        sectionSongCard.style.background = "#263238";
        sectionSongCard.style.boxShadow = "-3px -3px #6d6e6f";
        playListSection.style.background = "#263238";
        playListSection.style.boxShadow = "-3px -3px #6d6e6f";
        screen.style.background = "#565657";
        screen.style.boxShadow = "-3px -3px #6d6e6f";
        for(let i=0; i<buttonAllSong.length; i++){
            buttonAllSong[i].style.background = "#565657"
        }
        createButton.style.background = ""
    }else{
        mainBody.style.background = 'white';
        mainBody.style.color = "";
        navBar.style.background = "";
        section.style.background = "";
        sectionSongCard.style.background = "";
        sectionSongCard.style.boxShadow = "";
        playListSection.style.background = "";
        playListSection.style.boxShadow = "";
        screen.style.background = "";
        screen.style.boxShadow = "";
        for(let i=0; i<buttonAllSong.length; i++){
            buttonAllSong[i].style.background = ""
        }
    }
}

genreSelect.addEventListener('change', handleFilter);
createAlbumbtn.addEventListener('click', createPlayAlbum);
nextBtn.addEventListener('click', nextSong);
backButton.addEventListener('click', previousSong);
addPlayListBtn.addEventListener('click',addPlayList )
togglecheck.addEventListener('change', toggleManu);
addEventListener('keydown', searchSong);
search.addEventListener('input', searchSongInput);
handleFilter()
searchSong()
searchSongInput()

