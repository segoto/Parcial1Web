const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";
let active = 0;
let data = [];
let shoppingCartIndex = 0;
const cardButton = "Add to cart";
const orderDetailTitle = "Order Detail";
let shoppingCart = [];
let numberItemsShoppingCart = 0;

const setActive = (index) => {
    active = index;
};

const setOnClickShoppingCart = () => {
    document.getElementById("shoppingCart").onclick = onClickShoppingCart;
};

const onClickShoppingCart = () => {
    active = shoppingCartIndex;
    categoryRender();
    renderProductOrderDetail();
};

const categoryRender = () => {
    let category = document.getElementById("currentCategory");
    if (active < data.length) {
        category.innerHTML = data[active].name;
    } else {
        category.innerHTML = orderDetailTitle;
    }
};

const renderNumberOfItems = () => {
    let items = document.getElementById("numberItem");
    items.innerHTML = `${numberItemsShoppingCart}`;
};

const renderProductOrderDetail = () => {
    let productOrderDetailSection = document.getElementById("products-orderDetail");
    productOrderDetailSection.innerHTML = "";
    if (active < data.length) {
        renderProducts(productOrderDetailSection);
    } else {
        renderOrderDetail(productOrderDetailSection);
    }
};
const renderOrderDetail = (productOrderDetailSection)=>{
    let total = 0;
    let container = document.createElement("div");
    container.classList.add("col-12");
    let table = document.createElement("table");
    table.classList.add("table", "table-striped");
    let tableHead = document.createElement("thead");
    let tableHeadRow = document.createElement("tr");
    let th1 = document.createElement("th");
    th1.setAttribute("scope","col");
    th1.innerHTML = "Items";
    let th2 = document.createElement("th");
    th2.setAttribute("scope","col");
    th2.innerHTML = "Qty."
    let th3 = document.createElement("th");
    th3.setAttribute("scope","col");
    th3.innerHTML = "Description"
    let th4 = document.createElement("th");
    th4.setAttribute("scope","col");
    th4.innerHTML = "Unit Price"
    let th5 = document.createElement("th");
    th5.setAttribute("scope","col");
    th5.innerHTML = "Amount";
    let tableBody = document.createElement("tbody");
    shoppingCart.forEach((element, index)=>{
        let tableRow = document.createElement("tr");
        let thBody = document.createElement("th");
        thBody.setAttribute("scope","row");
        thBody.innerHTML = `${index+1}`;
        let quantity = document.createElement("td");
        quantity.innerHTML = `${element.quantity}`;
        let description = document.createElement("td");
        description.innerHTML = `${element.product.name}`;
        let price = document.createElement("td");
        price.innerHTML =`${element.product.price}`;
        let amount = document.createElement("td");
        let totalProduct = element.quantity*element.product.price;
        amount.innerHTML = `${totalProduct}`;
        total += totalProduct;
        tableRow.appendChild(thBody);
        tableRow.appendChild(quantity);
        tableRow.appendChild(description);
        tableRow.appendChild(price);
        tableRow.appendChild(amount);
        tableBody.appendChild(tableRow);
    });
    tableHeadRow.appendChild(th1);
    tableHeadRow.appendChild(th2);
    tableHeadRow.appendChild(th3);
    tableHeadRow.appendChild(th4);
    tableHeadRow.appendChild(th5);
    tableHead.appendChild(tableHeadRow);
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    let container2 = document.createElement("div");
    container2.classList.add("col-6");
    let container3 = document.createElement("div");
    container3.classList.add("col-6");
    let totalPrice = document.createElement("span");
    totalPrice.classList.add("mr-auto", "price");
    total = total.toFixed(2);
    totalPrice.innerHTML = `$ ${total}`;
    let buttons = document.createElement("div");
    buttons.classList.add("row","justify-content-end");
    let buttonCancel = document.createElement("button");
    buttonCancel.classList.add("btn", "btn-danger");
    buttonCancel.setAttribute("data-toggle", "modal");
    buttonCancel.setAttribute("data-target","#cancelModal");
    buttonCancel.innerHTML = "Cancel";
    let buttonPay = document.createElement("button");
    buttonPay.classList.add("btn", "btn-light");
    buttonPay.innerHTML = "Confirm Order";
    buttonPay.onclick = confirmOrder;
    buttons.appendChild(buttonCancel);
    buttons.appendChild(buttonPay);
    container2.appendChild(totalPrice);
    container3.appendChild(buttons);
    productOrderDetailSection.appendChild(container);
    productOrderDetailSection.appendChild(container2);
    productOrderDetailSection.appendChild(container3);
}

const renderProducts = (productOrderDetailSection) =>{
    data[active].products.forEach((element) => {
        let columnContainer = document.createElement("div");
        columnContainer.classList.add("col-lg-3", "col-md-4", "col-sm-6", "col-12", "distance");
        let card = document.createElement("div");
        card.classList.add("card", "h-100");
        let imageCard = document.createElement("img");
        imageCard.setAttribute("src", element.image);
        imageCard.classList.add("card-img-top");
        imageCard.setAttribute("alt", element.name);
        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body", "d-flex", "flex-column");
        let titleBody = document.createElement("h5");
        titleBody.classList.add("card-title");
        titleBody.innerHTML = element.name;
        let description = document.createElement("p");
        description.classList.add("card-text");
        description.innerHTML = element.description;
        let toTheBottom = document.createElement("div");
        toTheBottom.classList.add("mt-auto");
        let price = document.createElement("p");
        price.classList.add("card-text", "price");
        price.innerHTML = `$ ${element.price}`;
        let button = document.createElement("button");
        button.classList.add("btn", "btn-dark");
        button.onclick = () => {
            numberItemsShoppingCart++;
            let index = shoppingCart.findIndex((item) => item.product === element);
            if (index < 0) {
                shoppingCart.push({ quantity: 1, product: element });
            } else {
                shoppingCart[index].quantity++;
            }
            renderNumberOfItems();
        };
        button.innerHTML = cardButton;
        toTheBottom.appendChild(price);
        toTheBottom.appendChild(button);
        cardBody.append(titleBody);
        cardBody.appendChild(description);
        cardBody.appendChild(toTheBottom);
        card.appendChild(imageCard);
        card.appendChild(cardBody);
        columnContainer.appendChild(card);
        productOrderDetailSection.appendChild(columnContainer);
    });
}

const navabarCategoryRender = (data) => {
    let categoryNavbar = document.getElementById("categories");
    data.forEach((element, index) => {
        let li = document.createElement("li");
        li.classList.add("nav-item");
        let button = document.createElement("button");
        button.classList.add("btn", "btn-dark");
        button.innerHTML = element.name;
        button.onclick = () => {
            active = index;
            categoryRender();
            renderProductOrderDetail();
        };
        li.appendChild(button);
        categoryNavbar.appendChild(li);
    });
};

const cancelOrder = () =>{
    shoppingCart = [];
    numberItemsShoppingCart= 0;
    renderProductOrderDetail();
    renderNumberOfItems();
}

const confirmOrder = () =>{
    let order = shoppingCart.map((element, index)=>{
        return {item:(index+1), description: element.product.name, unitPrice: element.product.price};
    })
    console.log(order);
    shoppingCart = [];
    numberItemsShoppingCart= 0;
    active = 0;
    renderProductOrderDetail();
    renderNumberOfItems();
}

fetch(url)
    .then((response) => response.json())
    .then((response) => {
        data = response;
        shoppingCartIndex = response.length;
        navabarCategoryRender(response);
        categoryRender();
        renderProductOrderDetail();
    });
setOnClickShoppingCart();
renderNumberOfItems();
