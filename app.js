import { itemArray } from "./data.js";

// VARIABLES

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
            <div class="add-item-btn" id="order-btn" data-add="${item.id}">
                <p class="plus">+</p>
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

function addOrderItem() {
    let orderHtml = ``;
    itemArray.forEach(item => {
        orderHtml = `
        <div class="item-order-info">
            <h4 class="item-order-name">${item.name}</h4>
            <p class="item-order-remove">remove</p>
            <h5 class="item-order-price">£${item.price}</h5>
        </div>
    `
    })
    return orderHtml;
}

//render orders
document.addEventListener('click', (e) =>{
    if(e.target.dataset.add) {
        addOrderClick(e.target.dataset.add)
    }
})

function addOrderClick(itemId) {
    const targetItemObj = itemArray.filter(function(item){
        return item.id === itemId
    })[0]
    if(targetItemObj) {
        renderOrder()
    }
}




// function renderOrder() {
//     document.getElementById('order').innerHTML = addOrderItem();
// }

// const orderBtn = document.getElementById('order-btn');
// orderBtn.addEventListener('click', () =>{
//     renderOrder()
// })



