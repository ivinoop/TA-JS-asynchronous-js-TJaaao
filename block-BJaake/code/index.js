const category = document.querySelector('#category');
let newsList = document.querySelector('.news-list');

let data = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
.then((resolve) => resolve.json())
.then((info) => info.forEach((data) => createUI(data)));

function handleChange(event) {
  document.querySelector('.news-list').innerHTML = '';
  let url = fetch('https://api.spaceflightnewsapi.net/v3/articles?_limit=30')
  .then((resolve) => resolve.json())
  .then((info) => {
    info.forEach((data) => {
      if(data.newsSite == event.target.value) {
        createUI(data);
      }
    })
  })
}

function createUI(info) {
  let newsBox = document.createElement('li');
  let textBox = document.querySelector('div');
  let newsImage = document.createElement('img');
  let newsSite = document.createElement('span');
  let newsHeading = document.createElement('h3');
  let newsSummary = document.createElement('p');
  let readBtn = document.createElement('a');

  newsBox.setAttribute('class', 'news-box flex jcc aic')
  textBox.setAttribute('class', 'flex aifs column')
  newsImage.src = info.imageUrl;
  newsSite.innerText = info.newsSite;
  newsHeading.innerText = info.title;
  newsSummary.innerText = info.summary;
  readBtn.innerText = 'Read More'
  readBtn.href = info.url;
  readBtn.target = "_blank";

  // newsBox.append(newsImage);
  textBox.append(newsSite, newsHeading, newsSummary, readBtn);
  newsBox.append(newsImage ,textBox);
  newsList.append(newsBox, textBox);

}

category.addEventListener('change', handleChange);