let input = document.querySelector('input');
let searchButton = document.querySelector('button');
let displayImages = document.querySelector('.display-images');

const url = 'https://api.unsplash.com/photos/?client_id=TUe9u2c1QPZ2zpbKVv7z7AHI-UoADAy8jJ2aFNSshWU';

// const url = 'https://picsum.photos/v2/list?page=2&limit=10';

const searchURL = (query) => {
  return `https://api.unsplash.com/search/photos/?query=${query}&client_id=TUe9u2c1QPZ2zpbKVv7z7AHI-UoADAy8jJ2aFNSshWU`;
};
  

function fetch(url, successHandler) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    successHandler(JSON.parse(xhr.response));
  };
  xhr.onerror = function() {
    console.error('Something is wrong 🙁');
  };
  xhr.send();
}

function displayImg(images) {
  displayImages.innerHTML = "";
  images.forEach((image) => {
    let img = document.createElement('img');
    img.src = image.urls.small;
    displayImages.append(img);
  });
}

fetch(url, displayImg);


function handleSearch(event) {
  if(event.keyCode === 13 && input.value) {
    fetch(searchURL(input.value), (searchResults) => {
      displayImg(searchResults.results);
    });
    input.value = '';
  }
}

input.addEventListener('keyup', handleSearch);