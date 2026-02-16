// FILTER VARIABLES AND LOGIC

const filterBtns = document.querySelectorAll(".filter-btn");
const dishes = document.querySelectorAll(".dish");
const soups = document.querySelectorAll("#soups");
const main = document.querySelectorAll("#main");
const appetizers = document.querySelectorAll("#appetizers");
const bakery = document.querySelectorAll("#bakery");
const desserts = document.querySelectorAll("#desserts");
const drinks = document.querySelectorAll("#drinks");

filterBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id.split("-")[0] === "all") {
      dishes.forEach((dish) => {
        dish.classList.remove("hidden");
      });
    } else {
      dishes.forEach((dish) => {
        if (dish.id === button.id.split("-")[0]) {
          dish.classList.remove("hidden");
        } else {
          dish.classList.add("hidden");
        }
      });
    }
  });
});

// SHOPPING CART VARIABLES AND LOGIC

const shoppingCart = document.querySelector("#shopping-cart");
const shoppingCartHeader = shoppingCart.querySelector("h3");
const specialCartDiv = document.querySelector("#special-cart-div");
const openCartBtn = document.querySelector("#open-cart-btn");
const openCartBtnSpan = openCartBtn.querySelector("span");
const closeCartBtn = document.querySelector("#close-cart-btn");
const ordersDiv = document.querySelector("#orders");
const addBtns = document.querySelectorAll("#add-btn");
const body = document.querySelector("body");
const summary = document.querySelector("#summary");

openCartBtn.addEventListener("click", () => {
  shoppingCart.classList.remove("hidden");
  specialCartDiv.classList.remove("hidden");
  body.style.overflow = "hidden";
});

closeCartBtn.addEventListener("click", () => {
  shoppingCart.classList.add("hidden");
  specialCartDiv.classList.add("hidden");
  body.style.overflow = "inherit";
});

addBtns.forEach((addBtn) => {
  addBtn.addEventListener("click", () => {
    const parentElement = addBtn.closest(".dish");
    const header = parentElement.querySelector("h3");
    const price = parentElement.querySelector("span");
    const idMaker = `${header.textContent.toLowerCase().replaceAll(" ", "-")}`;

    const orderId = `${idMaker}-order`;
    let order = ordersDiv.querySelector(`#${orderId}`);
    const spanCount = document.querySelector(`#${idMaker}-count`);

    if (order === null) {
      ordersDiv.insertAdjacentHTML(
        "beforeend",
        `<div class="order" id="${orderId}">
      <div id="header-and-remove-btn-div"><h4>${header.textContent}</h4>
      <button class="remove" id="remove"><img src="assets/icons/remove.png" alt="Remove Button"></button></div>
      <div id="price-and-count-div"><span class="price" id="${idMaker}-price">$${(Number(1) * Number(price.textContent.slice(1))).toFixed(2)}</span>
      <button class="minus" id="${idMaker}-minus">-</button>
      <span class="count" id="${idMaker}-count">${Number(1)}</span>
      <button class="add" id="${idMaker}-add">+</button></div>
      </div>`,
      );
    } else {
      spanCount.textContent = parseInt(spanCount.textContent) + 1;
    }

    if (ordersDiv.querySelector(`#${orderId}`)) {
      addBtn.disabled = true;
      addBtn.textContent = "Added ✓";
      addBtn.closest("div").style.gap = "100px";
    } else {
      addBtn.disabled = false;
      addBtn.textContent = "Add +";
      addBtn.closest("div").style.gap = "120px";
    }

    order = ordersDiv.querySelector(`#${orderId}`);

    const subTotalSpan = shoppingCart.querySelector("#subtotal-span");
    const sum = ordersDiv.querySelectorAll(".price");
    let subTotal = 0;
    sum.forEach((el) => {
      subTotal += Number(el.textContent.slice(1));
      subTotalSpan.textContent = "$" + subTotal.toFixed(2);
    });
    const taxSpan = shoppingCart.querySelector("#tax-span");
    taxSpan.textContent =
      "$" + (Number(subTotalSpan.textContent.slice(1)) * 0.1).toFixed(2);
    const totalSpan = shoppingCart.querySelector("#total-span");
    totalSpan.textContent =
      "$" +
      (
        Number(Number(subTotalSpan.textContent.slice(1))) +
        Number(taxSpan.textContent.slice(1))
      ).toFixed(2);

    let length = ordersDiv.querySelectorAll(".order").length;
    shoppingCartHeader.textContent = `Your Cart (${length})`;
    openCartBtnSpan.textContent = length;
    if (length != 0) {
      openCartBtnSpan.classList.remove("hidden");
      summary.classList.remove("hidden");
    } else {
      openCartBtnSpan.classList.add("hidden");
      summary.classList.remove("hidden");
    }

    const addOrder = order.querySelector(".add");
    addOrder.addEventListener("click", () => {
      const idMaker = order.id.split("-order")[0];
      const spanCount = order.querySelector(`#${idMaker}-count`);
      const spanPrice = order.querySelector(`#${idMaker}-price`);

      spanCount.textContent = parseInt(spanCount.textContent) + 1;
      spanPrice.textContent =
        "$" +
        (
          parseInt(spanCount.textContent) * Number(price.textContent.slice(1))
        ).toFixed(2);

      length = ordersDiv.querySelectorAll(".order").length;
      shoppingCartHeader.textContent = `Your Cart (${length})`;
      openCartBtnSpan.textContent = length;
      if (length != 0) {
        openCartBtnSpan.classList.remove("hidden");
        summary.classList.remove("hidden");
      } else {
        openCartBtnSpan.classList.add("hidden");
        summary.classList.add("hidden");
      }

      const subTotalSpan = shoppingCart.querySelector("#subtotal-span");
      const sum = ordersDiv.querySelectorAll(".price");
      let subTotal = 0;
      sum.forEach((el) => {
        subTotal += Number(el.textContent.slice(1));
        subTotalSpan.textContent = "$" + subTotal.toFixed(2);
      });
      const taxSpan = shoppingCart.querySelector("#tax-span");
      taxSpan.textContent =
        "$" + (Number(subTotalSpan.textContent.slice(1)) * 0.1).toFixed(2);
      const totalSpan = shoppingCart.querySelector("#total-span");
      totalSpan.textContent =
        "$" +
        (
          Number(Number(subTotalSpan.textContent.slice(1))) +
          Number(taxSpan.textContent.slice(1))
        ).toFixed(2);
    });

    const minusOrder = order.querySelector(".minus");
    minusOrder.addEventListener("click", () => {
      const idMaker = order.id.split("-order")[0];
      const spanCount = order.querySelector(`#${idMaker}-count`);
      const spanPrice = order.querySelector(`#${idMaker}-price`);
      spanCount.textContent = parseInt(spanCount.textContent) - 1;

      spanPrice.textContent =
        "$" +
        (
          parseInt(spanCount.textContent) * Number(price.textContent.slice(1))
        ).toFixed(2);

      if (parseInt(spanCount.textContent) === 0) {
        ordersDiv.removeChild(order);
      }

      length = ordersDiv.querySelectorAll(".order").length;
      shoppingCartHeader.textContent = `Your Cart (${length})`;
      openCartBtnSpan.textContent = length;
      if (length != 0) {
        openCartBtnSpan.classList.remove("hidden");
        summary.classList.remove("hidden");
      } else {
        openCartBtnSpan.classList.add("hidden");
        summary.classList.add("hidden");
      }

      const subTotalSpan = shoppingCart.querySelector("#subtotal-span");
      const sum = ordersDiv.querySelectorAll(".price");
      let subTotal = 0;
      sum.forEach((el) => {
        subTotal += Number(el.textContent.slice(1));
        subTotalSpan.textContent = "$" + subTotal.toFixed(2);
      });
      const taxSpan = shoppingCart.querySelector("#tax-span");
      taxSpan.textContent =
        "$" + (Number(subTotalSpan.textContent.slice(1)) * 0.1).toFixed(2);
      const totalSpan = shoppingCart.querySelector("#total-span");
      totalSpan.textContent =
        "$" +
        (
          Number(Number(subTotalSpan.textContent.slice(1))) +
          Number(taxSpan.textContent.slice(1))
        ).toFixed(2);

      if (ordersDiv.querySelector(`#${orderId}`)) {
        addBtn.disabled = true;
        addBtn.textContent = "Added ✓";
        addBtn.closest("div").style.gap = "100px";
      } else {
        addBtn.disabled = false;
        addBtn.textContent = "Add +";
        addBtn.closest("div").style.gap = "120px";
      }
    });

    const remove = order.querySelector(".remove");
    remove.addEventListener("click", () => {
      ordersDiv.removeChild(order);

      length = ordersDiv.querySelectorAll(".order").length;
      shoppingCartHeader.textContent = `Your Cart (${length})`;
      openCartBtnSpan.textContent = length;
      if (length != 0) {
        openCartBtnSpan.classList.remove("hidden");
        summary.classList.remove("hidden");
      } else {
        openCartBtnSpan.classList.add("hidden");
        summary.classList.add("hidden");
      }

      const subTotalSpan = shoppingCart.querySelector("#subtotal-span");
      const sum = ordersDiv.querySelectorAll(".price");
      let subTotal = 0;
      sum.forEach((el) => {
        subTotal += Number(el.textContent.slice(1));
        subTotalSpan.textContent = "$" + subTotal.toFixed(2);
      });
      const taxSpan = shoppingCart.querySelector("#tax-span");
      taxSpan.textContent =
        "$" + (Number(subTotalSpan.textContent.slice(1)) * 0.1).toFixed(2);
      const totalSpan = shoppingCart.querySelector("#total-span");
      totalSpan.textContent =
        "$" +
        (
          Number(Number(subTotalSpan.textContent.slice(1))) +
          Number(taxSpan.textContent.slice(1))
        ).toFixed(2);

      if (ordersDiv.querySelector(`#${orderId}`)) {
        addBtn.disabled = true;
        addBtn.textContent = "Added ✓";
        addBtn.closest("div").style.gap = "100px";
      } else {
        addBtn.disabled = false;
        addBtn.textContent = "Add +";
        addBtn.closest("div").style.gap = "120px";
      }
    });
  });
});

// RESERVATION VARIABLES AND LOGIC

const reservationBtn = shoppingCart.querySelector("#reservation-btn");
const specialFormDiv = document.querySelector("#special-form-div");
const closeReservationFormBtn = specialFormDiv.querySelector(
  "#close-reservation-form-btn",
);
const formOrders = document.querySelector("#form-orders");
const formOrdersSummary = document.querySelector("#form-orders-summary");

reservationBtn.addEventListener("click", () => {
  specialFormDiv.classList.remove("hidden");
  shoppingCart.classList.add("hidden");
  specialCartDiv.classList.add("hidden");
  body.style.overflow = "hidden";
  const orders = ordersDiv.querySelectorAll(".order");
  orders.forEach((order) => {
    const header = order.querySelector("h4");
    const count = order.querySelector(".count");
    const price = order.querySelector(".price");
    formOrders.insertAdjacentHTML(
      "beforeend",
      `<div class="form-order">
      <h4>${header.textContent}</h4>
      <div><span><strong>Quantity:</strong> ${count.textContent}</span> <span><strong>Price:</strong> ${price.textContent}</div></div>`,
    );
  });
  const summary = document.querySelectorAll(".reservation-div");
  summary.forEach((elem) => {
    const p = elem.querySelector("p");
    const span = elem.querySelector("span");
    formOrdersSummary.insertAdjacentHTML(
      "beforeend",
      `<div id="summary-div">
      <p>${p.textContent}</p>
      <span>${span.textContent}</span></div>`,
    );
  });
  const formNote = document.querySelector("#form-note");
  const formNoteSpan = formNote.querySelector("span");
  const totalSpan = document.querySelector("#total-span");
  formNoteSpan.textContent = `($${(
    Number(totalSpan.textContent.slice(1)) * 0.3
  ).toFixed(2)})`;
});

closeReservationFormBtn.addEventListener("click", () => {
  specialFormDiv.classList.add("hidden");
  body.style.overflow = "inherit";
  formOrders.innerHTML = "";
  formOrdersSummary.innerHTML = "";
  formNoteSpan.textContent = "";
});

const reservationFormForm = document.querySelector("#reservation-form-form");
reservationFormForm.addEventListener("submit", (event) => {
  event.preventDefault();

  reservationFormForm.reset();
  specialFormDiv.classList.add("hidden");
  body.style.overflow = "inherit";
  ordersDiv.innerHTML = "";
  formOrders.innerHTML = "";
  formOrdersSummary.innerHTML = "";
  const summarySpan = summary.querySelectorAll("span");
  summarySpan.forEach((span) => {
    span.textContent = "";
  });
  summary.classList.add("hidden");
  const headerAndCloseForCart = document.querySelector(
    "#header-and-close-for-cart",
  );
  const headerAndCloseForCartHeader = headerAndCloseForCart.querySelector("h3");
  headerAndCloseForCartHeader.textContent = "Your Cart (0)";
  const openCartBtnSpan = document.querySelector("#open-cart-btn-span");
  openCartBtnSpan.textContent = "";
  openCartBtnSpan.classList.add("hidden");
  addBtns.forEach((btn) => {
    btn.disabled = false;
    btn.textContent = "Add +";
    btn.closest("div").style.gap = "120px";
  });

  const message = document.createElement("div");
  message.classList.add("success-message");
  message.textContent =
    "Thank you! Your reservation has been successfully submitted. We look forward to welcoming you!";
  document.body.append(message);
  setTimeout(() => {
    message.remove();
  }, 10000);
});
