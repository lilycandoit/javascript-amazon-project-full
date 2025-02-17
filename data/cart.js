import { deliveryOptions } from './deliveryOptions.js';

export let cart = JSON.parse(localStorage.getItem('cart')) || [];

export function addToCart(productId, quantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
      deliveryOptionId: '3',
    });
  }

  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });
  console.log(newCart);
  cart = newCart;
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  // it looks for the matching items in the 'cart' array, then update the quantity of that item to the newQuantity.
  // then save the updated cart

  saveToStorage();
}

// find deliveryOption in the cart
export function updateDeliveryOption(productId, deliveryOptionId) {
  // find the matching item from productId
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  // then update the deliveryOptionId for that matchingItem by reassigning with the provided parameter
  matchingItem.deliveryOptionId = deliveryOptionId;

  // then save the updated cart (with deliveryOptionId) in storage
  saveToStorage();
}

//PRACTICE PROMISE
export function loadCarts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  });
  xhr.open('GET', 'http://supersimplebackend.dev/cart');
  xhr.send();
}

//EXERCISE
export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');

  const result = await response.text();

  console.log(result);
}

// extra feature: make the cart empty after creating an order. 

export function resetCart(){
  cart = [];
  saveToStorage();
}
