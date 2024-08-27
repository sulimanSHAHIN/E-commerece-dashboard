console.log("DONE");
//this is for login.html
const registerForm = document.querySelector('.Confirm');

registerForm.addEventListener('click', (event) => {

event.preventDefault();
const email = document.querySelector('#Email').value;
const password = document.querySelector('#Password').value;

    const data = {
    email,
    password
    };
    fetch('http://127.0.0.1:8000/api/login', {
    method: 'POST',
    headers: {
        'Content-Type':'application/json'
        ,"Accept":'application/json'
    },
    body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
    console.log(data);
      // Handle the response from the API
    if (data.message=="successfuly login"&&email=="Admin@gmail.com") {
              // Save the token in local storage
              
    localStorage.setItem('token', data.token);
        // Redirect the user to the next page
        window.location.href = 'index.html';
    } else {
        // Handle any errors that occur during the API request
        // alert(data.message);
        swal(data.message)
        .then((value) => {
           
        });
    }
    })
    .catch(error => {
    console.error(error);
      // Handle any errors that occur during the API request
    });
}
);