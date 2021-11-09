/*
Treehouse Techdegree:
FSJS Project 5 - Public API Requests
*/

const gallery = document.getElementById('gallery');



let xhr = new XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const responseText = JSON.parse(xhr.responseText);
    const response = responseText.results;
    console.log(response);
    let randomUsers = ''
    gallery.innerHTML = '';
    for (let i = 0; i < response.length; i++) {
      randomUsers += `
      <div class="card">
          <div class="card-img-container">
              <img class="card-img" src="${response[i].picture.large}" alt="profile picture">
          </div>
          <div class="card-info-container">
              <h3 id="name" class="card-name cap">${response[i].name.first} ${response[i].name.last}</h3>
              <p class="card-text">${response[i].email}</p>
              <p class="card-text cap">${response[i].location.city}, ${response[i].location.state}</p>
          </div>
      </div>`
    }
    gallery.insertAdjacentHTML('beforeend', randomUsers);
  }
};

xhr.open('GET', 'https://randomuser.me/api/?results=12&nat=ca,us');
xhr.send();
