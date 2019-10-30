let str = "";

for (let i = 0; i < 8; i++) {
  str = '';
  for (let j = 0; j < 8; j++) {
    j % 2 ? str += '██' : str += '░░';
  }
  i % 2 ? console.log(str) : console.log(str.split('').reverse().join(''));
}
