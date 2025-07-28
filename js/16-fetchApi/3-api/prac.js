const pokeImg = document.getElementById("pokeImg");
const pokeName = document.getElementById("pokeName");
const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const pokemonInput = input.value.trim().toLowerCase();
    if (pokemonInput) {
        getPokemon(pokemonInput);
    } else {
        alert("input pokemon");
    }
})

function getPokemon(name) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        // .then(res => res.json())
        .then(res => {
            if (!res.ok) {
                throw new Error("Pokemon not found");
            }
            res.json();
        })
        .then(data => {
            const img = data.sprites.other["official-artwork"].front_default;
            const name = data.name;
            pokeImg.src = img;
            pokeName.textContent = name;
        })
        .catch(error => {
            alert(error.message);
            console.error(error);
        })
}