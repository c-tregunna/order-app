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
        document.getElementById('order').innerHTML = addOrderItem();
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



function orderHtmlContainer() {
    let orderSectionHtml = `
    <h4 class="order-title">Your Order</h4>
    <div class="item-order" id="order">
        ${orderHtml}
    </div>
    <div class="order-total-container">
        <h4 class="item-order-name">Order total</h4>
        <h4 class="item-order-price" id="order-total"></h4>
    </div>
    <button id="complete-order-btn" class="order-btn" data-complete="complete"> Complete Order!</button>
    `
    return orderSectionHtml;
}
orderHtmlContainer()



// function renderOrder() {
//     document.getElementById('order').innerHTML = addOrderItem();
// }

// const orderBtn = document.getElementById('order-btn');
// orderBtn.addEventListener('click', () =>{
//     renderOrder()
// })
