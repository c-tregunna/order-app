import { itemArray } from "./data.js";

// VARIABLES
let itemOrders = [];
const orderContainer = document.getElementById('order-container');
const paymentForm = document.getElementById('pay-form');
let orderTotal = 0;

// order-container
//EVENT LISTENERS

document.addEventListener('click', (e) => {
    //eventlistener to add item to the order
    if(e.target.dataset.add) {
        addToOrderClick(e.target.dataset.add) //add each item clicked to the itemOrders array with that id matching the e.target
        document.getElementById('order').innerHTML = addOrderItem();
    }
    //eventlistener to complete order
    if(e.target.dataset.complete) {
        document.getElementById('payment-modal').classList.remove('hidden');
    }
    //eventlistener to delate an item from order
    if(e.target.dataset.delete) {
        e.target.closest('div').remove();
        removeOrderClick(e.target.dataset.delete)
        console.log(itemOrders)
        totalCost()
        if (itemOrders.length == 0) {
            orderContainer.innerHTML = `<h4 class="order-title">Your basket is empty</h4>`;
        }
    }

})

//eventlistener to pay through form
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(paymentForm);
    const payerName = formData.get('fullName');
    console.log(payerName)
    document.getElementById('payment-modal').classList.add('hidden');
    orderContainer.innerHTML = `<div class="thank-you">Thanks, ${payerName}! Your order is on its way!</div>`
    itemOrders = [];
    orderTotal =0;
})

// FUNCTIONS
//loops through array to render the html
function itemFeedHtml() {
    let itemHtml = ``;
    itemArray.forEach(item => {
        itemHtml += `
        <section class="item">
            <p class="item-icon">${item.emoji}</p>
            <div class="item-info">
                <h4 class="item-name">${item.name}</h4>
                <p class="item-ingrediants">${item.features}</p>
                <h5 class="item-price">£${item.price}</h5>
            </div>
            <div class="add-item-btn" data-add="${item.id}">
                +
            </div>
        </section>
        `
    })
    return itemHtml;
}

//add render html to container
function renderItems() {
    document.getElementById('item-container').innerHTML = itemFeedHtml();
}

renderItems();

//function to add items to the itemOrders array when click the + button
function addToOrderClick(itemId) {
    const targetItemObj = itemArray.filter(function(item){
        return item.id == itemId
    })[0]
    orderTotal += targetItemObj.price
    itemOrders.push(targetItemObj); //add each item clicked to the itemOrders array with that id matching the e.target
    addOrderItem()
    console.log(itemOrders)
}

//function to remove items to the itemOrders array when click the remove button
function removeOrderClick(itemId) {
    const targetItemObj = itemArray.filter(function(item){
        return item.id == itemId
    })[0]
    itemOrders.pop(targetItemObj); //is there a better way to do this>
    orderTotal -= targetItemObj.price //add each item clicked to the itemOrders array with that id matching the e.target
}

//takes the items added to the array to display as an order - will add to the funtion below
function addOrderItem() {
    let orderHtml = ``;
    itemOrders.forEach(item => {
        orderHtml += `
        <div class="item-order-info">
            <h4 class="item-order-name">${item.name}</h4>
            <p class="item-order-remove" data-delete="${item.id}">remove</p>
            <h5 class="item-order-price">£${item.price}</h5>
        </div>
    `
    })
    orderHtmlContainer(orderHtml)
}

//Create the order section where the items that are ordered will sit
function orderHtmlContainer(orderHtml) {
    let orderSectionHtml = ``
    orderSectionHtml = `<h4 class="order-title">Your Order</h4>
    <div class="item-order" id="order">
        ${orderHtml}
    </div>
    <div class="order-total-container">
        <h4 class="item-order-name">Order total</h4>
        <h4 class="item-order-price" id="order-total"></h4>
    </div>
    <button id="complete-order-btn" class="order-btn" data-complete="complete"> Complete Order!</button>
    `
    orderContainer.innerHTML = orderSectionHtml;
    totalCost()
}

//calculates total of order
function totalCost() {
    document.getElementById('order-total').innerHTML = `£ ${orderTotal}`
}