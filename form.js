const modalWindow = document.getElementById('modal-container');
const modalButton = document.querySelector('.register');
const submitButton = document.getElementById('submit-btn');


function openModal() {
  modalWindow.style.display = 'block';
}


modalButton.addEventListener('click', openModal);


function closeModal() {
  modalWindow.style.display = 'none';
}


submitButton.addEventListener('click', closeModal);


window.addEventListener('click', function(event) {
  if (event.target === modalWindow) {
    closeModal();
  }
});



submitButton.addEventListener('click', (e) => {
    e.preventDefault();
    let firstName = document.getElementById('fname').value;
    let surName = document.getElementById('lname').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let legalAge = document.getElementById('agree').value;
    
//     let postObject = {
//         firstName: firstName,
//         lastName: surName,
//         email: email,
//         phone: phone,
//         legalAge:legalAge
//     }


//     submitRegistrationForm(postObject);
// })



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

console.log('formjs is here')