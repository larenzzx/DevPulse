const container = document.querySelector(".container");
const input = document.getElementById("input");

let allPokemonData = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=10&offset=0")
  .then((res) => res.json())
  .then((data) => {
    const pokemonData = data.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );
    return Promise.all(pokemonData);
  })
  .then((pokemonListData) => {
    allPokemonData = pokemonListData;
    renderPokemon(allPokemonData);
  });

function renderPokemon(pokemonList) {
  container.innerHTML = "";
  if (pokemonList.length === 0) {
    container.innerHTML = "<p>No pokemon found</p>";
    return; // much better to have this to stop the render here so it will not continue to the other code
  }
  pokemonList.forEach((data) => {
    const img = data.sprites.other.dream_world.front_default;
    const name = data.name;
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img class="img" src="${img}">
        <h3>${name}</h3>
      `;
    container.appendChild(card);
  });
}

input.addEventListener("input", (e) => {
  const search = e.target.value.trim().toLowerCase();
  const filtered = allPokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search)
  );
  renderPokemon(filtered);
});
