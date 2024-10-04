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
        <button class="register">Register</button>
</div>
        `;
        document.querySelector('body').appendChild(this.eventWindow)
    }

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
    })

})

async function fetchEvents() {
    let response = await fetch(`https://test-api.codingbootcamp.cz/api/8dfe112d/events`);
    let data = await response.json();
    return data;
}