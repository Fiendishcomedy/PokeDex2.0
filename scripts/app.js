var pokemonRepository = (function () {
  var pokemonList = [];
  var apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }
  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listpokemon = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }
  //1.6 hw
  // function showDetails(pokemon){
  //   alert('Details of ' + pokemon.name + ' ' + pokemon.height + ' ' + pokemon.types)
  // }

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          var pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    var url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});




// pokemonRepository.getAll().forEach(function() {
//   var container = document.querySelector('.pokemon-list');
//   var listItem = document.createElement('li')
//   var button = document.createElement('button') ;
//   container.innerHTML = '<button>Click Me</button>';
//   console.log(container.innerHTML);
// });

// pokemonRepository.getAll().forEach(function(pokemon) {
//   document.write("<p>" + pokemon.name + ' is ' + pokemon.height + ' feet tall. And a ' + pokemon.types + ' type pokemon.' + "</p>");
// });

// 1.6 hw


// console.log(pokemonRepository.getAll());

// pokemonRepository.getAll().forEach(function (pokemon) {
//   pokemonRepository.addListItem(pokemon);
// });
// []
//   pokemonRepository.add({ name: 'Pikachu' });
//   console.log(pokemonRepository.getAll());
//pokemonRepository.add({ name: 'Pikachu' });


// pokemonRepository.add({
//   name: "Mewtwo",
//   height: 6.07,
//   types: ["psychic"],
// });

// pokemonRepository.add({
//   name: "Jigglypuff",
//   height: 1.08,
//   types: ["Fairy"],
// });

//1.5 hw
// var pokemonList = [
// {
// name: 'Bulbasaur',
// height:2.04,
// types:['grass', 'poison']
// },
// {
//     name:'Squirtle',
//     height:1.08,
//     types:['water']
// },
// {
//     name:'Charizard',
//     height:5.07,
//     types:['fire', 'flying']
// },
// {
//     name:'Pikachu',
//     height:1.04,
//     types:['Electric']
// },
// {
// name:'Haunter',
//     height:5.03,
//     types:['ghost', 'poison']
// }
// ];

//hw 1.2

// var pokemonList2 = [
//     {
//     name: 'Bulbasaur2',
//     height:2.04,
//     types:['grass', 'poison']
//     },
//     {
//         name:'Squirtle2',
//         height:1.08,
//         types:['water']
//     },
//     {
//         name:'Charizard2',
//         height:5.07,
//         types:['fire', 'flying']
//     },
//     {
//         name:'Pikachu2',
//         height:1.04,
//         types:['Electric']
//     },
//     {
//      name:'Haunter2',
//         height:5.03,
//         types:['ghost', 'poison']
//     }
//     ];

//hw 1.3

// function printArrayDetails(){
// for (var i = 0; i < pokemonList.length; i++){
//     document.write("<p>" + pokemonList[i].name + "</p>");
//     document.write("<p>" + pokemonList[i].height + "</p>");
//     document.write("<p>" + pokemonList[i].types + "</p>");

//   }
// };

// function printArrayDetails(){
//     for (var i = 0; i < pokemonList2.length; i++){
//         document.write("<p>" + pokemonList2[i].name + "</p>");
//         document.write("<p>" + pokemonList2[i].height + "</p>");
//         document.write("<p>" + pokemonList2[i].types + "</p>");

//       }
//     };
// printArrayDetails(pokemonList);
// printArrayDetails(pokemonList2);

//HW 1.4

//   pokemonList2.forEach(function(pokemon) {
//     document.write("<p>" + pokemon.name + ' is ' + pokemon.height + ' feet tall. And a ' + pokemon.types + ' type pokemon.' + "</p>");
//   });
