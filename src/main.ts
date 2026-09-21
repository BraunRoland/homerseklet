import type { Idojaras } from './idojaras'
import './style.css'
let idojarasok: Idojaras[] = []

async function adatBeolvasas() {
  const response = await fetch('https://petrik-idojaras-default-rtdb.europe-west1.firebasedatabase.app/.json')
  if(!response.ok) {
    throw new Error('hiba')
  }
  else {
    const data = await response.json();
    data.forEach((element: Idojaras) => {
      idojarasok.push(element);
    });
  }
}

function kiiras(item: Idojaras) {
  const table = document.getElementById('kiiras') as HTMLTableElement;
    const row = document.createElement('tr') as HTMLTableRowElement;
    const day = document.createElement('td') as HTMLTableCellElement;
    const temp = document.createElement('td') as HTMLTableCellElement;
    day.innerText = item.day;
    temp.innerText = item.temperature.toLocaleString() + " °C";
    if (item.temperature >= 30) {
      temp.classList.add('piros');
      day.classList.add('piros');
    }
    else if(item.temperature < 10) {
      temp.classList.add('kek');
      day.classList.add('kek');
    } 
    row.appendChild(day);
    row.appendChild(temp);
    table.appendChild(row);
}

async function init() {
  idojarasok = [];
  await adatBeolvasas();
  const day = document.getElementById('day') as HTMLInputElement;
  switch(new Date().getDay()) {
    case(0):
    day.value = 'Sunday';
    break;
    case(1):
    day.value = 'Monday';
    break;
    case(2):
    day.value = 'Tuesday';
    break;
    case(3):
    day.value = 'Wednesday';
    break;
    case(4):
    day.value = 'Thursday';
    break;
    case(5):
    day.value = 'Friday';
    break;    
    case(6):
    day.value = 'Saturday';
    break;
  }
  idojarasok.forEach((item: Idojaras) => {
    kiiras(item);
  })
  console.log(idojarasok);
}

function ujAdat() {
  const tempF = document.getElementById('temp') as HTMLInputElement;
  const dayF = document.getElementById('day') as HTMLInputElement;
  idojarasok.push({day: dayF.value, temperature: parseInt(tempF.value)});
  kiiras(idojarasok[idojarasok.length-1]);
  tempF.value = "";
}

function toJSON(){
  const kiiras = document.getElementById('export') as HTMLTextAreaElement;
  kiiras.value = "";
  let string  =``;
  idojarasok.forEach((item: Idojaras) => {
    string += `{ "day":"${item.day}", "temperature":${item.temperature} }, \n`;
  });
  kiiras.value = string;
  kiiras.rows = idojarasok.length;
  kiiras.hidden = false;
}

document.getElementById('form')!.addEventListener('submit',e=> {
  e.preventDefault();
  ujAdat();
  const kiiras = document.getElementById('export') as HTMLTextAreaElement;
  if (!kiiras.hidden) {
    toJSON()
  }
})
document.getElementById('exportBtn')!.addEventListener('click',toJSON);
document.addEventListener('DOMContentLoaded', init)