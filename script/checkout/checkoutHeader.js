import {cart, updateCartQuantity} from '../../data/cart.js';

export function renderCheckoutHeader(){
  const cartQuantity = updateCartQuantity();

  const headerHtml = `
    <div class="header-content">
      <div class="checkout-header-left-section">
        <a href="amazon.html">
          <img class="amazon-logo" src="images/amazon-logo.png">
          <img class="amazon-mobile-logo" src="images/amazon-mobile-logo.png">
        </a>
      </div>

      <div class="checkout-header-middle-section">
        Checkout (<a class="return-to-home-link js-total-items"
          href="amazon.html">${cartQuantity} items</a>)
      </div>

      <div class="checkout-header-right-section">
        <img src="images/icons/checkout-lock-icon.png">
      </div>
    </div>
  `;

  document.querySelector('.checkout-header').innerHTML = headerHtml;
}