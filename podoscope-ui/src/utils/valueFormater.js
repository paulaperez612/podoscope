export function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [day, month, year].join('-');
}

export function formatSex(sex) {
  let ans = 'Other';
  switch (sex) {
    case 'MALE':
      ans = 'M';
      break;
    case 'FEMALE':
      ans = 'F';
      break;
  }
  return ans;
}