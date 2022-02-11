(function(){
  const url = 'https://www.anapioficeandfire.com/api/books';

let ul = document.querySelector('ul');
ul.classList.add('books-display', 'flex', 'wrap');

let charactersUL = document.querySelector('.characters-list');

let modalWindow = document.querySelector('.modal');
let modalClose = document.querySelector('.modal-close');

function handleSpinner(rootElm, status = false) {
  if(status) {
    rootElm.innerHTML = `<div class="spinner"><div class="donut"></div></div>`;
  }
}

function displayCharacters(characters) {
  handleSpinner(charactersUL, true);
  Promise.all(characters.map(character => fetch(character).then(res => res.json())))
  .then((charactersData) => {
    charactersUL.innerHTML = '';
    charactersData.forEach(ch => {
      let li = document.createElement('li');
      li.classList.add('character');
      li.innerText = `${ch.name} : (${ch.aliases.join(' ')})`;
      charactersUL.append(li);
    })
  })
}

function createUI(books) {
  ul.innerHTML = '';
  books.forEach((book) => {
    let li = document.createElement('li');
    li.classList.add('book-list');
    let title = document.createElement('h2');
    title.innerText = book.name;
    let author = document.createElement('p');
    author.innerText = `Author: ${book.authors.join(' ')}`;
    let button = document.createElement('button');
    button.innerText = `Show Characters: ${book.characters.length}`;
    button.addEventListener('click',() => {
      modalWindow.style.display = 'block';
      displayCharacters(book.characters);
      modalWindow.querySelector('.modal-close').addEventListener('click', () => {
        modalWindow.style.display = 'none';
      });
    });
    li.append(title,author, button);
    ul.append(li);
  });
}

function fetchData() {
  handleSpinner(ul, true);
  fetch(url)
  .then((res) => res.json())
  .then((booksData) => {
    createUI(booksData);
  }).finally(() => {
    handleSpinner(ul);
  });
}

fetchData();
})();