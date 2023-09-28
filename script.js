const characterId = document.getElementById("characterId");

const searchBtn = document.getElementById("btnSearch");
const clearBtn = document.getElementById("btnClear");

const content = document.getElementById("content");
const img = document.getElementById("img");

const filters = document.getElementsByClassName(".cbox__inp");

const baseUrlApi = "https://rickandmortyapi.com/api";
const endpointApi = "/character/";

const fetchApi = (value) => {
    const result = fetch(baseUrlApi + endpointApi + value)
        .then((res) => res.json()).then((data) => data);
    return result;
}

const keys = ['name', 'status', 'species', 'gender',
                'origin', 'episode'];

const newKeys = {
    name: 'Nome',
    status: 'Estado',
    species: 'Espécie',
    gender: 'Gênero',
    origin: 'Planeta de origem',
    episode: 'Episódios',
};

const buildResult = (result) => {
    content.innerHTML = "";
    return keys.map( (key) => document.getElementById(key))
        .map((elem) => {
            if(elem.checked && Array.isArray(result[elem.name]) ){
                const arrayRes = result[elem.name].join('\r\n');
                const newElem = document.createElement('p');
                newElem.innerHTML = `<b>${newKeys[elem.name]}</b>:\r\n${arrayRes}`;
                content.appendChild(newElem);
            } else if(elem.checked && typeof(result[elem.name]) !== 'object') {
                const newElem = document.createElement('p');
                newElem.innerHTML = `<b>${newKeys[elem.name]}</b>: ${result[elem.name]}`;
                content.appendChild(newElem);
            } else if(elem.checked && typeof(result[elem.name]) === 'object') {
                const newElem = document.createElement('p');
                newElem.innerHTML = `<b>${newKeys[elem.name]}</b>: ${result[elem.name].name}`;
                content.appendChild(newElem);
            }
        });
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await fetchApi(characterId.value);
    buildResult(result);
    if(content.innerHTML == "") return content.innerHTML = "<p>Nenhum filtro selecionado</p>"

    img.src = `${result.image}`;
});

clearBtn.addEventListener("click", (e) => {
    location.reload();
})