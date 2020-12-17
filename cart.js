if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('add_to_cart_button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

   
}



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event) {
    var button = event.target
    var shopItem = button.parentElement
    var title = shopItem.getElementsByClassName('titleitem')[0].innerText
    var price = shopItem.getElementsByClassName('priceitem')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('imageitem')[0].src
    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('tr')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart_item')[0]
    var cartItemNames = cartItems.getElementsByClassName('titleitem')
 
    
    
    var cartRowContents = `

        <tr>
        <td class="product-remove"><button class="remove" >X</button></td>
        <td class="product-thumbnail"><img class="cart-item-image" src="${imageSrc}" width="100" height="100"></td>
        <td class="product-name"> <span class="cart-item-title">${title}</span></td>
        <td class="product-price" ><span class="cart-price cart-column">${price}</span></td>
        <td class="product-quantity"><input class="cart-quantity-input" type="number" value="1"></td>
        <td class="product-subtotal "><span class="subtotal">£0.00</span></td>
        </tr>

        `

    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}


function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart_item')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var  amount = 0
    var sl = 0
    var totalitem = 0
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('product-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
       
        total = total + (price * quantity)
        total = Math.round(total * 100) / 100

        totalitem = total - totalitem

        totalitem = Math.round(totalitem * 100) / 100
        
        sl = quantity
        document.getElementsByClassName('subtotal')[i].innerText = '$' + totalitem
        totalitem = total
        document.getElementsByClassName('amounts')[i].innerText = sl 
       
        

    }
    total = Math.round(total * 100) / 100
    
    document.getElementsByClassName('supertotalamount')[0].innerText = '$' + total
    document.getElementsByClassName('supertotalamount')[1].innerText = '$' + total
    document.getElementsByClassName('cart-amunt')[0].innerText = '$' + total
       
}