const signupButton = document.querySelector('.signupButton');
const loginButton = document.querySelector('.loginButton');

const loginFormHandler = async (event) => {
    event.preventDefault();
    try {

    const username = document.getElementById('username-login').value.trim();
    const password = document.getElementById('password-login').value.trim();
    
    console.log({ username: username, password: password }); //remove after testing
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            console.log({ response, username, password });
        } else {
            alert(response.statusText);
            console.log(response);
        }
    }

    } catch (err) {
        console.error(err);
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    try {
    const username =  document.getElementById('username-signup').value.trim();
    const email =  document.getElementById('email-signup').value.trim();
    const password =  document.getElementById('password-signup').value.trim();

    if (username && email && password) {

        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' }, 
        });

        if (response.ok) {
            console.log({ response, username, password });
        } else {
            alert(response.statusText);
        }
    }

    } catch (err) {
        console.error(err);
    }
};

signupButton.addEventListener('click', signupFormHandler);
loginButton.addEventListener('click', loginFormHandler);