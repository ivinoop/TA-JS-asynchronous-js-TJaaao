// - Create four promises that resolve after 1, 2, 3 and 4 seconds with a random value. Using `Promise.all` log the value of each promise that it resolved with.

let randomValue = () => {
  return Math.floor(Math.random() * 100);
}

randomValue();

let one = new Promise((res, rej) => {
  setTimeout(res(randomValue()), 1000);
});

let two = new Promise((res, rej) => {
  setTimeout(res(randomValue()), 2000);
});

let three = new Promise((res, rej) => {
  setTimeout(res(randomValue()), 3000);
});

let four = new Promise((res, rej) => {
  setTimeout(res(randomValue()), 4000);
});

let promiseAll = Promise.all([one, two, three, four])
.then((res) => console.log(res))
.catch((error) => console.error(error));

// Alternate

let times = [1,2,3,4];

let timesPromise = times.map((second) => new Promise((resolve) => {
  setTimeout(() => resolve(Math.random()) , second * 1000);
})
);

Promise.all(timesPromise).then(console.log);

// - Create a list of 5 Github usernames in an array and using `Promise.all` get access to the data of each user from GitHub API. Log the number of followers of each user.

let usernames = ['ivinoop', 'nnnkit', 'srivatsa224', 'suraj122', 'prank7'];

const data = Promise.all(usernames.map((user) => {
  fetch(`https://api.github.com/users/${user}`)
  .then((response) => response.json())
  .then(user => console.log(`Name: ${user.name}, Followers: ${user.followers}`))
})
);

// - Use `Promise.race` to see which API resolves faster from the given list of URLs. Log the object you get from the promise that is resolved faster.

//   - https://random.dog/woof.json
//   - https://aws.random.cat/meow

const dogPromise = fetch(`https://random.dog/woof.json`).then(response => response.json());
const catPromise = fetch(`https://aws.random.cat/meow`).then(response => response.json());

Promise.race([dogPromise, catPromise]).then(console.log);

// - Use `Promise.allSettled` to log the value of each promise from the given list of promises. And also check if `Promise.all` works with `one`, `two` and `three` or not

// ```js
const one = new Promise((resolve, reject) =>
  setTimeout(() => resolve('Arya'), 1000)
);
const two = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error('Whoops!')), 2000)
);
const three = new Promise((resolve, reject) =>
  setTimeout(() => resolve('John'), 3000)
);

Promise.allSettled([one, two, three])
.then(console.log);
// ```



// - What will be the output of the following code snippet? How much time will it take for the promise to resolve?

// ```js
// Promise.all([
//   new Promise((resolve, reject) => {
//     setTimeout(() => resolve('Arya'), 1000);
//   }),
//   'Sam',
//   { name: 'John' },
// ]).then(console.log);
// ```
// ----------Output----------

// ["Arya", "sam", {name: "John"}]
// Takes 1 second to resolve

