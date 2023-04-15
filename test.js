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




// function renderOrder() {
//     document.getElementById('order').innerHTML = addOrderItem();
// }

// const orderBtn = document.getElementById('order-btn');
// orderBtn.addEventListener('click', () =>{
//     renderOrder()
// })
