
const allLinks = document.querySelectorAll('a');

const outputP = document.getElementById('active-text');

allLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        
        e.preventDefault();


        allLinks.forEach(item => item.classList.remove('active'));

     
        this.classList.add('active');

       
        outputP.textContent = this.textContent;
    });
});