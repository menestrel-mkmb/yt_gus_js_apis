const characterId = document.getElementById("characterId");

const searchBtn = document.getElementById("btnSearch");
const clearBtn = document.getElementById("btnClear");

const content = document.getElementById("content");
const img = document.getElementById("img");

const filters = document.getElementsByClassName(".cbox__inp");

const baseUrlApi = "https://rickandmortyapi.com/api";
const endpointApi = {
    character: "/character/",
    episode: "/episode/",
};

const fetchApi = (value, endpoint) => {
    const result = fetch(baseUrlApi + endpoint + value)
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
                let arrayRes = result[elem.name].join(' ');
                arrayRes = arrayRes.replaceAll('https://rickandmortyapi.com/api/episode/','');
                const episodeTitle = document.createElement('p');
                episodeTitle.innerText = `${newKeys[elem.name]}:`;
                episodeTitle.className = `${elem.name}`;
                content.appendChild(episodeTitle);
                const newElem = document.createElement('textarea');
                newElem.rows = 5;
                newElem.disabled = true;
                newElem.textContent = `${arrayRes}`;
                content.appendChild(newElem);
            } else if(elem.checked && typeof(result[elem.name]) !== 'object') {
                const newElem = document.createElement('p');
                newElem.className = `${elem.name}`;
                newElem.innerHTML = `<b>${newKeys[elem.name]}</b>: ${result[elem.name]}`;
                content.appendChild(newElem);
            } else if(elem.checked && typeof(result[elem.name]) === 'object') {
                const newElem = document.createElement('p');
                newElem.className = `${elem.name}`;
                newElem.innerHTML = `<b>${newKeys[elem.name]}</b>: ${result[elem.name].name}`;
                content.appendChild(newElem);
            }
        });
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await fetchApi(characterId.value, endpointApi.character);
    buildResult(result);
    if(content.innerHTML == "") return content.innerHTML = "<p>Nenhum filtro selecionado</p>"

    img.src = `${result.image}`;
});

clearBtn.addEventListener("click", (e) => {
    location.reload();
})