/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const cards = document.getElementsByClassName('card');
const search = document.querySelector('.search-container');


// fetch method to obtain 12 random users from randomuser.me API

fetch('https://randomuser.me/api/?results=12&nat=ca,us')
  .then(response => response.json())
  .then(data => {
    const userList = data.results;
    createCards(userList);
    createSearch(userList);
  });

// function to create cards from random users and display them to the page

function createCards(data) {
   gallery.innerHTML = '';
   let randomUsers = '';
   for (let i = 0; i < data.length; i++) {
   randomUsers += `
     <div id="${i}" class="card">
         <div class="card-img-container">
             <img class="card-img" src="${data[i].picture.large}" alt="profile picture">
         </div>
         <div class="card-info-container">
             <h3 id="name" class="card-name cap">${data[i].name.first} ${data[i].name.last}</h3>
             <p class="card-text">${data[i].email}</p>
             <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
         </div>
     </div>
     `};
    gallery.insertAdjacentHTML('beforeend', randomUsers);
    for (let i = 0; i < cards.length; i++) {
      cards[i].addEventListener('click', (e) => {
        let userIndex = e.target.closest('.card').id;
        createModal(data, userIndex);
      })
    }
}

// function to create a modal based on the selected user

function createModal(list, index) {
  const phone = formatPhone(list[index].phone);
  const birthday = formatBday(list[index].dob.date);
  const address = list[index].location;
  const userModal = `
    <div class="modal-container">
      <div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${list[index].picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${list[index].name.first} ${list[index].name.last}</h3>
            <p class="modal-text">${list[index].email}</p>
            <p class="modal-text cap">${list[index].location.city}</p>
            <hr>
            <p class="modal-text">${phone}</p>
            <p class="modal-text">${address.street.number} ${address.street.name}, ${address.city}, ${address.state} ${address.postcode}</p>
            <p class="modal-text">Birthday: ${birthday}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
  body.insertAdjacentHTML('beforeend', userModal);

  const modalBtns = body.querySelectorAll('button');
  modalBtns[0].addEventListener('click', (e) => {
    body.removeChild(body.lastElementChild);
  });
  modalBtns[1].addEventListener('click', (e) => {
    if (index > 0) {
      body.removeChild(body.lastElementChild);
      index = index - 1;
      createModal(list, index);
    }
  });
  modalBtns[2].addEventListener('click', (e) => {
    const endIndex = list.length - 1;
    if (index < endIndex) {
      body.removeChild(body.lastElementChild);
      index++;
      createModal(list, index);
    }
  });
}

// function to format the phone number to (***) ***-****

function formatPhone(phone) {
  let phoneNumber = phone.replace(/[^\d]/g, "");
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}

// function to format birthday to MM/DD/YYYY

function formatBday(dob) {
  let birthday = dob.replace(/[^\d]/g, "");
  return birthday.replace(/(\d{4})(\d{2})(\d{2})(\d{9})/, "$2\/$3\/$1");
}

// function to add search bar to filter user list based on search input

function createSearch(list) {
  search.innerHTML = '';
  const searchBar = `
    <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>
    `;
  search.insertAdjacentHTML('beforeend', searchBar);
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    let matchedNames = [];
    if (searchInput.value.length != 0) {
      for (let i = 0; i < list.length; i++) {
          if (list[i].name.first.toLowerCase().includes(searchInput.value.toLowerCase()) ||
            list[i].name.last.toLowerCase().includes(searchInput.value.toLowerCase())) {
              matchedNames.push(list[i]);
        }
      }
      createCards(matchedNames);
    } else {
      createCards(list);
    }
  });
}
