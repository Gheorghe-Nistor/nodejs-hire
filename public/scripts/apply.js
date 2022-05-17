function handleFormSubmit(e){
    const firstName   = document.getElementById('first_name').value;
    const lastName    = document.getElementById('last_name').value;
    const sex         = document.getElementById('sex').value;
    const birthDate   = document.getElementById('birth_date').value;
    const phoneNumber = document.getElementById('phone_number').value;
    const email       = document.getElementById('email').value;

    if(firstName == ' ' || lastName == ' ' || ! /^[a-zA-Z]+$/.test(firstName) || ! /^[a-zA-Z]+$/.test(lastName)){
        e.preventDefault();
        alert("Name must contain only letters!");
    }
    if(! /^\d{10}$/.test(phoneNumber)){
        e.preventDefault();
        alert("Invalid phone number!");
    }
    if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        e.preventDefault();
        alert("Invalid email adress!");
    }
    localStorage.setItem('firstName', firstName);
    localStorage.setItem('lastName',  lastName);
    localStorage.setItem('sex', sex);
    localStorage.setItem('birthDate', birthDate);
    localStorage.setItem('phoneNumber', phoneNumber);
    localStorage.setItem('email', email);
}
function handleSubmitButton(){
    var audio = new Audio('audio/error.mp3');
    if(Math.floor(Math.random()*2) == 0)
        audio.play();
}
function handleResetButton(){
    document.getElementById('applyForm').reset();
    localStorage.clear();
}
function init(){
    const form = document.getElementById('applyForm');
    const submitButton = document.getElementById('applyButton');
    const resetButton = document.getElementById('resetButton');
    form.addEventListener('submit', handleFormSubmit);
    submitButton.addEventListener('click', handleSubmitButton);
    resetButton.addEventListener('click', handleResetButton);

    document.getElementById('first_name').value   = localStorage.getItem('firstName');
    document.getElementById('last_name').value    = localStorage.getItem('lastName');
    document.getElementById('sex').value          = localStorage.getItem('sex');
    document.getElementById('birth_date').value   = localStorage.getItem('birthDate');
    document.getElementById('phone_number').value = localStorage.getItem('phoneNumber');
    document.getElementById('email').value        = localStorage.getItem('email');
}

window.onload = init;
