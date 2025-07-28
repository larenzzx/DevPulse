const pokeImg = document.getElementById("pokeImg");
const pokeName = document.getElementById("pokeName");
const pokeHeight = document.getElementById("pokeHeight");
const pokeWeight = document.getElementById("pokeWeight");
const pokeType = document.getElementById("pokeType");
const pokeHp = document.getElementById("pokeHp");
const pokeAttack = document.getElementById("pokeAttack");
const pokeDefense = document.getElementById("pokeDefense");
const pokeSpeed = document.getElementById("pokeSpeed");
const pokeAbilities = document.getElementById("pokeAbilities");
const pokeMoves = document.getElementById("pokeMoves");


fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    .then((res) => res.json())
    .then((data) => {
        const name = data.name;
        const weight = data.weight;
        const height = data.height;
        const type = data.types[0].type.name;
        const stats = data.stats.map(stat => ({
            name: stat.stat.name,
            value: stat.base_stat
        }));
        const hp = data.stats[0].base_stat;
        const attack = data.stats[1].base_stat;
        const defense = data.stats[2].base_stat;
        const specialAttack = data.stats[3].base_stat;
        const specialDefense = data.stats[4].base_stat;
        const speed = data.stats[5].base_stat;
        const abilities = data.abilities.map(a => a.ability.name);
        // const pokeStats = JSON.stringify(stats);
        // const moves = data.moves.map(m => m.move.name);
        const limitedMoves = data.moves.slice(0, 4).map(move => move.move.name);
        const sprites = data.sprites.front_default;
        const spritesDreamWorld = data.sprites.other.dream_world.front_default;
        const spritesArtwork = data.sprites.other["official-artwork"].front_default;


        pokeImg.src = spritesDreamWorld;
        pokeName.textContent = name;
        pokeWeight.textContent = `Weight: ${weight}`;
        pokeHeight.textContent = `Height: ${height}`;
        pokeType.textContent = `Type: ${type}`;
        pokeHp.textContent = `Hp: ${hp}`;
        pokeAttack.textContent = `Attack: ${attack}`;
        pokeDefense.textContent = `Defense: ${defense}`;
        pokeSpeed.textContent = `Speed: ${speed}`;
        pokeAbilities.textContent = `Abilities: ${abilities}`;
        pokeMoves.textContent = `Moves: ${limitedMoves}`;

        

        console.log("Basic Sprite:", sprites);
        console.log("Dream World:", spritesDreamWorld);
        console.log("Offical-Artwork:", spritesArtwork)
        console.log(`Name: ${name}`);
        console.log(`Height: ${height}`);
        console.log(`Weight: ${weight}`);
        console.log(`Type: ${type}`);
        console.log(`Hp: ${hp}`);
        console.log(`Attack: ${attack}`);
        console.log(`Defense: ${defense}`);
        console.log(`Special-Attack: ${specialAttack}`);
        console.log(`Special-Defense: ${specialDefense}`);
        console.log(`Speed: ${speed}`);
        console.log(`Abilities: ${abilities}`);
        // console.log(`Stats: ${pokeStats}`);
        console.log(`Moves: ${limitedMoves}`);
    })
    .catch((error) => console.error(error));