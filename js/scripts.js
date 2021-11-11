/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const cards = document.getElementsByClassName('card');

// fetch method to obtain 12 random users from randomuser.me API

fetch('https://randomuser.me/api/?results=12&nat=ca,us')
  .then(response => response.json())
  .then(data => {
    const userList = data.results;
    createCards(userList);
    // console.log(userList);
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
  let userModal = `
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
            <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
            <p class="modal-text">Birthday: 10/21/2015</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
  body.insertAdjacentHTML('beforeend', userModal);
}

function formatPhone(phone) {
  let phoneNumber = phone.replace(/[^\d]/g, "");
  return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
}
