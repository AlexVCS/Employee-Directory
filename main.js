let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-text-container");
const modalClose = document.querySelector(".modal-close");
const searchField = document.querySelector(".searchField");

// fetch data from API
fetch(urlAPI)
    .then(res => res.json())
    .then(res => res.results)
    .then(displayEmployees)
    .catch(err => console.log(err))

function displayEmployees(employeeData) {
    employees = employeeData;

    // store the employee HTML as we create it
    let employeeHTML = '';
    
    // loop through each employee and create HTML markup
    employees.forEach((employee, index) => {
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

    employeeHTML += `
        <div class="card" data-index="${index}">
            <img class="avatar" src="${picture.large}" />
            <div class="text-container">
                <h2 class="name">${name.first} ${name.last}</h2>
                <p class="email">${email}</p>
                <p class="address">${city}</p>
            </div>
        </div>
    `
    });
    gridContainer.innerHTML = employeeHTML;

    // employee search function
    function search() {
        const names = document.querySelectorAll('.name');
        const employeeCards = document.querySelectorAll(".card");
        for (let i = 0; i < names.length; i++) {
          let name = names[i].textContent.toLowerCase();
          let filter = event.target.value;
          if (name.indexOf(filter) > -1) {
            employeeCards[i].style.display = "";
          } else {
            employeeCards[i].style.display = "none";
          }
        }
      }
      searchField.addEventListener('keyup', search);
}

function displayModal(index) {

    // use object destructuring to make the template literal easier to follow
    let { name, dob, phone, email, location: { city, street, state, postcode
    }, picture } = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
        <img class="avatar" src="${picture.large}" />
        <div class="arrow">
            <img src="icons8-left-24.png" alt="back-arrow"/>
        </div> <!-- closing tag for arrow -->
        <div class="arrowForward">
            <img src="icons8-right-24.png" alt="forward-arrow"/>
        </div> <!-- closing tag for arrowForward -->
        <div class="modal-text-container">
      
       
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email">${email}</p>
        <p class="address">${city}</p>
        <hr />
        <p>${phone}</p>
        <p class="address">${street.number} ${street.name}, ${state} ${postcode}</p>
        <p>Birthday: ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
}

gridContainer.addEventListener('click', e => {

    // make sure the click is not on gridContainer itself
    if (e.target !== gridContainer) {

        // select the card elemend based on its proximity to actual element clicked
        const card = e.target.closest(".card");
        const index = card.getAttribute('data-index');

        displayModal(index);
    }
});

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
});

// document.querySelector(".arrow").addEventListener('click');
// document.querySelector(".arrowForward").addEventListener('click',);

// enabling arrows on each side of the employee cards
// function nextCard(employee) {

// }