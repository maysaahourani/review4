'use strict';
const headerArr = ['itemName','category','quantity','price'] ;
let formElement = document.getElementById('wishlist-form');
let ourParentTable = document.getElementById('wishlist-table');
let Totals=document.getElementById('total');
renderheader ();

function Item (itemName, itemCat, quantity) {
  this.itemName = itemName;
  this.itemCat = itemCat;
  this.quantity = quantity;
  this.price = 0;
  Item.allItem.push(this);
}
Item.allItem = [];
Item.prototype.pricefun = function (min,max){
  this.price = generateRandomNumber (min,max)*this.quantity;

};
Item.prototype.render = function () {
  let wishlistRow = document.createElement('tr');

  let itemNameTd = document.createElement('td');
  itemNameTd.textContent = this.itemName;

  let itemCategoryTd = document.createElement('td');
  itemCategoryTd.textContent = this.itemCat;

  let itemQuantityTd = document.createElement('td');
  itemQuantityTd.textContent = this.quantity;

  let itemPriceTd =document.createElement('td');
  itemPriceTd.textContent = this.price;

  wishlistRow.appendChild(itemNameTd);
  wishlistRow.appendChild(itemCategoryTd);
  wishlistRow.appendChild(itemQuantityTd);
  wishlistRow.appendChild(itemPriceTd);

  ourParentTable.appendChild(wishlistRow);
//   let tot = calTot ();
//   Totals.textContent = `the total = ${tot}`;


};
formElement.addEventListener ('submit' , function (event){
  event.preventDefault();
  alert ('sumbit');

  const itemName = event.target.itemname.value;
  const itemCat = event.target.category.value;
  const quantity = event.target.quantity.value;

  formElement.reset();
  console.log (`${itemName}  ${itemCat}  ${quantity}`);

  const item = new Item(itemName, itemCat, quantity);
  item.pricefun(1, 1000);

  localStorage.setItem ( 'wishlistitems', JSON.stringify (Item.allItem));
  item.render();
  console.log(Item.allItem);
} );

function renderheader () {
  const trElement = document.createElement('tr');
  for (let i = 0; i < headerArr.length; i++) {
    const thElement = document.createElement('th'); ////////////////// create a new table header data cell
    thElement.textContent = headerArr[i]; //////////////// set the content for the th from the header content array
    trElement.appendChild(thElement);
  }
  ourParentTable.appendChild(trElement);
}

//helper function
function generateRandomNumber (min,max) {
  return Math.floor ( Math.random()* (max - min + 1)+ min );
}
function checkLS () {
  if (localStorage.getItem('wishlistitems')){
    Item.allItem= JSON.parse (localStorage.getItem ('wishlistitems'));
    renderWishList();
  }
}

function renderWishList () {
  for (let i = 0; i < Item.allItem.length; i++) {

    let wishlistRow = document.createElement('tr');

    let itemNameTd = document.createElement('td');
    itemNameTd.textContent = Item.allItem[i].itemName;

    let itemCategoryTd = document.createElement('td');
    itemCategoryTd.textContent = Item.allItem[i].itemCat;

    let itemQuantityTd = document.createElement('td');
    itemQuantityTd.textContent = Item.allItem[i].quantity;

    let itemPriceTd =document.createElement('td');
    itemPriceTd.textContent = Item.allItem[i].price;

    wishlistRow.appendChild(itemNameTd);
    wishlistRow.appendChild(itemCategoryTd);
    wishlistRow.appendChild(itemQuantityTd);
    wishlistRow.appendChild(itemPriceTd);

    ourParentTable.appendChild(wishlistRow);
  }
  let wishlistRowTotal = document.createElement('tr');
  let tot = calTot ();
    let itemNameTd = document.createElement('td');
    itemNameTd.textContent = 'Item.allItem[i].itemName';
    wishlistRow.appendChild(itemNameTd);


//   Totals.textContent = 'the total =';
}
checkLS();
function calTot() {
  let total = 0 ;
  for (let index = 0; index < Item.allItem.length; index++) {
    total = total + Item.allItem[index].price;
  }
  return total;
}

