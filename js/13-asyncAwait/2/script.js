async function getPokemon() {
  try {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
    const pokemon = await res.json();

    const name = document.getElementById("name");
    name.textContent = pokemon.name;

    const img = document.getElementById("pic");
    img.src = pokemon.sprites.front_default;

    const types = document.getElementById("type");
    types.textContent = pokemon.types.map((type) => type.type.name);

    const stats = document.getElementById("stats");

    const hp = pokemon.stats[0].base_stat;
    const height = pokemon.height;
    const weight = pokemon.weight;

    const pokeStats = [
      { label: "HP:", value: hp },
      { label: "Height:", value: height },
      { label: "Weight:", value: weight },
    ];

    pokeStats.forEach((stat) => {
      const container = document.createElement("div");
      container.style.display = "flex";
      container.style.gap = "5px";
      const labels = document.createElement("p");
      labels.textContent = stat.label;

      const values = document.createElement("p");
      values.textContent = stat.value;

      container.append(labels, values);
      stats.appendChild(container);
    });
  } catch (error) {
    console.error("Cannot fetch pokemon" + error);
    alert("No pokemon found");
  }
}

// getPokemon();

async function getAllPokemon() {
  try {
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
    );
    const data = await res.json();
    const pokemonPromises = data.results.map(async (pokemon) => {
      const res = await fetch(pokemon.url);
      return res.json();
    });

    const allPokemonData = await Promise.all(pokemonPromises);
    allPokemonData.forEach(pokemon => {
        console.log(pokemon.name);
    })
  } catch (error) {
    console.error("Cannot fetch pokemon" + error);
    alert("No pokemon found");
  }
}

getAllPokemon();
