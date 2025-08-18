const form = document.getElementById("searchForm");
const input = document.getElementById("searchInput");
const pokeImg = document.getElementById("pokeImg");
const pokeName = document.getElementById("pokeName");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const pokemonName = input.value.trim().toLowerCase();
  if (pokemonName) {
    getPokemon(pokemonName);
  } else {
    alert("Please input a Pokemon");
  }
});

function getPokemon(name) {
  fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error("Pokemon not found");
      }
      return res.json();
    })
    .then((data) => {
      const name = data.name;
      const img = data.sprites.other.dream_world.front_default;
      console.log(name);

      pokeImg.src = img;
      pokeName.textContent = name;
    })
    .catch((error) => {
      console.error("Not found", error);
      alert("Pokemon not found")
    });
}
