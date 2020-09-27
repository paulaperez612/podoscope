export const baseUrl = 'http://podosys.piesalud.com';

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

function podoscopeFormat(inObj) {
  let formatedOutput = {

    imgFormat: {

      sid: localStorage.getItem('sid'),
      entryPoint: 'save_img',
      angulo_i: inObj.imgData.extra.leftAngle || '',
      angulo_d: inObj.imgData.extra.rightAngle || '',
      // save image id after @. Doesnt interfere with base64 encoding
      imagen: inObj.imgData.image + '@' + inObj.imId,
      u_x_d: inObj.imgData.data.right.lineX || '',
      u_x_i: inObj.imgData.data.left.lineX || '',
      x_i: inObj.imgData.data.left.point ? inObj.imgData.data.left.point.x : '',
      x_d: inObj.imgData.data.right.point ? inObj.imgData.data.right.point.x : '',
      y_i: inObj.imgData.data.left.point ? inObj.imgData.data.left.point.y : '',
      y_d: inObj.imgData.data.right.point ? inObj.imgData.data.right.point.y : '',
      efp_id: inObj.user.eid,
      traza: JSON.stringify(inObj.imgData.data.free.path)

    },

    examFormat: {

      entryPoint: 'save_efp',
      sid: localStorage.getItem('sid'),
      thi: inObj.feet.left.footprintType,
      thd: inObj.feet.right.footprintType,
      tpi: inObj.feet.left.footType,
      tpd: inObj.feet.right.footType,
      tti: inObj.feet.left.heelType,
      ttd: inObj.feet.right.heelType,
      obs: inObj.observations.defaultValue,
      tp: inObj.shoeSize,
      pid: inObj.user.pid

    }


  };
  return formatedOutput;
}

function genericPost(inObj, callback, onError, objFormat, endpoint) {
  let outObj = objFormat(inObj);

  fetch(endpoint, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(outObj)
  })
    .then(response => {
      if (!response.ok) {
        console.log('ERROR could not make post request.');
        onError();
      }
    })
    .then(() => callback())
    .catch(error => { onError(); console.log(error); });
}

export function genericGet(url, callback, onError, withSID = true) {
  let finalUrl = url;
  if (withSID) {
    const sid = localStorage.getItem('sid');
    finalUrl = `${url}&sid=${sid}`;
  }

  fetch(finalUrl, { method: 'GET' })
    .then(response => {
      if (!response.ok) {
        console.log('ERROR could not make get request.');
        onError();
      }
      return response.json();
    })
    .then(data => {
      if (data.rta === 'La sesion es invalida , por favor verificar credenciales') {
        onError({ type: 'session_expired', error: data.rta });
      } else {
        callback(data);
      }
    })
    .catch(error => {
      onError({ type: 'fetch', error });
    });
}

export function postUser(user, callback, onError) {
  genericPost(user, callback, onError, userFormat, '/users');
}

export function postPodImage(inObj, callback, onError) {
  // genericPost(inObj, callback, onError, podoscopeFormat, '/podoscope');

  let correctFormat = podoscopeFormat(inObj);

  //exam stuff
  genericPostUrlParams(baseUrl + '/index.php',
    correctFormat.examFormat,
    (data) => {
      console.log('Sucessfully updated exam');
      console.log(data);
      callback(data);
    },
    (e) => {
      onError(e);
    });

  //image stuff
  console.log(correctFormat.imgFormat.imagen);
  genericPostUrlParams(baseUrl + '/index.php',
    correctFormat.imgFormat,
    (data) => {
      console.log('Sucessfully saved image');
      console.log(data);
      callback(data);
    },
    (e) => {
      onError(e);
    });
}

export function genericPostUrlParams(baseUrl, inObj, callback, onError) {
  let completeUrl = baseUrl + '?';

  let first = true;
  for (const prop in inObj) {
    if (!first) {
      completeUrl += '&';
    }

    completeUrl += prop + '=' + inObj[prop];
    first = false;
  }

  // console.log('the complete post url:',completeUrl);

  fetch(completeUrl, {
    method: 'POST',
  })
    .then((response) => response.text())
    .then(data => {
      if (data.rta === 'La sesion es invalida , por favor verificar credenciales') {
        onError({ type: 'session_expired', error: data.rta });
      } else {
        callback(data);
      }
    })
    .catch((error) => {
      onError({ type: 'fetch', error });
    });

}