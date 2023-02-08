import './style.css';

const container = document.querySelector('#app');
const btn = document.querySelector('button');

const characterAnchor = document.querySelector('#characters')
const locationAnchor = document.querySelector('#locations')
const droidsAnchor = document.querySelector('#droids')

let dataList = [];

let page = 1;
let destination = 'characters';

// Pedir info a la api

const getData = async () => {
  const data = await fetch(
    `https://starwars-databank.vercel.app/${destination}?page=${page}&limit=10`
  );
  console.log('data:', data);
  const json = await data.json();
  console.log('json:', json);
  dataList = [...dataList, ...json[`${destination}`]]; // Hacemos destructuring de json para quedarnos con los datos que haya en destination y metemos dataList xq tb queremos los datos de ese array cuando los tenga
  console.log('dataList:', dataList);
  mapData(dataList);
};

// mapeamos para quedarnos con los elementos que queramos
// Podemos meter info si queremos creator

const mapData = (list) => {
  const mappedData = list.map((item) => ({
    name: item.name,
    description: item.description,
    image: item.image,
    creator: 'Carlos Romo',
  }));
  console.log(mappedData);
  printData(mappedData);
};

// Pintamos la info de la api

const printData = (list) => {
  container.innerHTML = ''; // Lo primero que hacemos es limpiarlo

  for (const item of list) {
    const figure = document.createElement('figure');
    figure.innerHTML = `
        <img src=${item.image} alt=${item.name} />
        <h1>${item.name}</h1>
        <div>
        <p>${item.description}</p>
        <p>Creator: ${item.creator}</p>
        </div>
    `;
    container.appendChild(figure);
  }
};

// Añadir un listener al boton para obtener su evento
btn.addEventListener('click', () => {
    page++
    getData()
} )

// Añadir listener para navegación y peticion interna

characterAnchor.addEventListener('click', () => {
    dataList = [];
    destination = 'characters'
    page = 1
    getData ()
})

// Añadir listener para navegación y peticion interna

locationAnchor.addEventListener('click', () => {
    dataList = [];
    destination = 'locations'
    page = 1
    getData ()
})

// Añadir listener para navegación y peticion interna

droidsAnchor.addEventListener('click', () => {
    dataList = [];
    destination = 'droids'
    page = 1
    getData ()
})

getData();
