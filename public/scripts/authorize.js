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
		}
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


