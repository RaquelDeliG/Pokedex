const pokedex = document.getElementById('pokedex');
const pokemons = [];

const urlApi = async () => {
     const url= ("https://pokeapi.co/api/v2/pokemon?limit=150")
     const res = await fetch(url);
     const data = await res.json();
     const pokemon = data.results.map((result, index) => {
         const paddedIndex = ('00' + (index + 1)).slice(-3);
         const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
         return {
             ...result,
             id: index + 1,
             paddedIndex: paddedIndex,
             image: image,
         };
     });
     drawPokemon(pokemon);
    };

const drawPokemon = (pokemon) => {
	const pokemonHTMLString = pokemon
		.map(
			(pokeman) =>
				`
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
    </li>
    `
		)
		.join('');
	pokedex.innerHTML = pokemonHTMLString;
};
const selectPokemon = async (id) => {
	if (!pokemons[id]) {
		const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const pokeman = await res.json();
		pokemons[id] = pokeman;
	} else {
		popUp(pokemons[id]);
	}
};
const popUp = (pokeman) => {
	const type = pokeman.types.map((type) => type.type.name).join(', ');
	const paddedIndex = ('00' + pokeman.id).slice(-3);
	const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
	const htmlString = `
	<div class="popup">
		<button id="closeBtn" onclick="closePopup()
		">Close</button>
		<div class="card">
        	<img class="card-image" src="${image}"/>
        	<h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
			<p> <small>Type: </small>${type}</p>
            </div>
	</div>`;
	pokedex.innerHTML = htmlString + pokedex.innerHTML;
	console.log(htmlString);
};
const closePopup = () => {
	const popup = document.querySelector('.popup');
	popup.parentElement.removeChild(popup);
};
urlApi();



