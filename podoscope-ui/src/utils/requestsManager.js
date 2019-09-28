function genericPost(inObj, callback, onError, objFormat, endpoint) {

  let outObj = objFormat(inObj);

  fetch(endpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outObj)
  })
    .then((response) => {
      if (!response.ok) {
        console.log('ERROR could not make post request.');
        onError();
      }
    })
    .then(function () {
      callback();
    })
    .catch((error) => {
      console.log(error);
    });
}

function userFormat(user) {
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
  return userToSend;
}

function podoscopeFormat(inObj){
  let formatedOutput =  {

    user_id: inObj.user.cedula,

    img_id: inObj.imId,
    image: inObj.imgData.image,

    line_l: inObj.imgData.data.left.lineX,
    x_l: inObj.imgData.data.left.point.x,
    y_l: inObj.imgData.data.left.point.y,
    angle_l: inObj.imgData.extra.leftAngle,

    huella_l: inObj.feet.left.footprintType, 
    tipo_talon_l: inObj.feet.left.heelType,
    tipo_l: inObj.feet.left.footType,

    line_r: inObj.imgData.data.right.lineX,
    x_r: inObj.imgData.data.right.point.x,
    y_r: inObj.imgData.data.right.point.y,
    angle_r: inObj.imgData.extra.rightAngle,

    huella_r: inObj.feet.right.footprintType,
    tipo_talon_r: inObj.feet.right.heelType,
    tipo_r: inObj.feet.right.footType,

    obervaciones: inObj.observations.defaultValue,
    talla: inObj.shoeSize.defaultValue,
    free_draw: JSON.stringify(inObj.imgData.data.free.path)
  };
  return formatedOutput;
}

export function postUser(user, callback, onError) {

  genericPost(user,callback,onError,userFormat,'/users');

}

export function postPodImage(inObj, callback, onError) {

  genericPost(inObj,callback,onError,podoscopeFormat,'/podoscope');
}
