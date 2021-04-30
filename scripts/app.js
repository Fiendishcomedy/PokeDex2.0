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
      showModal(pokemon.name, pokemon.types);
      //find the correct details for the pokemon.
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

  // 1.8 hw add in the JS to the modals
  // function showModal() {
  //   var modalContainer = document.querySelector("#modal-container");
  //   modalContainer.classList.add("is-visible");
  // }

  // document.querySelector("#show-modal").addEventListener("click", () => {
  //   showModal();
  // });

  // return new Promise((resolve, reject) => {
  //   cancelButton.addEventListener('click', hideModal);
  //   confirmButton.addEventListener('click', () => {
  //     dialogPromiseReject = null; // Reset this
  //     hideModal();
  //     resolve();
  //   });

  // This can be used to reject from other functions
  //   dialogPromiseReject = reject;
  // });

  var dialogPromiseReject; // This can be set later, by showDialog

  function showModal(title, text) {
    var modalContainer = document.querySelector("#modal-container");

    // Clear all existing modal content
    modalContainer.innerHTML = "";

    modalContainer.addEventListener("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      var target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    var modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    var closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";

    var titleElement = document.createElement("h1");
    titleElement.innerText = title;

    var contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    return new Promise((resolve, reject) => {
      closeButtonElement.addEventListener("click", () => {
        dialogPromiseReject = null; // Reset this
        hideModal();
        resolve();
      });

      // This can be used to reject from other functions
      dialogPromiseReject = reject;
    });
  }

  // document.querySelector('#show-modal').addEventListener('click', () => {
  //   showModal('Modal title', 'This is the modal content!');
  // });

  function hideModal() {
    console.log("hideModalFunction");
    var modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  // return new Promise((resolve, reject) => {
  //   cancelButton.addEventListener('click', hideModal);
  //   confirmButton.addEventListener('click', () => {
  //     dialogPromiseReject = null; // Reset this
  //     hideModal();
  //     resolve();
  //   });

  // This can be used to reject from other functions
  //   dialogPromiseReject = reject;
  // });

  //   var closeButtonElement = document.createElement('button');
  // closeButtonElement.classList.add('modal-close');
  // closeButtonElement.innerText = 'Close';
  // closeButtonElement.addEventListener('click', hideModal);

  window.addEventListener("keydown", (e) => {
    var modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  // document.querySelector('#show-dialog').addEventListener('click', () => {
  //   showModal('Confirm action', 'Are you sure you want to do this?');
  // });
  // end of 1.8 hw

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
