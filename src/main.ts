import type { Idojaras } from './idojaras'
import './style.css'
const idojarasok: Idojaras[] = []

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

async function init() {
  await adatBeolvasas();
  console.log(idojarasok);
}

document.addEventListener('DOMContentLoaded', init)