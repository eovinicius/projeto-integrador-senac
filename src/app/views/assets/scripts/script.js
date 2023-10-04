function createUser() {
  let email = document.querySelector('#email').value;
  let password = document.querySelector('#password').value;

  const user = { email, password };

  fetch('http://localhost:3000/teacher/session', {
    method: 'POST',
    headers: new Headers({ 'content-Type': 'application/json' }),
    body: JSON.stringify(user),
  }).then((response) => {
    console.log(response);
  });

  document.querySelector('#email').value = '';
  document.querySelector('#password').value = '';

}
