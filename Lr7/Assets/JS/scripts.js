// 0
const loader = document.getElementById('loader');
const resultDiv = document.getElementById('result');


function toggleLoader(show) {
    loader.style.display = show ? 'block' : 'none';
}

// 4 

function compareNumbers(num1, num2) {
    return new Promise((resolve, reject) => {
       
        setTimeout(() => {
            if (num1 > num2) {
                resolve("Перше число більше");
            } else if (num1 < num2) {
                resolve("Друге число більше");
            } else {
                reject("Числа рівні");
            }
        }, 1000);
    });
}

function runTask4() {
    resultDiv.innerHTML = ""; 
    toggleLoader(true);       

    compareNumbers(5, 3)
        .then((message) => {
            resultDiv.innerText = message;
        })
        .catch((error) => {
            resultDiv.innerText = "Помилка: " + error;
        })
        .finally(() => {
            toggleLoader(false);
        });
}

function runTask4Error() {
    resultDiv.innerHTML = "";
    toggleLoader(true);

    compareNumbers(5, 5)
        .then((message) => {
            resultDiv.innerText = message;
        })
        .catch((error) => {
            resultDiv.innerText = "Помилка: " + error;
        })
        .finally(() => {
            toggleLoader(false);
        });
}

// 5 
function runTask5() {
    resultDiv.innerHTML = "";
    toggleLoader(true);

    const createRandomPromise = (delay) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const randomNum = Math.floor(Math.random() * 10) + 1;
                console.log(`Проміс (${delay}с) повернув: ${randomNum}`);
                resolve(randomNum);
            }, delay * 1000);
        });
    };

    const promises = [
        createRandomPromise(1),
        createRandomPromise(2),
        createRandomPromise(3)
    ];

    Promise.all(promises)
        .then((values) => {
            const sum = values.reduce((acc, curr) => acc + curr, 0);
            resultDiv.innerHTML = `
                <strong>Отримані числа:</strong> [${values.join(', ')}]<br>
                <strong>Сума:</strong> ${sum}
            `;
        })
        .catch((err) => {
            resultDiv.innerText = "Сталася помилка в Promise.all";
        })
        .finally(() => {
            toggleLoader(false);
        });
}