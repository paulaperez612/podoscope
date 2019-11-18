export function onlyText(value) {
  return /^[a-zñáéíóúü]+$/i.test(value);
}

export function onlyNumbers(value) {
  return /^[0-9]+$/i.test(value) && value.length >= 7;
}
