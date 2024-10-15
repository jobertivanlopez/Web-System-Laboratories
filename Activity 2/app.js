// Select elements from the DOM
const addButton = document.getElementById('add-button');
const songTitleInput = document.getElementById('song-title');
const artistNameInput = document.getElementById('artist-name');
const playlist = document.querySelector('.playlist');
const searchInput = document.querySelector('.search-bar');

// Function to add a new song
const addSong = () => {
    const songTitle = songTitleInput.value.trim();
    const artistName = artistNameInput.value.trim();
    
    if (songTitle && artistName) {
        // Create the song div
        const songDiv = document.createElement('div');
        songDiv.classList.add('song');
        
        // Add song details
        songDiv.innerHTML = `
            <div>
                <span class="song-title">${songTitle}</span>
                <span class="artist-name">${artistName}</span>
            </div>
            <button>Delete</button>
        `;
        
        // Append the song to the playlist
        playlist.appendChild(songDiv);
        
        // Create and append a horizontal rule
        const hr = document.createElement('hr');
        hr.classList.add('separator');
        playlist.appendChild(hr);

        // Clear input fields
        songTitleInput.value = '';
        artistNameInput.value = '';
        
        // Add delete functionality to the new song's button
        const deleteButton = songDiv.querySelector('button');
        deleteButton.addEventListener('click', () => {
            songDiv.remove();
            hr.remove(); // Remove the associated <hr> as well
        });
    }
};

// Function to filter songs based on search query
const filterSongs = () => {
    const query = searchInput.value.toLowerCase();
    const songs = playlist.querySelectorAll('.song');
    
    songs.forEach(song => {
        const title = song.querySelector('.song-title').textContent.toLowerCase();
        const artist = song.querySelector('.artist-name').textContent.toLowerCase();
        song.style.display = (title.includes(query) || artist.includes(query)) ? '' : 'none';
        
        // Also hide the corresponding hr when hiding the song
        const hr = song.nextElementSibling;
        if (hr && hr.classList.contains('separator')) {
            hr.style.display = song.style.display;
        }
    });
};

// Add event listeners
addButton.addEventListener('click', addSong);
searchInput.addEventListener('input', filterSongs);

// Add delete functionality to existing songs
playlist.querySelectorAll('.song button').forEach(button => {
    button.addEventListener('click', (event) => {
        const songDiv = event.target.parentElement;
        const hr = songDiv.nextElementSibling;
        songDiv.remove();
        if (hr && hr.classList.contains('separator')) {
            hr.remove();
        }
    });
});
