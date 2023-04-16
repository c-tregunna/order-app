import { itemArray } from "./data.js";

// VARIABLES
let itemOrders = [];
const orderSection = document.querySelector('.order-section ');
const inputs = document.getElementsByTagName('input');

// order-container
//EVENT LISTENERS

document.addEventListener('click', (e) => {
    //eventlistener to add item to the order
    if(e.target.dataset.add) {
        orderSection.classList.remove('hidden');
        addToOrderClick(e.target.dataset.add) //add each item clicked to the itemOrders array with that id matching the e.target
        document.getElementById('order').innerHTML = addOrderItem();
    }
    //eventlistener to complete order
    if(e.target.dataset.complete) {
        document.getElementById('payment-modal').classList.remove('hidden');
    }
    // eventlistener to pay
    if(e.target.dataset.pay) {
        if(inputs.value.length >= 1) {
            document.getElementById('payment-modal').classList.add('hidden');
            // document.getElementById('order').innerHTML = thankYou();

        } else {
            alert("fill out the form")
        }
    }
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

function addToOrderClick(itemId) {
    const targetItemObj = itemArray.filter(function(item){
        return item.id == itemId
    })[0]
    itemOrders.push(targetItemObj); //add each item clicked to the itemOrders array with that id matching the e.target
    addOrderItem()
}

//takes the items added to the array to display as an order
function addOrderItem() {
    let orderHtml = ``;
    itemOrders.forEach(item => {
        orderHtml += `
        <div class="item-order-info">
            <h4 class="item-order-name">${item.name}</h4>
            <p class="item-order-remove">remove</p>
            <h5 class="item-order-price">£${item.price}</h5>
        </div>
    `
    })
    orderHtmlContainer(orderHtml)
}

//Create the order section
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
    document.getElementById('order-container').innerHTML = orderSectionHtml;
    totalCost()
}

//calculates total of order
function totalCost() {
    let orderTotal = 0;
    itemOrders.forEach(item => {
        orderTotal += item.price; //adds the price of each item to orderTotal
    })
    document.getElementById('order-total').innerHTML = `£ ${orderTotal}`
}



