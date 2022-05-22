const weatherType = document.getElementsByClassName('weatherType');

const weatherCondition = weatherType[0].innerHTML;
const image = (weatherCondition.toLowerCase()).concat('.jpg');
console.log(image);

let body = document.getElementsByTagName('body')[0];
body.style.setProperty("background-image", `url('./../img/${image}')`);
body.style.setProperty("background-position", "center");
body.style.setProperty("background-repeat", "no-repeat");
body.style.setProperty("object-fit", "cover");