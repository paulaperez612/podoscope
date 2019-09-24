export function postUser(user) {

  let userToSend = {
    first_name: user.firstName,
    second_name: user.secondName,
    first_surname: user.firstSurname,
    second_surname: user.secondSurname,
    cedula: user.cedula,
    email: user.email,
    gender: user.sex,
    dob: user.selectedDate,
    cellphone: user.phoneNumber
  };


  fetch('/users', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(userToSend)
  }).then(function (response) {
    console.log(response.json());
  });
}