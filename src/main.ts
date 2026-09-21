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

function kiiras() {
  const table = document.getElementById('kiiras') as HTMLTableElement;
  idojarasok.forEach((item:Idojaras) => {
    const row = document.createElement('tr') as HTMLTableRowElement;
    const day = document.createElement('td') as HTMLTableCellElement;
    const temp = document.createElement('td') as HTMLTableCellElement;
    day.innerText = item.day;
    temp.innerText = item.temperature.toLocaleString();
    if (item.temperature >= 30) {
      temp.classList.add('piros');
      day.classList.add('piros');
    }
    else if(item.temperature < 10) {
      temp.classList.add('kek');
      day.classList.add('kek')
    } 
    row.appendChild(day);
    row.appendChild(temp);
    table.appendChild(row);
  })
}

async function init() {
  idojarasok = [];
  await adatBeolvasas();
  kiiras();
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
  console.log(idojarasok);
}

function ujAdat() {

}

document.addEventListener('DOMContentLoaded', init)
document.getElementById('form')!.addEventListener('submit', ujAdat)