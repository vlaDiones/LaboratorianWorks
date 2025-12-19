// Завдання 5
const orders = [
    { 
        orderId: 101, 
        customer: { name: "Ivan", email: "ivan@test.com" }, 
        items: ["Keyboard", "Mouse"], 
        total: 1200 
    },
    { 
        orderId: 102, 
        customer: { name: "Olena", email: "olena@test.com" }, 
        items: ["Monitor"], 
        total: 5000 
    },
    { 
        orderId: 103, 
        customer: { name: "Ivan", email: "ivan@test.com" }, 
        items: ["USB Cable"], 
        total: 300 
    }
];

function getTotalSpentByCustomer(ordersArray, customerName) {
    return ordersArray
        
        .filter(order => order.customer.name === customerName)
        
        .reduce((sum, order) => sum + order.total, 0);
}

// Завдання 6
const products = [
    { productId: 1, name: "Кава", price: 150 },
    { productId: 2, name: "Чай", price: 80 },
    { productId: 3, name: "Сендвіч", price: 120 }
];

const purchases = [
    { purchaseId: 501, productId: 1, quantity: 2 },
    { purchaseId: 502, productId: 2, quantity: 3 }, 
    { purchaseId: 503, productId: 1, quantity: 1 }  
];

function getTotalSales(productsArr, purchasesArr) {
    return purchasesArr.reduce((acc, purchase) => {
 
        const product = productsArr.find(p => p.productId === purchase.productId);
        
        if (product) {
            const income = product.price * purchase.quantity;

            if (acc[product.name]) {
                acc[product.name] += income;
            } else {
                acc[product.name] = income;
            }
        }
        return acc;
    }, {});
}

document.addEventListener("DOMContentLoaded", () => {
  
    const ivanTotal = getTotalSpentByCustomer(orders, "Ivan");
    document.getElementById("task5-result").textContent = ivanTotal + " грн";

    // Вивід Завдання 6
    const salesReport = getTotalSales(products, purchases);
    document.getElementById("task6-result").textContent = JSON.stringify(salesReport, null, 4);
});