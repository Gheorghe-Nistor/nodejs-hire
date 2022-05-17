function handleFormSubmit(e){
    const email = document.getElementById('email').value;
    if(! /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        e.preventDefault();
        alert("Invalid email adress!");
    }
}
function init(){
    const form = document.getElementById('postForm');
    form.addEventListener('submit', handleFormSubmit);
}

window.onload = init;