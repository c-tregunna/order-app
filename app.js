import { itemArray } from "./data.js";

// VARIABLES
let itemOrders = [];
const orderSection = document.querySelector('.order-section ')

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

document.addEventListener('click', (e) => {
    if(e.target.dataset.add) {
        orderSection.classList.remove('hidden');
        addToOrderClick(e.target.dataset.add)
        document.getElementById('order').innerHTML = addOrderItem();
        // console.log(itemOrders)
        totalCost()
    }
})

function addToOrderClick(itemId) {
    const targetItemObj = itemArray.filter(function(item){
        return item.id == itemId
    })[0]
    itemOrders.push(targetItemObj);
    addOrderItem()
}

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
    return orderHtml;
}


function totalCost() {
    let orderTotal = 0;
    itemOrders.forEach(item => {
        orderTotal += item.price;
    })
    document.getElementById('order-total').innerHTML = `£ ${orderTotal}`
}
totalCost()


