const users = [
    { username: "admin", password: "Bew102543!" }
];

const products = [
    {
        id: 1,
        name: "กิมซิ้น นาจา",
        category: "งานเรซิ่น",
        image: "images/resin1.jpg",
        options: [
            { size: "12 นิ้ว", price: 2000 },
            { size: "16 นิ้ว", price: 3000 },
        ]
    },
    {
        id: 2,
        name: "กิมซิ้น กวนอิมงานใหม่",
        category: "งานเรซิ่น",
        image: "images/resin2.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 5999 },
        ]
    },
    {
        id: 3,
        name: "เที้ยนส่งเซ่งโบ้ (天上聖母)",
        category: "งานไม้ไต้หวัน",
        image: "images/wood1.jpg", // อย่าลืมเพิ่มรูปภาพในโฟลเดอร์ images
        options: [
            { size: "12 นิ้ว", price: 18000 },
        ]
    },
    {
        id: 4,
        name: "เที้ยนส่งเซ่งโบ้ (天上聖母)",
        category: "งานเรซิ่น",
        image: "images/resin3.jpg",
        options: [
            { size: "12 นิ้ว", price: 2000 },
        ]
    },
    {
        id: 5,
        name: " กิ้วเทียนเอี่ยนลื้อ (九天玄女)",
        category: "งานเรซิ่น",
        image: "images/resin4.jpg",
        options: [
            { size: "12 นิ้ว", price: 2999 },
            { size: "16 นิ้ว", price: 3999 },
            { size: "19 นิ้ว", price: 4999 },
        ]
    },
      {
        id: 6,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีแดง",
        category: "งานเรซิ่น",
        image: "images/resin5.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 7,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีส้ม",
        category: "งานเรซิ่น",
        image: "images/resin6.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 8,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีน้ำเงิน",
        category: "งานเรซิ่น",
        image: "images/resin7.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 9,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีฟ้า",
        category: "งานเรซิ่น",
        image: "images/resin8.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 10,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีเขียว",
        category: "งานเรซิ่น",
        image: "images/resin9.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 11,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีเหลือง",
        category: "งานเรซิ่น",
        image: "images/resin10.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
      {
        id: 12,
        name: "เจ็ดนางฟ้า ชิดแช้เหนียวเหนียว สีม่วง",
        category: "งานเรซิ่น",
        image: "images/resin11.jpg",
        options: [
            { size: "12 นิ้ว", price: 3999 },
            { size: "16 นิ้ว", price: 4999 },
            { size: "19 นิ้ว", price: 7599 },
        ]
    },
    {
        id: 13,
        name: "เห้งเจีย ไต่เสี่ยฮุกโจว ",
        category: "งานเรซิ่น",
        image: "images/resin12.jpg",
        options: [
            { size: "12 นิ้ว", price: 1799 },
        ]
    },
      {
        id: 14,
        name: "หยกลื้อเหนียวเหนียว (玉女娘娘) ",
        category: "งานเรซิ่น",
        image: "images/resin14.jpg",
        options: [
            { size: "12 นิ้ว", price: 3599 },
        ]
    },
    {
        id: 15,
        name: "เซียนจ๋ายต่งจื้อ (善財童子)  ",
        category: "งานเรซิ่น",
        image: "images/resin15.jpg",
        options: [
            { size: "12 นิ้ว", price: 3599 },
        ]
    },
      {
        id: 16,
        name: "อ๋องโบ้เหนียวเหนียว (王母娘娘) ",
        category: "งานเรซิ่น",
        image: "images/resin17.jpg",
        options: [
            { size: "12 นิ้ว", price: 1799 },
        ]
    },
      {
        id: 18,
        name: "เจ็ดนางฟ้า ซาเเช้เหนียวเหนียว ",
        category: "งานเรซิ่น",
        image: "images/resin18.jpg",
        options: [
            { size: "12 นิ้ว", price: 4200 },
        ]
    },
      {
        id: 19,
        name: "กิ้วเทียนเอี่ยนลื้อ (九天玄女) ",
        category: "งานเรซิ่น",
        image: "images/resin19.jpg",
        options: [
            { size: "19 นิ้ว", price: 7500 },
        ]
    },
    {
        id: 20,
        name: "เซียนจ๋ายต่งจื้อ (善財童子) ",
        category: "งานเรซิ่น",
        image: "images/resin20.jpg",
        options: [
            { size: "12 นิ้ว", price: 3500 },
        ]
    },
    {
        id: 21,
        name: "หยกลื้อเหนียวเหนียว (玉女娘娘) ",
        category: "งานเรซิ่น",
        image: "images/resin21.jpg",
        options: [
            { size: "12 นิ้ว", price: 3500 },
        ]
    },
    {
        id: 22,
        name: "เทพเจ้า 3 ตา (เทพเอ้อหลาง) ",
        category: "งานเรซิ่น",
        image: "images/resin22.jpg",
        options: [
            { size: "12 นิ้ว", price: 1799 },
        ]
    },
    {
        id: 23,
        name: "นาจาปางสำเร็จ เง็กฮือจิงยิ้ง ",
        category: "งานเรซิ่น",
        image: "images/resin23.jpg",
        options: [
            { size: "19 นิ้ว", price: 7599 },
        ]
    }

    // ... สินค้าอื่นๆ ของคุณ
];
