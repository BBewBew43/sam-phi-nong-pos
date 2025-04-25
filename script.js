const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const categoryFilter = document.getElementById("categoryFilter");
const paymentModal = document.getElementById("paymentModal");
const cashModal = document.getElementById("cashModal");
const transferModal = document.getElementById("transferModal");
const cashInput = document.getElementById("cashInput");
const changeText = document.getElementById("changeText");
const searchInput = document.getElementById("searchInput");
const customerNameInput = document.getElementById("customerName");

const productDetailModal = document.getElementById("productDetailModal");
const productDetailName = document.getElementById("productDetailName");
const productDetailImage = document.getElementById("productDetailImage");const productList = document.getElementById("productList");
const cartItems = document.getElementById("cartItems");
const totalEl = document.getElementById("total");
const categoryFilter = document.getElementById("categoryFilter");
const paymentModal = document.getElementById("paymentModal");
const cashModal = document.getElementById("cashModal");
const transferModal = document.getElementById("transferModal");
const cashInput = document.getElementById("cashInput");
const changeText = document.getElementById("changeText");
const searchInput = document.getElementById("searchInput");
const customerNameInput = document.getElementById("customerName");

const productDetailModal = document.getElementById("productDetailModal");
const productDetailName = document.getElementById("productDetailName");
const productDetailImage = document.getElementById("productDetailImage");
const productDetailDescription = document.getElementById("productDetailDescription");
const productDetailPrice = document.getElementById("productDetailPrice");
const productDetailOptions = document.getElementById("productDetailOptions");

// const clickSound = new Audio('sounds/click.wav'); // ย้ายไปประกาศใน customers.js

const cart = [];
let totalAmount = 0;
let customerName = "";
let selectedProductForCart = null; // เก็บสินค้าที่เลือกจาก Modal

searchInput.addEventListener("input", handleSearch);
categoryFilter.addEventListener("change", handleCategoryChange);

function playClickSound() {
    // clickSound.currentTime = 0; // ควบคุมการเล่นเสียงใน customers.js
    // clickSound.play();
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(undefined, filteredProducts);
}

function handleCategoryChange() {
    playClickSound();
    renderProducts(categoryFilter.value);
}

function renderCategoryFilter() {
    categoryFilter.innerHTML = '<option value="ทั้งหมด">ทั้งหมด</option>';
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        categoryFilter.appendChild(opt);
    });
}

function renderProducts(category = "ทั้งหมด", productArray = products) {
    productList.innerHTML = "";
    const filtered = category === "ทั้งหมด" ? productArray : productArray.filter(p => p.category === category);
    filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        let optionsHtml = '';
        if (product.options && product.options.length > 0) {
            optionsHtml = '<select class="size-select">';
            product.options.forEach(option => {
                optionsHtml += `<option value="${option.size}" data-price="${option.price}">${option.size} - ${option.price.toFixed(2)} บาท</option>`;
            });
            optionsHtml += '</select>';
        }
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            ${optionsHtml}
            <button onclick="showProductDetail(${product.id})">ดูรายละเอียด</button>`; // เปลี่ยนปุ่ม "เพิ่ม" เป็น "ดูรายละเอียด"
        productList.appendChild(div);
    });
}

function showProductDetail(productId) {
    playClickSound();
    const product = products.find(p => p.id === productId);
    if (product) {
        productDetailName.textContent = product.name;
        productDetailImage.src = product.image;
        productDetailDescription.textContent = product.description || 'ไม่มีรายละเอียด';
        productDetailPrice.textContent = `ราคา: ${product.price ? product.price.toFixed(2) : (product.options && product.options.length > 0 ? 'เลือกขนาด' : 'ไม่ระบุ')} บาท`;
        productDetailOptions.innerHTML = '';
        if (product.options && product.options.length > 0) {
            const select = document.createElement('select');
            select.className = 'size-select-detail';
            product.options.forEach(option => {
                const optionEl = document.createElement('option');
                optionEl.value = option.size;
                optionEl.textContent = `${option.size} - ${option.price.toFixed(2)} บาท`;
                select.appendChild(optionEl);
            });
            productDetailOptions.appendChild(select);
        }
        selectedProductForCart = product;
        productDetailModal.style.display = "flex";
    }
}

function closeProductDetailModal() {
    playClickSound();
    productDetailModal.style.display = "none";
    selectedProductForCart = null;
}

function addToCartFromDetail() {
    playClickSound();
    if (!selectedProductForCart) return;

    let selectedOption = null;
    const sizeSelect = productDetailOptions.querySelector('.size-select-detail');
    if (sizeSelect) {
        const selectedSize = sizeSelect.value;
        selectedOption = selectedProductForCart.options.find(option => option.size === selectedSize);
    }

    if (selectedOption) {
        const existingItem = cart.find(item => item.id === selectedProductForCart.id && item.selectedSize === selectedOption.size);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: selectedProductForCart.id,
                name: `${selectedProductForCart.name} (${selectedOption.size})`,
                price: selectedOption.price,
                quantity: 1,
                selectedSize: selectedOption.size
            });
        }
        renderCart();
        closeProductDetailModal();
    } else if (!selectedProductForCart.options || selectedProductForCart.options.length === 0) {
        const existingItem = cart.find(item => item.id === selectedProductForCart.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...selectedProductForCart, quantity: 1 });
        }
        renderCart();
        closeProductDetailModal();
    } else {
        alert("กรุณาเลือกขนาด");
    }
}

function removeFromCart(index) {
    playClickSound();
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x ${item.quantity} - ${ (item.price * item.quantity).toFixed(2)} บาท
            <button onclick="removeFromCart(${index})">ลบ</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    totalEl.textContent = total.toFixed(2);
    totalAmount = total;
}

function showPaymentModal() {
    playClickSound();
    if (cart.length === 0) {
        alert("ยังไม่มีสินค้าในตะกร้า");
        return;
    }
    paymentModal.style.display = "flex";
}

function closePaymentModal() {
    playClickSound();
    paymentModal.style.display = "none";
}

function checkout(method) {
    console.log("checkout called with method:", method);
    playClickSound();
    closePaymentModal();
    if (cart.length === 0) return;

    if (method === "cash") {
        cashInput.value = "";
        changeText.textContent = "";
        cashModal.style.display = "flex";
    } else if (method === "transfer") {
        transferModal.style.display = "flex";
    }
}

function closeCashModal() {
    playClickSound();
    cashModal.style.display = "none";
}

function closeTransferModal() {
    playClickSound();
    transferModal.style.display = "none";
}

function confirmPayment(cash) {
    console.log("confirmPayment called with cash:", cash);
    playClickSound();

    if (cash !== undefined && cash !== null) {
        const paid = parseFloat(cash);
        if (isNaN(paid) || paid < totalAmount) {
            changeText.textContent = "จำนวนเงินไม่พอ";
            return;
        }
        const change = paid - totalAmount;
        cashModal.style.display = "none";
        saveSaleToHistory('cash', paid, change);
    } else {
        transferModal.style.display = "none";
        saveSaleToHistory('transfer', null, null);
    }

    cart.length = 0;
    renderCart();
}

function saveSaleToHistory(paymentMethod, paid, change) {
    const saleId = Date.now();
    const timestamp = new Date().toISOString();
    const saleData = {
        id: saleId,
        timestamp: timestamp,
        customerName: customerNameInput.value.trim(), // เก็บชื่อลูกค้า
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        paid: paymentMethod === 'cash' ? paid : null,
        change: paymentMethod === 'cash' ? change : null
    };

    let salesHistory = localStorage.getItem('salesHistory');
    if (salesHistory) {
        salesHistory = JSON.parse(salesHistory);
        salesHistory.push(saleData);
    } else {
        salesHistory = [saleData];
    }
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

    console.log("บันทึกรายการขาย ID:", saleId, "ชื่อลูกค้า:", customerNameInput.value.trim());

    customerNameInput.value = "";
}

if (window.location.pathname.includes("dashboard.html") || window.location.pathname === "/") {
    renderCategoryFilter();
    renderProducts();

    // เพิ่ม Event Listeners สำหรับเสียงในหน้า Dashboard
    const categoryFilterElement = document.getElementById('categoryFilter');
    if (categoryFilterElement) {
        categoryFilterElement.addEventListener('click', playClickSound);
    }

    const productListElement = document.getElementById('productList');
    if (productListElement) {
        productListElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }

    const cartArea = document.querySelector('.cart-area');
    if (cartArea) {
        cartArea.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }

    const paymentOptions = document.querySelector('.payment-options');
    if (paymentOptions) {
        const paymentButtons = paymentOptions.querySelectorAll('button');
        paymentButtons.forEach(button => {
            button.addEventListener('click', playClickSound);
        });
    }

    const productDetailModalElement = document.getElementById('productDetailModal');
    if (productDetailModalElement) {
        productDetailModalElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }

    const paymentModalElement = document.getElementById('paymentModal');
    if (paymentModalElement) {
        paymentModalElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }

    const cashModalElement = document.getElementById('cashModal');
    if (cashModalElement) {
        cashModalElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }

    const transferModalElement = document.getElementById('transferModal');
    if (transferModalElement) {
        transferModalElement.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                playClickSound();
            }
        });
    }
}
const productDetailDescription = document.getElementById("productDetailDescription");
const productDetailPrice = document.getElementById("productDetailPrice");
const productDetailOptions = document.getElementById("productDetailOptions");

const clickSound = new Audio('sounds/click.wav');

const cart = [];
let totalAmount = 0;
let customerName = "";
let selectedProductForCart = null; // เก็บสินค้าที่เลือกจาก Modal

searchInput.addEventListener("input", handleSearch);
categoryFilter.addEventListener("change", handleCategoryChange);

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase().trim();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm)
    );
    renderProducts(undefined, filteredProducts);
}

function handleCategoryChange() {
    playClickSound();
    renderProducts(categoryFilter.value);
}

function renderCategoryFilter() {
    categoryFilter.innerHTML = '<option value="ทั้งหมด">ทั้งหมด</option>';
    const categories = [...new Set(products.map(p => p.category))];
    categories.forEach(c => {
        const opt = document.createElement("option");
        opt.value = c;
        opt.textContent = c;
        categoryFilter.appendChild(opt);
    });
}

function renderProducts(category = "ทั้งหมด", productArray = products) {
    productList.innerHTML = "";
    const filtered = category === "ทั้งหมด" ? productArray : productArray.filter(p => p.category === category);
    filtered.forEach(product => {
        const div = document.createElement("div");
        div.className = "product";
        let optionsHtml = '';
        if (product.options && product.options.length > 0) {
            optionsHtml = '<select class="size-select">';
            product.options.forEach(option => {
                optionsHtml += `<option value="${option.size}" data-price="${option.price}">${option.size} - ${option.price.toFixed(2)} บาท</option>`;
            });
            optionsHtml += '</select>';
        }
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h4>${product.name}</h4>
            ${optionsHtml}
            <button onclick="showProductDetail(${product.id})">ดูรายละเอียด</button>`; // เปลี่ยนปุ่ม "เพิ่ม" เป็น "ดูรายละเอียด"
        productList.appendChild(div);
    });
}

function showProductDetail(productId) {
    playClickSound();
    const product = products.find(p => p.id === productId);
    if (product) {
        productDetailName.textContent = product.name;
        productDetailImage.src = product.image;
        productDetailDescription.textContent = product.description || 'ไม่มีรายละเอียด';
        productDetailPrice.textContent = `ราคา: ${product.price ? product.price.toFixed(2) : (product.options && product.options.length > 0 ? 'เลือกขนาด' : 'ไม่ระบุ')} บาท`;
        productDetailOptions.innerHTML = '';
        if (product.options && product.options.length > 0) {
            const select = document.createElement('select');
            select.className = 'size-select-detail';
            product.options.forEach(option => {
                const optionEl = document.createElement('option');
                optionEl.value = option.size;
                optionEl.textContent = `${option.size} - ${option.price.toFixed(2)} บาท`;
                select.appendChild(optionEl);
            });
            productDetailOptions.appendChild(select);
        }
        selectedProductForCart = product;
        productDetailModal.style.display = "flex";
    }
}

function closeProductDetailModal() {
    playClickSound();
    productDetailModal.style.display = "none";
    selectedProductForCart = null;
}

function addToCartFromDetail() {
    playClickSound();
    if (!selectedProductForCart) return;

    let selectedOption = null;
    const sizeSelect = productDetailOptions.querySelector('.size-select-detail');
    if (sizeSelect) {
        const selectedSize = sizeSelect.value;
        selectedOption = selectedProductForCart.options.find(option => option.size === selectedSize);
    }

    if (selectedOption) {
        const existingItem = cart.find(item => item.id === selectedProductForCart.id && item.selectedSize === selectedOption.size);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: selectedProductForCart.id,
                name: `${selectedProductForCart.name} (${selectedOption.size})`,
                price: selectedOption.price,
                quantity: 1,
                selectedSize: selectedOption.size
            });
        }
        renderCart();
        closeProductDetailModal();
    } else if (!selectedProductForCart.options || selectedProductForCart.options.length === 0) {
        const existingItem = cart.find(item => item.id === selectedProductForCart.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ ...selectedProductForCart, quantity: 1 });
        }
        renderCart();
        closeProductDetailModal();
    } else {
        alert("กรุณาเลือกขนาด");
    }
}

function removeFromCart(index) {
    playClickSound();
    cart.splice(index, 1);
    renderCart();
}

function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} x ${item.quantity} - ${ (item.price * item.quantity).toFixed(2)} บาท
            <button onclick="removeFromCart(${index})">ลบ</button>`;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });
    totalEl.textContent = total.toFixed(2);
    totalAmount = total;
}

function showPaymentModal() {
    playClickSound();
    if (cart.length === 0) {
        alert("ยังไม่มีสินค้าในตะกร้า");
        return;
    }
    paymentModal.style.display = "flex";
}

function closePaymentModal() {
    playClickSound();
    paymentModal.style.display = "none";
}

function checkout(method) {
    console.log("checkout called with method:", method);
    playClickSound();
    closePaymentModal();
    if (cart.length === 0) return;

    if (method === "cash") {
        cashInput.value = "";
        changeText.textContent = "";
        cashModal.style.display = "flex";
    } else if (method === "transfer") {
        transferModal.style.display = "flex";
    }
}

function closeCashModal() {
    playClickSound();
    cashModal.style.display = "none";
}

function closeTransferModal() {
    playClickSound();
    transferModal.style.display = "none";
}

function confirmPayment(cash) {
    console.log("confirmPayment called with cash:", cash);
    playClickSound();

    if (cash !== undefined && cash !== null) {
        const paid = parseFloat(cash);
        if (isNaN(paid) || paid < totalAmount) {
            changeText.textContent = "จำนวนเงินไม่พอ";
            return;
        }
        const change = paid - totalAmount;
        cashModal.style.display = "none";
        saveSaleToHistory('cash', paid, change);
    } else {
        transferModal.style.display = "none";
        saveSaleToHistory('transfer', null, null);
    }

    cart.length = 0;
    renderCart();
}

function saveSaleToHistory(paymentMethod, paid, change) {
    const saleId = Date.now();
    const timestamp = new Date().toISOString();
    const saleData = {
        id: saleId,
        timestamp: timestamp,
        customerName: customerNameInput.value.trim(), // เก็บชื่อลูกค้า
        items: cart.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })),
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
        paid: paymentMethod === 'cash' ? paid : null,
        change: paymentMethod === 'cash' ? change : null
    };

    let salesHistory = localStorage.getItem('salesHistory');
    if (salesHistory) {
        salesHistory = JSON.parse(salesHistory);
        salesHistory.push(saleData);
    } else {
        salesHistory = [saleData];
    }
    localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

    console.log("บันทึกรายการขาย ID:", saleId, "ชื่อลูกค้า:", customerNameInput.value.trim());

    customerNameInput.value = "";
}

if (window.location.pathname.includes("dashboard.html")) {
    renderCategoryFilter();
    renderProducts();
}
