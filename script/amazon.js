import { cart, addToCart, updateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

loadProducts(renderProductsGrid);

function renderProductsGrid() {
  let html = '';

  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // if a search exists in the URL param, filter the products that match the search.

  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase)) {
          matchingKeyword = true;
        }
      });

      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filteredProducts.forEach((product) => {
    html += `
        <div class="product-container">
              <div class="product-image-container">
                <img class="product-image"
                  src=${product.image}>
              </div>
    
              <div class="product-name limit-text-to-2-lines">
                ${product.name}
              </div>
    
              <div class="product-rating-container">
                <img class="product-rating-stars"
                  src=${product.getStarUrl()}>
                <div class="product-rating-count link-primary">
                  ${product.rating.count}
                </div>
              </div>
    
              <div class="product-price">
                ${product.getPrice()}
              </div>
    
              <div class="product-quantity-container">
                <select class="js-quantity-selector-${product.id}">
                  <option selected value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </div>
              ${product.extraInfoHTML()}
    
              <div class="product-spacer"></div>
    
              <div class="added-to-cart js-added-cart-${product.id}">
                <img src="images/icons/checkmark.png">
                Added
              </div>
    
              <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id=${
                product.id
              }>
                Add to Cart
              </button>
            </div>
      `;
  });
  

  document.querySelector('.products-grid').innerHTML = html;

  const addedMessageTimeout = {}; //initialize it as an object to save timeoutIds associated with specific product IDs

  // make add to cart button interactive
  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`
      );

      const quantitySelected = Number(quantitySelector.value);

      addToCart(productId, quantitySelected);
      calculateCartQuantity();

      // make the added message popup
      const addedMessage = document.querySelector(
        `.js-added-cart-${productId}`
      );

      addedMessage.classList.add('added-cart-visible');

      // make the Added message disappear
      // we need to check if any previous timeoutId. If so, clear it by using clearTimeout.
      const previousTimeoutId = addedMessageTimeout[productId];
      if (previousTimeoutId) {
        clearTimeout(previousTimeoutId);
      }

      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove('added-cart-visible');
      }, 2000);

      //save the timeoutId for this product ID:
      addedMessageTimeout[productId] = timeoutId;
    });
  });

  // move shared function to cart.js to calculate items in cart
  function calculateCartQuantity() {
    const cartQuantity = updateCartQuantity();
    document.querySelector('.cart-quantity').innerHTML = cartQuantity;
  }

  calculateCartQuantity();

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const search = document.querySelector('.js-search-bar').value;

    window.location.href = `amazon.html?search=${search}`;
  });

  //extra feature: searching by pressing Enter
  document
    .querySelector('.js-search-bar')
    .addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        const search = document.querySelector('.js-search-bar').value;

        window.location.href = `amazon.html?search=${search}`;
      }
    });
}
