'use strict';
let workingHours= ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
//helper
function randomNumber(min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
}
let columnHeader = ['cookies/h', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'DailyLocationTotal'];

function Shops(name, minCust, maxCust, avgCookie) {
  this.name = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.avgCookie = avgCookie;
  this.numOfCust = [];
  this.numOfCookPerHour = [];
  this.totalNumOfCook = 0;
  Shops.allShops.push(this);
}
Shops.allShops=[];
Shops.prototype.getRandom = function () {
  for (let i = 0; i < workingHours.length; i++) {
    let x = Math.ceil(randomNumber(this.minCust, this.maxCust));
    this.numOfCust.push(x);
    let y = Math.ceil(x * this.avgCookie);
    this.numOfCookPerHour.push(y);
    this.totalNumOfCook = this.numOfCookPerHour[i] + this.totalNumOfCook;
  }
};
console.log(this.numOfCust);
Shops.prototype.render = function () {
  const tableElement = document.getElementById('mytable');
  const trElement = document.createElement('tr');
  tableElement.appendChild(trElement);
  const thElement = document.createElement('th');
  trElement.appendChild(thElement);
  thElement.textContent = `${this.name}`;
  for (let i = 0; i < workingHours.length; i++) {
    const tdElement = document.createElement('td');
    trElement.appendChild(tdElement);
    tdElement.textContent = this.numOfCookPerHour[i];
  }
  const tdElement = document.createElement('td');
  trElement.appendChild(tdElement);
  tdElement.textContent = this.totalNumOfCook;
};
const header = function () {
  const parentElement = document.getElementById('shop');
  const tableHead = document.createElement('table');
  parentElement.appendChild(tableHead);
  tableHead.setAttribute('id', 'mytable');
  const tr = document.createElement('tr');
  tableHead.appendChild(tr);
  for (let i = 0; i < columnHeader.length; i++) {
    const th1 = document.createElement('tH');
    tr.appendChild(th1);
    th1.textContent = columnHeader[i];
  }
};
header();
const seattle = new Shops('seattle', 23, 65, 6.3, []);
seattle.getRandom(23, 65);
seattle.render();

const Tokoyo = new Shops('Tokoyo', 3, 24, 1.2, []);
Tokoyo.getRandom(3, 24);
Tokoyo.render();

const Dubai = new Shops('Dubai', 11, 32, 37, []);
Dubai.getRandom(11, 32);
Dubai.render();

const Paris = new Shops('Paris', 20, 38, 23, []);
Paris.getRandom(20, 38);
Paris.render();

const Lima = new Shops('Lima', 2, 16, 4.8, []);
Lima.getRandom(2, 16);
Lima.render();
console.log(Shops.allShops);

const footer = function () {
  const tableElement = document.getElementById('mytable');
  const tr = document.createElement('tr');
  tableElement.appendChild(tr);
  const th1 = document.createElement('th');
  tr.appendChild(th1);
  th1.textContent = 'Totals';
  for (let i = 0; i < workingHours.length; i++) {
    const th2 = document.createElement('th');
    tr.appendChild(th2);
    th2.textContent = seattle.numOfCookPerHour[i] + Tokoyo.numOfCookPerHour[i] + Dubai.numOfCookPerHour[i] + Paris.numOfCookPerHour[i] + Lima.numOfCookPerHour[i];
  }
  const th3 = document.createElement('th');
  tr.appendChild(th3);
  th3.textContent = seattle.totalNumOfCook + Tokoyo.totalNumOfCook + Dubai.totalNumOfCook + Paris.totalNumOfCook + Lima.totalNumOfCook;
  let totalCookies = 0;
  for (let j = 0; j <Shops.allShops.length; j++) {
    totalCookies += parseInt(Shops.allShops[j].numOfCookPerHour[j]);
  }
  th3.textContent = totalCookies;
  // const th4 = document.createElement('th');
  // tr.appendChild(th4);
  // th4.textContent = seattle.totalNumOfCook + Tokoyo.totalNumOfCook + Dubai.totalNumOfCook + Paris.totalNumOfCook + Lima.totalNumOfCook;
};


footer();
const formElement = document.getElementById('addnewshop');
formElement.addEventListener('submit', function (event) {
  event.preventDefault();
  const shopName0 = event.target.shop_name.value;
  const minCust1 = event.target.min_Cust.value;
  const maxCust2 = event.target.max_Cust.value;
  const avdCook3 = event.target.avg_Cook.value;
  document.getElementById('mytable').removeChild(document.getElementById('mytable').lastChild);
  const shop = new Shops(shopName0, minCust1, maxCust2, avdCook3);
  formElement.reset();
  shop.getRandom(minCust1, maxCust2);
  shop.render();
  footer();

});
console.log(Shops.allShops);
