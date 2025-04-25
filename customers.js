document.addEventListener('DOMContentLoaded', () => {
    loadCustomers();
    const addCustomerForm = document.getElementById('addCustomerForm');
    addCustomerForm.addEventListener('submit', handleAddEditCustomer);
    const searchInput = document.getElementById('customerSearch');
    searchInput.addEventListener('input', searchCustomers);
    const cancelEditButton = document.getElementById('cancelEdit');
    if (cancelEditButton) {
        cancelEditButton.addEventListener('click', resetEditMode);
    }
});

const clickSound = new Audio('sounds/click.wav');

let customers = localStorage.getItem('customers') ? JSON.parse(localStorage.getItem('customers')) : [];
let editingCustomerId = null;

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

function loadCustomers() {
    const customerListElement = document.getElementById('customerList');
    const emptyListMessage = document.getElementById('emptyCustomerList');
    customerListElement.innerHTML = '';

    if (customers.length === 0) {
        emptyListMessage.style.display = 'block';
    } else {
        emptyListMessage.style.display = 'none';
        displayCustomers(customers);
    }
}

function displayCustomers(customerArray) {
    const customerListElement = document.getElementById('customerList');
    customerArray.forEach(customer => {
        const row = customerListElement.insertRow();
        const idCell = row.insertCell();
        const nameCell = row.insertCell();
        const phoneCell = row.insertCell();
        const addressCell = row.insertCell();
        const actionsCell = row.insertCell();

        idCell.textContent = customer.customerId;
        nameCell.textContent = customer.customerName;
        phoneCell.textContent = customer.customerPhone || '-';
        addressCell.textContent = customer.customerAddress || '-';
        actionsCell.innerHTML = `
            <button onclick="startEditCustomer('${customer.customerId}')">แก้ไข</button>
            <button onclick="deleteCustomer('${customer.customerId}')">ลบ</button>
        `;
    });
}

function handleAddEditCustomer(event) {
    event.preventDefault();
    playClickSound();

    const customerIdInput = document.getElementById('customerId');
    const customerNameInput = document.getElementById('customerName');
    const customerPhoneInput = document.getElementById('customerPhone');
    const customerAddressInput = document.getElementById('customerAddress');
    const formFeedback = document.getElementById('formFeedback');

    if (!customerIdInput.value.trim()) {
        displayFormError('customerId', 'รหัสลูกค้าจำเป็นต้องมี');
        return;
    }
    clearFormError('customerId');

    if (!customerNameInput.value.trim()) {
        displayFormError('customerName', 'ชื่อลูกค้าจำเป็นต้องมี');
        return;
    }
    clearFormError('customerName');

    const customerData = {
        customerId: customerIdInput.value.trim(),
        customerName: customerNameInput.value.trim(),
        customerPhone: customerPhoneInput.value.trim(),
        customerAddress: customerAddressInput.value.trim()
    };

    if (editingCustomerId) {
        const index = customers.findIndex(c => c.customerId === editingCustomerId);
        if (index !== -1) {
            customers[index] = customerData;
            updateFormFeedback('แก้ไขลูกค้าสำเร็จ', 'success');
        }
        resetEditMode();
    } else {
        customers.push(customerData);
        updateFormFeedback('เพิ่มลูกค้าใหม่สำเร็จ', 'success');
        document.getElementById('addCustomerForm').reset();
    }

    localStorage.setItem('customers', JSON.stringify(customers));
    loadCustomers();
}

function startEditCustomer(customerId) {
    playClickSound();
    editingCustomerId = customerId;
    const customerToEdit = customers.find(c => c.customerId === customerId);
    if (customerToEdit) {
        document.getElementById('customerId').value = customerToEdit.customerId;
        document.getElementById('customerName').value = customerToEdit.customerName;
        document.getElementById('customerPhone').value = customerToEdit.customerPhone || '';
        document.getElementById('customerAddress').value = customerToEdit.customerAddress || '';
        document.querySelector('.add-customer-form h3').textContent = 'แก้ไขข้อมูลลูกค้า';
        document.getElementById('cancelEdit').style.display = 'inline-block';
    }
}

function resetEditMode() {
    editingCustomerId = null;
    document.querySelector('.add-customer-form h3').textContent = 'เพิ่มลูกค้าใหม่';
    document.getElementById('addCustomerForm').reset();
    document.getElementById('cancelEdit').style.display = 'none';
    clearFormErrors();
    clearFormFeedback();
}

function deleteCustomer(customerId) {
    playClickSound();
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลลูกค้า รหัส: ${customerId}?`)) {
        customers = customers.filter(customer => customer.customerId !== customerId);
        localStorage.setItem('customers', JSON.stringify(customers));
        loadCustomers();
        updateFormFeedback('ลบลูกค้าสำเร็จ', 'success');
    }
}

function searchCustomers(event) {
    playClickSound();
    const searchTerm = event.target.value.toLowerCase();
    const filteredCustomers = customers.filter(customer =>
        customer.customerId.toLowerCase().includes(searchTerm) ||
        customer.customerName.toLowerCase().includes(searchTerm) ||
        (customer.customerPhone && customer.customerPhone.toLowerCase().includes(searchTerm)) ||
        (customer.customerAddress && customer.customerAddress.toLowerCase().includes(searchTerm))
    );
    const customerListElement = document.getElementById('customerList');
    customerListElement.innerHTML = '';
    displayCustomers(filteredCustomers);
    if (filteredCustomers.length === 0) {
        document.getElementById('emptyCustomerList').style.display = 'block';
    } else {
        document.getElementById('emptyCustomerList').style.display = 'none';
    }
}

function displayFormError(fieldId, message) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFormError(fieldId) {
    const errorElement = document.getElementById(fieldId + 'Error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

function clearFormErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => msg.textContent = '');
}

function updateFormFeedback(message, type) {
    const feedbackElement = document.getElementById('formFeedback');
    feedbackElement.textContent = message;
    feedbackElement.className = 'feedback-message ' + type;
    feedbackElement.style.display = 'block';
    setTimeout(() => {
        feedbackElement.style.display = 'none';
    }, 3000); // Hide after 3 seconds
}

function clearFormFeedback() {
    const feedbackElement = document.getElementById('formFeedback');
    feedbackElement.style.display = 'none';
    feedbackElement.className = 'feedback-message';
    feedbackElement.textContent = '';
}