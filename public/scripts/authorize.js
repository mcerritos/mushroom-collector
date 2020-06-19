console.log('Authorize JA is connected!');

// event listeners (modal + api calls)
let registerModalBtn = document.getElementById("displayRegister");
let loginModalBtn = document.getElementById("displayLogin");
let registerModal = document.getElementById("register");
let loginModal = document.getElementById("login");

registerModalBtn.addEventListener('click', openRegister);
loginModalBtn.addEventListener('click', openLogin);

const registerBtn = document.getElementById('registerButton');
const loginBtn = document.getElementById('loginButton');
const logoutBtn = document.getElementById('logoutButton');

registerBtn.addEventListener('click', register)
loginBtn.addEventListener('click', login)
logoutBtn.addEventListener('click', logout)

// modal functionality
function openRegister () {
  registerModal.style.display = "block";
}

function openLogin () {
  loginModal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
  else if (event.target == loginModal) {
  	loginModal.style.display = "none";
  }
}

// api calls
function register(event) {
	event.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;
	const email = document.getElementById('email').value;
	const userData = {
		username,
		email,
		password,
	};

	fetch('api/v1/register', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	})
	.then((stream) => stream.json())
	.then((res) => {
		if (res.status === 201) {
			console.log(res);
			window.location = '/';
		  } 
		else {
			console.log(res);
		  }
	})
	.catch((err) => console.log(err));
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('usernameLogin').value;
    const password = document.getElementById('passwordLogin').value;
  
    const userData = {
      username,
      password,
    };
    
    console.log('Submitting User Data ---->', userData);
  
    fetch('/api/v1/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'credentials': 'include', // This must be included in all API requests until user logs out
      },
      body: JSON.stringify(userData),
    })
      .then((stream) => stream.json())
      .then((res) => {
        if (res.status === 200) {
          window.location = '/';
        } else {
          console.log(res);
        }
      })
      .catch((err) => console.log(err));
  }

fetch('/api/v1/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', // This must be included in all API requests until user logs out
    },

  })
    .then((stream) => stream.json())
    .then(res=>getSession(res))
    .catch((err) => console.log(err));

function getSession(session){
	if(session.status===200){
	$('#login').empty();
	$('#login').html(`Hi ${session.currentUser.username} &nbsp <button id="logoutButton" class="btn btn-outline-primary btn-light" type="submit">Logout</button>`);
    }
    
	const btn = document.getElementById('logoutButton');
	btn.addEventListener('click', logout);
}

function logout(event){
	event.preventDefault();
	fetch('/api/v1/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', 
    },
  })
    .then((stream) => stream.json())
    .then((res) => {
      if (res.status === 200) {
        window.location = '/';
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}


