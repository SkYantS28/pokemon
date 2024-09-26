let currentPokemonId = 1; // Variável para manter o ID atual do Pokémon
const pokemonInput = document.getElementById("pokemon_input");
const urlBase = 'https://pokeapi.co/api/v2/pokemon/';
const body = document.body;

function fetchPokemon(pokemon) {
    const url = `${urlBase}${pokemon}`;
    fetch(url) //busca os dados do pokemon na API do pokemon;
    //* retorna uma promise;
        .then(response => { //then é usado para processae a resposta da requisição(request) fetch, se for bem sucedido, then sera executado;
            //requisição: digitou um pokemon e esta requerindo ele;
        //response é o objeto representando a resposta do servidor a requição;
            if (!response.ok) { //!==diferente, ou seja, caso não for bem sucedido;
                throw new Error("Pokémon não encontrado"); //mensagem de erro;
            }
            return response.json(); //converte a resposta da API (em json) para um objeto no js;
            //retorna outra promise, que sera resolvida com os dados do pokemon;
        })

        .then(data => { //lida com os dados convertidos da API;
        // data contem os detalhes (nome, id, peso, altura...)
            displayPokemonData(data);
        })
        .catch(error => {
            alert(error);
        }); // se houver algum erro durante a execução do codigo, vai aparecer uma caixa de alerta do com a mensagem do erro;
}

function displayPokemonData(data){
    const types = data.types.map(typeInfo => typeInfo.type.name);
    const pokemonInfo = //cria uma string em html para ser exibida na pagina;
    //nela, tem os dados do pokemon:
        `
        <h2>${data.name}</h2>
        <img src="${data.sprites.front_default}" alt="${data.name}">
        <p>ID: ${data.id}</p>
        <p>Altura: ${data.height / 10} m </p> 
        <p>Peso: ${data.weight / 10} kg</p>
        <p>Tipo(s): ${types.join(', ')}</p>
        `;
//${data.name}: nome do Pokémon;
//${data.sprites.front_default}: URL da imagem do Pokémon;
//${data.id}: ID do Pokémon;
//${data.height / 10}: Altura do Pokémon em metros;
//${data.weight / 10}: Peso do Pokémon em quilogramas;
// /10 p converter em m e kg
    document.getElementById("pokemon_info").innerHTML = pokemonInfo;
    currentPokemonId = data.id; // Atualiza o ID atual

    // Chama a função para mudar a cor do fundo
    changeBackgroundByType(data.types);
}

// Função para mudar o fundo conforme o tipo do Pokémon
function changeBackgroundByType(types) {
    const typeColors =  {
        fire: 'red',
        water: 'blue',
        grass: 'green',
        electric: 'yellow',
        poison: 'purple',
        bug: 'brown',
        flying: '#4843a8',
        ground: 'rgb(72, 14, 14)',
        fairy: 'pink',
        normal: 'rgb(151, 201, 255)',
        fighting: '#eaef49',
        psychic: 'orange',
        rock: 'gray',
        steel: 'gold',
        ice: 'aqua',
        ghost: 'rgb(107, 36, 193)',
    };

    console.log(`Tipos recebidos: ${types.map(t => t.type.name).join(', ')}`); // Log de tipos recebidos

    // Se o Pokémon tiver dois tipos
    if (types.length === 2) {
        const firstType = types[0].type.name;
        const secondType = types[1].type.name;

        // Define o fundo como uma divisão de 50% de cada cor
        body.style.background = `linear-gradient(to right, ${typeColors[firstType] || 'rgb(151, 201, 255)'} 50%, ${typeColors[secondType] || 'rgb(151, 201, 255)'} 50%)`;
    } else if (types.length === 1) {
        const primaryType = types[0].type.name;
        body.style.backgroundColor = typeColors[primaryType] || 'rgb(151, 201, 255)';
    } else {
        body.style.backgroundColor = 'rgb(151, 201, 255)';
    }
}

document.getElementById("botao_confirmacao").addEventListener("click", function(event) { //adiciona um evento click ao botao, quando clicado a fiinção dentro do addeventlistener é executada;
    event.preventDefault();  // evita que o formulário recarregue a página;
    const pokemon = document.getElementById("pokemon_input").value.toLowerCase(); //converte o valor para letras minusculas;
    fetchPokemon(pokemon);
});

document.getElementById("botao_avancar").addEventListener("click", function () {
    currentPokemonId++;
    fetchPokemon(currentPokemonId);
});

// Evento do botão de voltar
document.getElementById("botao_voltar").addEventListener("click", function () {
    if (currentPokemonId > 1) {
        currentPokemonId--;
        fetchPokemon(currentPokemonId);
    }
});