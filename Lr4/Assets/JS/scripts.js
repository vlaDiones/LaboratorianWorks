
let myComics = [
    { title: "Watchmen", author: "Alan Moore", publisher: "DC", year: 1986, inCollection: true },
    { title: "Batman: Year One", author: "Frank Miller", publisher: "DC", year: 1987, inCollection: false },
    { title: "The Sandman", author: "Neil Gaiman", publisher: "DC Vertigo", year: 1989, inCollection: true }
];

function displayComics(data = myComics) {
    const listDiv = document.getElementById('comics-list');
    listDiv.innerHTML = ""; 

    data.forEach(comic => {
        const card = document.createElement('div');
        card.className = `comic-card ${comic.inCollection ? 'in-collection' : ''}`;
        
        const statusText = comic.inCollection ? "✅ У колекції" : "⏳ У планах";

        card.innerHTML = `
            <h3>${comic.title} (${comic.year})</h3>
            <p><strong>Автор:</strong> ${comic.author} | <strong>Видавець:</strong> ${comic.publisher}</p>
            <p><em>Статус: ${statusText}</em></p>
        `;
        listDiv.appendChild(card);
    });

    calculateAverageYear();
}

function addComicToCollection() {
    let title = prompt("Введіть назву коміксу:");
    if (!title) return;

    let author = prompt("Введіть автора:");
    let publisher = prompt("Введіть видавництво:");
    let year = Number(prompt("Введіть рік випуску:"));
    let inCollection = confirm("Цей комікс уже є у вашій колекції?");

    myComics.push({ title, author, publisher, year, inCollection });
    displayComics();
}

function sortComics() {
    myComics.sort((a, b) => a.year - b.year);
    displayComics();
}

function showUncollected() {
    const uncollected = myComics.filter(c => !c.inCollection);
    displayComics(uncollected);
}

function calculateAverageYear() {
    if (myComics.length === 0) return;
    const total = myComics.reduce((sum, comic) => sum + comic.year, 0);
    const avg = Math.floor(total / myComics.length);
    document.getElementById('avg-year').innerText = `Середній рік випуску: ${avg}`;
}

displayComics();