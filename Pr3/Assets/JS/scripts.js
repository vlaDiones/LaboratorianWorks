
function displayResult(id, message) {
    document.getElementById(id).innerText = message;
}

// 1
let task1Date = new Date(2021, 1, 20, 3, 12);
displayResult('task1', task1Date.toLocaleString('uk-UA'));


// 2
function getWeekDay(date) {
    let days = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];
    return days[date.getDay()];
}
let date2 = new Date(2012, 0, 3); 
displayResult('task2', `Дата 03.01.2012 — це: ${getWeekDay(date2)}`);


// 3.1
function getLastDayOfMonth(year, month) {
    let date = new Date(year, month + 1, 0);
    return date.getDate();
}
let lastDay = getLastDayOfMonth(2020, 1); // Лютий 2020
displayResult('task3_1', `Останній день лютого 2020: ${lastDay}`);


// 3.2
function getSecondsToTomorrow() {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow - now;
    return Math.round(diff / 1000);
}
displayResult('task3_2', `До завтра залишилось: ${getSecondsToTomorrow()} сек.`);


// 4
function formatDate(date) {
    let diff = new Date() - date;

    // 1.
    if (diff < 1000) {
        return "прямо зараз";
    }

    // 2.
    let sec = Math.floor(diff / 1000);
    if (sec < 60) {
        return `${sec} сек. назад`;
    }

    // 3. 
    let min = Math.floor(diff / 60000);
    if (min < 60) {
        return `${min} хв. назад`;
    }

    // 4.
    let d = date;
    let components = [
        '0' + d.getDate(),
        '0' + (d.getMonth() + 1), 
        '' + d.getFullYear(),
        '0' + d.getHours(),
        '0' + d.getMinutes()
    ].map(component => component.slice(-2)); 

    return `${components[0]}.${components[1]}.${components[2]} ${components[3]}:${components[4]}`;
}

displayResult('task4_now', formatDate(new Date()));

displayResult('task4_sec', formatDate(new Date(new Date() - 30 * 1000)));

displayResult('task4_min', formatDate(new Date(new Date() - 5 * 60 * 1000)));

displayResult('task4_full', formatDate(new Date(2021, 11, 31, 10, 0))); 

function displayResult(id, message) {
    const el = document.getElementById(id);
    if (el) el.innerText = message;
}