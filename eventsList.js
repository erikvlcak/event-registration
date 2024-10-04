import './form'



export default class Event {
    constructor() {
        this.eventWindow = document.createElement('div');
        
    }

    constructEvent(eventData) {
        this.eventWindow.innerHTML = `
        <div class="event">
        <img src="${eventData.image_url}" alt="event image">
        <div class="event-details">
            <div class="name" >${eventData.name}</div>
            <div class="date" >${eventData.date}</div>
            <div class="desc" >${eventData.description}</div>
        </div>
        <button class="register" id='modal-btn'>Register</button>
</div>
        `;
        
        document.querySelector('#app').appendChild(this.eventWindow)
    }
    

}

function constructModal() {
    let modalWindow = document.createElement('div');
    modalWindow.innerHTML = `
    <div id="modal-container">
      <form id="registrationForm">
        <h1>Registration</h1><br>
        <label for="fname">Fisrt Name</label><br />
        <input
          type="text"
          id="fname"
          placeholder="Enter your firstname"
          required
        /><br />

        <label for="lname">Last Name</label><br />
        <input
          type="text"
          id="lname"
          placeholder="Enter your surname"
          required
        /><br />

        <label for="email">Email Address</label><br />
        <input type="email" id="email" name="email" /><br>

        <label for="phone">Phone Number</label><br />
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="123-45-678"
        /> <br/>
        <label for="legalAge"> I am old enough to participate</label>
        <input type="checkbox" id="agree" name="legalAge" value="legalAge" /><br/>

        <input id="submit-btn" type="button" value='Register me!' />
      </form>
    </div>`
    
    document.querySelector('body').appendChild(modalWindow);
    }

function displayEvent(eventData) {
    let newEvent = new Event();
    newEvent.constructEvent(eventData);
}

document.addEventListener('DOMContentLoaded', e => {

    fetchEvents().then(data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            displayEvent(data[i]);
        }
    }).then(() => constructModal()).then(() => document.querySelectorAll('.register').forEach(item => {
        item.addEventListener('click', () => {
            openModal();
            console.log('clicking register button')
        })
    })).then(() => document.querySelector('#submit-btn').addEventListener('click', (e) => {
    e.preventDefault();
    let firstName = document.getElementById('fname').value;
    let surName = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let legalAge = document.getElementById('agree').value;
    
    let postObject = {
        firstName: firstName,
        lastName: surName,
        email: email,
        phone: phone,
        legalAge:legalAge
    }


    submitRegistrationForm(postObject);
}))
})

const submitRegistrationForm = async(postObject) =>{
    const myResponse = await fetch(`https://test-api.codingbootcamp.cz/api/8dfe112d/events/1/registrations`, {
        "method": "POST",
        "body": JSON.stringify(postObject),
        "headers": {
            'Content-Type': 'application/json'
        }
    })
    const myUsableResponse = await myResponse.json()
    console.log(myUsableResponse)
}

async function fetchEvents() {
    let response = await fetch(`https://test-api.codingbootcamp.cz/api/8dfe112d/events`);
    let data = await response.json();
    return data;
}

document.addEventListener('keydown', (e) => {
    const key = e.key;
    if (key == 'Escape') {
        console.log(key)
        closeModal()
    }
})

function openModal() {
    document.querySelector('#modal-container').style.display = 'flex';
}
function closeModal() {
  document.querySelector('#modal-container').style.display = 'none';
}

