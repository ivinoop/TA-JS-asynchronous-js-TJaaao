let ul = document.querySelector('ul');
ul.classList.add('books-display', 'flex', 'wrap');
const url = 'https://www.anapioficeandfire.com/api/books';


function createUI(books) {
  ul.innerHTML = '';
  books.forEach((book) => {
    let li = document.createElement('li');
    let title = document.createElement('h2');
    title.innerText = book.name;
    let author = document.createElement('p');
    author.innerText = book.authors.join(' ');
    let button = document.createElement('button');
    button.innerText = `Show Characters: ${book.characters.length}`;
    
    li.append(title,author,button);
    ul.append(li);
  });
}

function fetchData() {
  fetch(url)
  .then(res => res.json())
  .then((booksData) => createUI(booksData));
}

fetchData();