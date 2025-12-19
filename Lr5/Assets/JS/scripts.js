//  1. 
const fIn = document.getElementById('f_input');
const cIn = document.getElementById('c_input');

fIn.oninput = () => {
    if (fIn.value) cIn.value = ((fIn.value - 32) * 5/9).toFixed(1);
};
cIn.oninput = () => {
    if (cIn.value) fIn.value = (cIn.value * 9/5 + 32).toFixed(1);
};

// 2 & 3.
let right = 0, total = 0, currentCorrect = 0;

function nextMath() {
    let a = Math.floor(Math.random() * 9) + 1;
    let b = Math.floor(Math.random() * 9) + 1;
    currentCorrect = a * b;
    document.getElementById('math_quest').innerText = `${a} x ${b} = `;
    document.getElementById('math_res').innerText = "";
    document.getElementById('user_ans').value = "";
}

document.getElementById('btn_check').onclick = () => {
    let val = parseInt(document.getElementById('user_ans').value);
    total++;
    if (val === currentCorrect) {
        right++;
        document.getElementById('math_res').innerText = "Правильно!";
        document.getElementById('math_res').style.color = "green";
    } else {
        document.getElementById('math_res').innerText = `Помилка, правильна відповідь «${currentCorrect}»`;
        document.getElementById('math_res').style.color = "red";
    }
    let perc = Math.round((right / total) * 100);
    document.getElementById('score').innerText = `Загальний рахунок ${perc}% (${right} правильних відповідей з ${total})`;
};
document.getElementById('btn_next').onclick = nextMath;
nextMath();

//4. 
let imagesArray = [
    {path: 'https://via.placeholder.com/300x200?text=iPhone+15', title: 'iPhone 15', description: 'Базова модель на iOS.'},
    {path: 'https://via.placeholder.com/300x200?text=Pixel+8', title: 'Google Pixel 8', description: 'Чистий Android та крута камера.'},
    {path: 'https://via.placeholder.com/300x200?text=S24+Ultra', title: 'Samsung S24 Ultra', description: 'Флагман зі стілусом.'}
];

function initPhotoRotator(divId, images) {
    let root = document.getElementById(divId);
    let idx = 0;

    function render() {
        root.innerHTML = "";
        let ui = document.createElement('div'); ui.className = 'rotator-ui';

        let back = document.createElement('span'); back.className = 'nav-link'; back.innerText = "Назад";
        if (idx === 0) back.style.visibility = "hidden";
        back.onclick = () => { idx--; render(); };

        let main = document.createElement('div'); main.className = 'rotator-main';
        let counter = document.createElement('p'); counter.innerText = `Фотографія ${idx+1} з ${images.length}`;
        let img = document.createElement('img'); img.src = images[idx].path;
        let t = document.createElement('h4'); t.innerText = images[idx].title;
        let d = document.createElement('p'); d.innerText = images[idx].description;
        main.append(counter, img, t, d);

        let next = document.createElement('span'); next.className = 'nav-link'; next.innerText = "Вперед";
        if (idx === images.length - 1) next.style.visibility = "hidden";
        next.onclick = () => { idx++; render(); };

        ui.append(back, main, next);
        root.append(ui);
    }
    render();
}
initPhotoRotator('rotator', imagesArray);

// --- 5. Капча ---
const digits = {
    '3': [1,1,1, 0,0,1, 1,1,1, 0,0,1, 1,1,1],
    '7': [1,1,1, 0,0,1, 0,1,0, 0,1,0, 0,1,0],
    '1': [0,1,0, 1,1,0, 0,1,0, 0,1,0, 1,1,1]
};

function initCaptcha(len) {
    let box = document.getElementById('captcha_box');
    let code = "";
    box.innerHTML = "";

    for(let i=0; i<len; i++) {
        let d = ['1','3','7'][Math.floor(Math.random()*3)];
        code += d;
        let grid = document.createElement('div'); grid.className = 'digit-grid';
        digits[d].forEach(pOn => {
            let p = document.createElement('span');
            p.className = 'p' + (pOn ? ' on' : '');
            grid.appendChild(p);
        });
        box.appendChild(grid);
    }

    document.getElementById('captcha_input').oninput = (e) => {
        let msg = document.getElementById('captcha_msg');
        if (e.target.value === code) {
            msg.innerText = "Успішно"; msg.style.color = "green";
        } else {
            msg.innerText = "Помилка"; msg.style.color = "red";
        }
    };
}
initCaptcha(2);