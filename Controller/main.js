import Api from "../Services/api.js";
import { renderProductlist, renderCart } from "../Controller/renderProduct.js";
import Validation from "../Models/validation.js";
import CartItem from "../Models/productCart.js";

// import Product from "../Product.js";

const api = new Api();
const validation = new Validation();
const getEle = (id) => document.getElementById(id);

const getListProduct = () => {
  console.log("HELLO");
  api
    .callApi("FinalExamier", "get", null)
    .then((result) => renderProductlist(result))
    .catch((err) => console.log(err));
};
getListProduct();

getEle("searchButton").addEventListener("click", () => {
  const searchInput = getEle("searchInput").value;
  const productName = searchInput;

  if (productName.trim() !== "") {
    searchProductByName(productName);
  }
  console.log("Hello");
});

getEle("searchInput").addEventListener("keyup", () => {
  const searchInput = getEle("searchInput").value;
  if (searchInput.trim() === "") {
    getListProduct();
  }
});

const searchProductByName = async (productName) => {
  try {
    const products = await api.callApi(`FinalExamier`, "get", null);
    const filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(productName.toLowerCase())
    );
    renderProductlist(filterProducts);
    console.log("Hello");
  } catch (err) {
    console.log(err);
  }
};

let cartBtn = document.getElementById("cart-btn");
let cartWrapper = document.querySelector(".cart-wrapper");
cartBtn.addEventListener("click", () => {
  cartWrapper.classList.toggle("cart-on");
});

let id = 0;
let total = 0;
let cartBody = document.getElementById("cart-body");
let cartTotal = document.getElementsByClassName("total");

function addProduct(event) {
  let title =
    event.target.parentElement.parentElement.childNodes[1].textContent;
  let price = event.target.parentElement.childNodes[1].textContent;
  id += 1;
  total += parseInt(price);

  let output = `<td>${id}</td>
    <td>${title}</td>
    <td>$${price}</td>`;

  cartBody.innerHTML += output;
  cartTotal.innerHTML = total;
}
// Add sticky
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  header.classList.toggle("sticky", window.scrollY > 1);
});

// ADD CART

let cart = [];

const btnAddToCart = (id) => {
  api
    .callApi(`FinalExamier/${id}`, "GET", null)
    .then((result) => {
      let index = cart.findIndex((item) => item.product.id === id);

      if (index < 0) {
        let newItem = new CartItem(result, 1);
        cart.push(newItem);
      } else {
        cart[index].quantity += 1;
      }
      renderCart(cart);
    })
    .catch((err) => {
      console.log(err);
    });
};
window.btnAddToCart = btnAddToCart;

const btnRemove = (id) => {
  let index = cart.findIndex((item) => item.product.id === id);
  cart.splice(index, 1);
  renderCart(cart);
};
window.btnRemove=btnRemove;