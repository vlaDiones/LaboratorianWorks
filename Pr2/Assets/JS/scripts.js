// --- ЗАВДАННЯ 1 та 2.1 ---

// 1
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function updateClock() {
    let now = new Date();
    let h = addZero(now.getHours());
    let m = addZero(now.getMinutes());
    let s = addZero(now.getSeconds());
    
    document.getElementById('chas').value = h + ":" + m + ":" + s;
    
    setTimeout(updateClock, 1000);
}

// 2
setTimeout(function() {
    alert("Пройшла ще одна хвилина!");
}, 60000);

updateClock();


// 3

function startTyping() {
    let text = document.getElementById('userInput').value;
    let display = document.getElementById('typewriterResult');
    display.innerHTML = ""; 
    let i = 0;

    if (!text) {
        text = "Будь ласка, введіть якийсь текст!";
    }

    let interval = setInterval(function() {
        display.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) {
            clearInterval(interval);
        }
    }, 100);
}


// 4

function placeBet() {
    let bet = parseFloat(document.getElementById('betAmount').value);
    let resultDisplay = document.getElementById('betResult');

    if (isNaN(bet) || bet <= 0) {
        alert("Введіть коректну суму ставки!");
        return;
    }

    resultDisplay.innerHTML = "Обробка результату...";


    setTimeout(function() {
        let randomNumber = Math.floor(Math.random() * 11) - 5;
        
        if (randomNumber <= 0) {
            resultDisplay.innerHTML = `Випало число ${randomNumber}. Ви не вгадали зі своєю ставкою.`;
            resultDisplay.style.color = "red";
        } else {
            let winAmount = bet * randomNumber;
            resultDisplay.innerHTML = `Випало число ${randomNumber}. Ви виграли ${winAmount} гривень!`;
            resultDisplay.style.color = "green";
        }
    }, 1000);
}