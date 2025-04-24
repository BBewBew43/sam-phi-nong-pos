const reportTypeSelect = document.getElementById('reportType');
const dailyOptionsDiv = document.getElementById('dailyOptions');
const monthlyOptionsDiv = document.getElementById('monthlyOptions');
const dailyDateInput = document.getElementById('dailyDate');
const monthlyMonthSelect = document.getElementById('monthlyMonth');
const monthlyYearInput = document.getElementById('monthlyYear');
const reportAreaDiv = document.getElementById('reportArea');

let salesHistory = localStorage.getItem('salesHistory') ? JSON.parse(localStorage.getItem('salesHistory')) : [];

// แสดง/ซ่อน ตัวเลือกตามประเภทรายงาน
reportTypeSelect.addEventListener('change', function() {
    if (this.value === 'daily') {
        dailyOptionsDiv.style.display = 'block';
        monthlyOptionsDiv.style.display = 'none';
    } else if (this.value === 'monthly') {
        dailyOptionsDiv.style.display = 'none';
        monthlyOptionsDiv.style.display = 'block';
    }
});

function generateDailyReport() {
    const selectedDate = dailyDateInput.value;
    if (!selectedDate) {
        alert('กรุณาเลือกวันที่');
        return;
    }

    const dailySales = salesHistory.filter(sale => sale.timestamp.startsWith(selectedDate));

    displayReport(dailySales, `รายงานการขายประจำวันที่ ${formatDate(selectedDate)}`);
}

function generateMonthlyReport() {
    const selectedMonth = monthlyMonthSelect.value;
    const selectedYear = monthlyYearInput.value;

    const monthlySales = salesHistory.filter(sale => {
        const saleDate = new Date(sale.timestamp);
        return saleDate.getFullYear() === parseInt(selectedYear) && (saleDate.getMonth() + 1) === parseInt(selectedMonth);
    });

    displayReport(monthlySales, `รายงานการขายประจำเดือน ${getMonthName(selectedMonth)} ปี ${selectedYear}`);
}

function displayReport(salesData, reportTitle) {
    let reportHTML = `<h2>${reportTitle}</h2>`;

    if (salesData.length === 0) {
        reportHTML += '<p>ไม่มีรายการขายในช่วงนี้</p>';
    } else {
        reportHTML += '<table>';
        reportHTML += '<thead><tr><th>เลขอ้างอิง</th><th>วันที่/เวลา</th><th>ชื่อลูกค้า</th><th>สินค้า</th><th>จำนวน</th><th>รวม</th><th>วิธีชำระเงิน</th><th>รับเงิน</th><th>เงินทอน</th><th>การจัดการ</th></tr></thead>';
        reportHTML += '<tbody>';

        salesData.forEach(sale => {
            reportHTML += `<tr><td>${sale.id}</td><td>${formatDateTime(sale.timestamp)}</td><td>${sale.customerName || '-'}</td><td>`;
            sale.items.forEach(item => {
                reportHTML += `${item.name} (${item.quantity} x ${item.price.toFixed(2)} บาท)<br>`;
            });
            reportHTML += `</td><td>${sale.items.reduce((sum, item) => sum + item.quantity, 0)}</td><td>${sale.totalAmount.toFixed(2)}</td><td>${sale.paymentMethod}</td><td>${sale.paid ? sale.paid.toFixed(2) : '-'}</td><td>${sale.change ? sale.change.toFixed(2) : '-'}</td><td>`;
            reportHTML += `<button onclick="deleteSale(${sale.id})">ลบ</button>`;
            reportHTML += `<button onclick="printReceipt(${JSON.stringify(sale).replace(/"/g, '&quot;')})">พิมพ์</button>`;
            reportHTML += `</td></tr>`;
        });

        reportHTML += '</tbody></table>';

        const totalSales = salesData.reduce((sum, sale) => sum + sale.totalAmount, 0);
        reportHTML += `<p><strong>ยอดขายรวม: ${totalSales.toFixed(2)} บาท</strong></p>`;
    }

    reportAreaDiv.innerHTML = reportHTML;
}

function deleteSale(saleIdToDelete) {
    if (confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบรายการขาย ID: ${saleIdToDelete}?`)) {
        salesHistory = salesHistory.filter(sale => sale.id !== saleIdToDelete);
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
        const currentReportType = reportTypeSelect.value;
        if (currentReportType === 'daily') {
            generateDailyReport();
        } else if (currentReportType === 'monthly') {
            generateMonthlyReport();
        } else {
            displayReport(salesHistory, 'รายงานการขายทั้งหมด');
        }
    }
}

function printReceipt(saleData) {
    const printWindow = window.open('', '_blank');
    let receiptHTML = `
        <html>
        <head>
            <title>ใบเสร็จ</title>
            <style>
                body { font-family: sans-serif; font-size: 10pt; }
                .receipt-header { text-align: center; margin-bottom: 10px; }
                .receipt-details { margin-bottom: 10px; }
                .item-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
                .total { font-weight: bold; border-top: 1px dashed #000; padding-top: 5px; }
                .qr-code { text-align: center; margin-top: 20px; }
                .qr-code img { width: 100px; }
            </style>
        </head>
        <body>
            <div class="receipt-header">
                <h2>สามพี่น้อง กิมซิ้นศักดิ์สิทธิ์</h2>
                <p>โทร: 095-738-3575</p>
                <p>วันที่: ${formatDateTime(saleData.timestamp)}</p>
                <p>เลขอ้างอิง: ${saleData.id}</p>
                ${saleData.customerName ? `<p>ลูกค้า: ${saleData.customerName}</p>` : ''}
            </div>
            <div class="receipt-details">
                ${saleData.items.map(item => `
                    <div class="item-row">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)} บาท</span>
                    </div>
                `).join('')}
                <div class="total">
                    <span>รวมทั้งหมด:</span>
                    <span>${saleData.totalAmount.toFixed(2)} บาท</span>
                </div>
                ${saleData.paymentMethod === 'cash' ? `
                    <div>รับเงิน: ${saleData.paid ? saleData.paid.toFixed(2) : '-'} บาท</div>
                    <div>เงินทอน: ${saleData.change ? saleData.change.toFixed(2) : '-'} บาท</div>
                ` : `<p>ชำระโดย: ${saleData.paymentMethod}</p>
                    ${saleData.paymentMethod === 'transfer' ? `
                        <div class="qr-code">
                            <img src="images/QR.jpg" alt="QR Code">
                            <p>สแกนเพื่อชำระเงิน</p>
                        </div>
                    ` : ''}
                `}
            </div>
            <div style="text-align: center; margin-top: 20px;">
                <p>ขอบคุณที่อุดหนุน</p>
            </div>
        </body>
        </html>
    `;
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.print();
}

// ฟังก์ชัน Helper สำหรับ Format วันที่และเวลา
function formatDate(dateString) {
    const date = new Date(dateString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function formatDateTime(dateTimeString) {
    const date = new Date(dateTimeString);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.toLocaleTimeString()}`;
}

function getMonthName(monthNumber) {
    const months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
                    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"];
    return months[parseInt(monthNumber) - 1];
}

// โหลดรายงานเริ่มต้น (ถ้ามี)
document.addEventListener('DOMContentLoaded', () => {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('dailyDate').value = today;
    generateDailyReport(); // แสดงรายงานรายวันเริ่มต้น
});