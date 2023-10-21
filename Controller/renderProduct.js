const getEle = (id) => document.getElementById(id);
const renderProductlist = (productArr) => {
  let contentProduct = "";
  for (let i = 0; i < productArr.length; i++) {
    let ele = productArr[i];
    contentProduct += `
    <div class="row">
      <div class="col-4">
        <div class="box">
          <img
            src="${ele.image}"
            alt=""
          />
          <h4>${ele.name}</h4>
          <h6>Prices: ${ele.price}VND</h6>
          <p>${ele.desc}</p>
          <button class="button-28" id="btnAdd" type="button" onclick="btnAddToCart(${ele.id})">Add To Cart</button>
        </div>
      </div>
    </div>
    `;
  }
  getEle("productsList").innerHTML = contentProduct;
};

/**
 * RENDER CART
 */
const renderCart = (cart) => {
  let content = "";
  cart.forEach((ele) => {
    content += `
    <td class="RenderProduct" rowspan="1">
              <div class="cart-img">
                <img
                src=${ele.product.image}
              </div>
            </td>
            <td>${ele.product.name}</td>
            <td>${ele.product.price}</td>
            <td>
            <button><span class="minus-btn" onclick ="btnMinus('${
              ele.product.id
            }')">-</span></button>
            <span class="quantityResult mx-2">${ele.quantity}</span>
            <button><span class="plus-btn" onclick ="btnPlus('${
              ele.product.id
            }')">+</span></button>
            </td>
            <td colspan="5">Total: $<span class="total">${
              ele.quantity * ele.product.price
            }</span></td>
            <td colspan="6"><a href="#!" onclick ="btnRemove('${
              ele.product.id
            }')"><i class="fa-solid fa-minus"></i></a></td>
            `;
  });
  getEle("cart-body").innerHTML = content;

  /**
   * Total Phone
   */
  let cartCount = 0;
  cart.forEach((item) => {
    cartCount += item.quantity;
  });
  // const uiTotal = totalCart(cart);
  // const shipping = uiTotal > 0 ? 50 : 0;
  getEle("cartCount").innerHTML = cartCount;
  // getEle("shipping").innerHTML = "$" + shipping;
  // getEle("subTotal").innerHTML = "$" + uiTotal;
  // getEle("tax").innerHTML = "$" + Math.floor(uiTotal * 0.1);
  // getEle("priceTotal").innerHTML = "$" + Math.floor(uiTotal * 1.1 + shipping);
};
export { renderProductlist,renderCart};
