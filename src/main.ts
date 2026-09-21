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
    row.appendChild(day);
    row.appendChild(temp);
    table.appendChild(row);
  })
}

async function init() {
  idojarasok = [];
  await adatBeolvasas();
  kiiras();
  console.log(idojarasok);
}

document.addEventListener('DOMContentLoaded', init)