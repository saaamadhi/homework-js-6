let unitsArr = [{
    label: 'C',
    value: 'metric',
}, {
    label: 'F',
    value: 'imperial',
}];

let searchOptionsArr = ['Coords', 'Name', 'Id'];

let searchselect = document.getElementById('select-search');
let unitselect = document.getElementById('select-units');

function setSearchOptions(array) {
    array.forEach(search => {
        let newoption = document.createElement('option');
        newoption.innerHTML = search;
        searchselect.appendChild(newoption);
    });
}
setSearchOptions(searchOptionsArr); 

function setUnits(array) {
    array.forEach(units => {
        let newoption = document.createElement('option');
        newoption.innerHTML = units.label;
        newoption.value = units.value;
        unitselect.appendChild(newoption);
    });
}
setUnits(unitsArr);

let inputInfo = document.querySelector('input');

let weatherBtn = document.querySelector('.btn');

let output = document.querySelector('.output');

weatherBtn.addEventListener('click', async function getWeather(searchselectValue, unitselectValue) {
    let url;
    let tempValue;
    searchselectValue = searchselect.value;
    unitselectValue = unitselect.value;

    switch(searchselectValue) {
        case 'Coords': url = 'http://api.openweathermap.org/data/2.5/weather?lat=40.71&lon=-74.01&units='+unitselectValue+'&APPID=1b42211d0884924c9d39f6bb5aa4abcb';
        break;
        case 'Name': url = 'http://api.openweathermap.org/data/2.5/weather?q='+inputInfo.value+'&units='+unitselectValue+'&APPID=1b42211d0884924c9d39f6bb5aa4abcb';
        break;
        case 'Id': url = 'http://api.openweathermap.org/data/2.5/weather?id=5128581&units='+unitselectValue+'&APPID=1b42211d0884924c9d39f6bb5aa4abcb';
        break;
    }
    let response = await fetch(url);
    if(response.ok){
        let result = await response.json();
        let cityName = result['name'];
        let tempValue = result['main']['temp'];

        output.innerHTML = `Today's Temperature for ${cityName} is ${tempValue}`; 
        console.log(result);
    } else {
        alert("Error! City not found!");
    }
})


