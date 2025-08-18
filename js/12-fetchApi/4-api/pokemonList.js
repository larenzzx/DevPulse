const container = document.querySelector(".container");
const input = document.getElementById("input");
let allPokemonData = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
  .then((res) => res.json())
  .then((data) => {
    const fetches = data.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );
    return Promise.all(fetches);
  })
  .then((pokemonDataList) => {
    allPokemonData = pokemonDataList;
    renderPokemon(allPokemonData);
  })
  .catch((error) => console.error("Cannot get pokemon data", error));

function renderPokemon(pokemonList) {
  container.innerHTML = "";
  if (pokemonList.length === 0) {
    container.innerHTML = "<p>No pokemon found</p>";
    return;
  }

  pokemonList.forEach((data) => {
    const name = data.name;
    const img = data.sprites.other.dream_world.front_default;
    const type = data.types.map((type) => type.type.name);
    const weight = data.weight;
    const height = data.height;
    const ability = data.abilities.map((a) => a.ability.name);

    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
                <img class="img" src="${img}" alt="${name}">
                <h3>${name}</h3>
                <p>Type: ${type}</p>
                <p>Weight: ${weight}</p>
                <p>Height: ${height}</p>
                <p>Abilities: ${ability}</p>
            `;
    container.appendChild(card);
  });
}

input.addEventListener("input", (e) => {
    const search = e.target.value.trim().toLowerCase();
    const filtered = allPokemonData.filter(pokemon => 
        pokemon.name.toLowerCase().includes(search)
    );
    renderPokemon(filtered)
})


// first step
// const container = document.querySelector(".container");

// fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
//     .then(res => res.json())
//     .then(data => {
//         const fetches = data.results.map(pokemon =>
//             fetch(pokemon.url).then(res => res.json())
//         );
//         return Promise.all(fetches);
//     })
//     .then(pokemonDataList => {
//         pokemonDataList.forEach(data => {
//             const name = data.name;
//             const img = data.sprites.other.dream_world.front_default;
//             const type = data.types.map(type => type.type.name);
//             const weight = data.weight;
//             const height = data.height;
//             const ability = data.abilities.map(a => a.ability.name);

//             const card = document.createElement("div");
//             card.classList.add("card");
//             card.innerHTML = `
//                 <img class="img" src="${img}" alt="${name}">
//                 <h3>${name}</h3>
//                 <p>Type: ${type}</p>
//                 <p>Weight: ${weight}</p>
//                 <p>Height: ${height}</p>
//                 <p>Abilities: ${ability}</p>
//             `
//             container.appendChild(card)
//         });
//     })
//     .catch(error => console.error("Cannot get pokemon data", error));