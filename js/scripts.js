/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

const gallery = document.getElementById('gallery');
const body = document.querySelector('body');
const cards = document.getElementsByClassName('card');


fetch('https://randomuser.me/api/?results=12&nat=ca,us')
  .then(response => response.json())
  .then(data => {
    const userList = data.results;
    createCards(userList);
  });


function createCards(data) {
     gallery.innerHTML = '';
     const randomUsers = data.map(item => `
       <div class="card">
           <div class="card-img-container">
               <img class="card-img" src="${item.picture.large}" alt="profile picture">
           </div>
           <div class="card-info-container">
               <h3 id="name" class="card-name cap">${item.name.first} ${item.name.last}</h3>
               <p class="card-text">${item.email}</p>
               <p class="card-text cap">${item.location.city}, ${item.location.state}</p>
           </div>
       </div>
       `).join('');
      gallery.insertAdjacentHTML('beforeend', randomUsers);
      for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', (e) => {
          console.log(e.target.parentNode);
        })
      }
}


// let xhr = new XMLHttpRequest();
//
// xhr.onreadystatechange = function () {
//   if (xhr.readyState === 4 && xhr.status === 200) {
//     const responseText = JSON.parse(xhr.responseText);
//     const response = responseText.results;
//     console.log(response);
//     let randomUsers = ''
//     let userModal = ''
//     gallery.innerHTML = '';
//     for (let i = 0; i < response.length; i++) {
//       randomUsers += `
//       <div class="card">
//           <div class="card-img-container">
//               <img class="card-img" src="${response[i].picture.large}" alt="profile picture">
//           </div>
//           <div class="card-info-container">
//               <h3 id="name" class="card-name cap">${response[i].name.first} ${response[i].name.last}</h3>
//               <p class="card-text">${response[i].email}</p>
//               <p class="card-text cap">${response[i].location.city}, ${response[i].location.state}</p>
//           </div>
//       </div>`;
//       userModal += `
//       <div class="modal-container">
//           <div class="modal">
//               <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
//               <div class="modal-info-container">
//                   <img class="modal-img" src="${response[i].picture.large}" alt="profile picture">
//                   <h3 id="name" class="modal-name cap">${response[i].name.first} ${response[i].name.last}</h3>
//                   <p class="modal-text">${response[i].email}</p>
//                   <p class="modal-text cap">${response[i].location.city}</p>
//                   <hr>
//                   <p class="modal-text">(555) 555-5555</p>
//                   <p class="modal-text">123 Portland Ave., Portland, OR 97204</p>
//                   <p class="modal-text">Birthday: 10/21/2015</p>
//               </div>
//           </div>`
//     }
//     gallery.insertAdjacentHTML('beforeend', randomUsers);
//     gallery.addEventListener('click', (e) => {
//         console.log(e.target);
//     });
//   }
// };
//
// xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=ca,us');
// xhr.send();
