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
    const newObject = {};
    keys.map( (key) => document.getElementById(key))
        .map((elem) => elem.checked
                && (newObject[elem.name] = result[elem.name]));
    return newObject;
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await fetchApi(characterId.value);
    content.textContent = `${JSON.stringify(buildResult(result), undefined, 2)}`;

    img.src = `${result.image}`;
});

clearBtn.addEventListener("click", (e) => {
    location.reload();
})