let userAvatar = document.querySelector('.user');
let userURL = document.querySelector('.user-url')
let githubName = document.querySelector('h2');
let username = document.querySelector('a');
let followers = document.querySelector('.followers');
let following = document.querySelector('.following');
let input = document.querySelector('input');
let catButton = document.querySelector('button');
let catImg = document.querySelector('.cat-img');

function createUI(data) {
  userAvatar.src = data.avatar_url;
  githubName.innerText = data.name;
  username.innerText = `@${data.login}`;
  userURL.href = data.html_url;
}

function handleEnter(event) {
  if(event.keyCode === 13 && input.value) {
    let user = event.target.value;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.github.com/users/${user}`);
    xhr.onload = function() {
      let userData = JSON.parse(xhr.response);
      createUI(userData);
    };
    xhr.onerror = function() {
      console.log('Something went wrong 🙁');
    };
    xhr.send();
    event.target.value = "";
    
    let userFollowers = new XMLHttpRequest();
    
    userFollowers.open('GET', `https://api.github.com/users/${user}/followers`);
    userFollowers.onload = function() {
      let followersData = JSON.parse(userFollowers.response);
      followersData.forEach((ele, index) => {
        if(index <= 5) {
          let followerAvatar = document.createElement('img');
          // followerAvatar.classList.add('follower-avatar');
          followerAvatar.src = ele.avatar_url;
          followerAvatar.href = ele.url;
          let followersList = document.createElement('li');
          followersList.append(followerAvatar);
          followers.append(followersList);
        }
      });
      userFollowers.send();
    }  
  }
}


input.addEventListener('keyup', handleEnter);

// https://api.thecatapi.com/v1/images/search?limit=1&size=full

// Get New Cat

catButton.addEventListener('click', () => {
  let cat = new XMLHttpRequest();
  cat.open('GET', 'https://api.thecatapi.com/v1/images/search?limit=1&size=full');

  cat.onload = function() {
    let catData = JSON.parse(cat.response);
    catImg.src = catData[0].url;
  }
  cat.send();
});