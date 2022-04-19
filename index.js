// DOM elements
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api/");
  const data = await res.json();
  //   console.log(data);

  // kjo ka ardh pasoje  API e cilla i ka te vendosura ne "data" results emrat
  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  //   console.log(newUser);
  addData(newUser);
}

// Double eveyones Money using map()
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

// Sort users by richestwith sort()

function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
// Filter millionare with filter()
function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);
  updateDOM();
}

// Add new obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// UpdateDOM
function updateDOM(providedData = data) {
  // Clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  //loop over providedData , item have inside "Name" and the "Money"
  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong>${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// Format umber as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
