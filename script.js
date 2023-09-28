const characterId = document.getElementById("characterId");
const searchBtn = document.getElementById("btnSearch");
const content = document.getElementById("content");
const img = document.getElementById("img");

const baseUrlApi = "https://rickandmortyapi.com/api";
const endpointApi = "/character/";

const fetchApi = (value) => {
    const result = fetch(baseUrlApi + endpointApi + value)
        .then((res) => res.json()).then((data) => data);
    return result;
}

searchBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const result = await fetchApi(characterId.value);
    content.textContent = `${JSON.stringify(result, undefined, 2)}`;

    img.src = `${result.image}`;
})