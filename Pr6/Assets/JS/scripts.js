
const products = [
    { id: 1, name: "Redmi note 9 pro", price: 7000, img: "https://i.allo.ua/media/catalog/product/cache/3/image/736x512/9df78eab33525d08d6e5fb8d27136e95/j/6/j6b-__1.webp", status: "НЕЗАБАРОМ" },
    { id: 2, name: "Iphone 15", price: 30000, img: "https://mobileplanet.ua/uploads/product/2023-9-13/magazin-mobileplanet-apple-iphone-15-128gb-blue-mtp43-2853701.jpg", status: "" },
    { id: 3, name: "Galaxy a55", price: 40000, img: "https://i.allo.ua/media/catalog/product/cache/3/small_image/150x130/9df78eab33525d08d6e5fb8d27136e95/import/8071117226979606.webp", status: "ХІТ" },
    { id: 4, name: "Galasxy s25", price: 35000, img: "https://s7d1.scene7.com/is/image/dish/S25_Icyblue_Hero_P1?$ProductBase$&fmt=webp-alpha", status: "ХІТ" }
];

let cart = JSON.parse(localStorage.getItem('myCart')) || [];
let currentProductId = null;

function renderProducts() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p class="price">${p.price} ГРН</p>
            <button class="btn-buy" onclick="askQuantity(${p.id})">У КОРЗИНУ</button>
        </div>
    `).join('');
    updateCartIcon();
}
function askQuantity(id) {
    currentProductId = id;
    document.getElementById('modal-quantity').style.display = 'block';
}

function confirmAddToCart() {
    const qty = parseInt(document.getElementById('quantity-input').value);
    const product = products.find(p => p.id === currentProductId);
    
    const existing = cart.find(item => item.id === currentProductId);
    if (existing) {
        existing.qty += qty;
    } else {
        cart.push({ ...product, qty: qty });
    }
    
    saveCart();
    closeModal('modal-quantity');
    document.getElementById('modal-success').style.display = 'block';
}

function updateCartIcon() {
    
    document.getElementById('cart-count').innerText = cart.length;
}

function openCart() {
    if (cart.length === 0) {
        alert("Корзина пуста");
        return;
    }
    document.getElementById('product-list').parentElement.style.display = 'none';
    document.getElementById('cart-page').style.display = 'block';
    closeModal('modal-success');
    renderCartTable();
}

function renderCartTable() {
    const tbody = document.getElementById('cart-items');
    let total = 0;
    
    tbody.innerHTML = cart.map((item, index) => {
        const sum = item.price * item.qty;
        total += sum;
        return `
            <tr>
                <td>${index + 1}</td>
                <td>Набір "${item.name}"</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${item.qty} <a href="#" onclick="changeQty(${item.id})">(змінити)</a></td>
                <td>${sum.toFixed(2)}</td>
                <td><a href="#" onclick="removeItem(${item.id})">(видалити)</a></td>
            </tr>
        `;
    }).join('');
    
    document.getElementById('total-price').innerText = total.toFixed(2);
}

function changeQty(id) {
    const newQty = prompt("Введіть нову кількість:");
    if (newQty > 0) {
        cart.find(i => i.id === id).qty = parseInt(newQty);
        saveCart();
        renderCartTable();
    }
}

function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    saveCart();
    if (cart.length === 0) closeCart();
    else renderCartTable();
}

function saveCart() {
    localStorage.setItem('myCart', JSON.stringify(cart));
    updateCartIcon();
}

function closeModal(id) { document.getElementById(id).style.display = 'none'; }
function closeCart() {
    document.getElementById('product-list').parentElement.style.display = 'block';
    document.getElementById('cart-page').style.display = 'none';
}

renderProducts();