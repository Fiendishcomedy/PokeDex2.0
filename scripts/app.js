let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

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
      showModal(pokemon.name, pokemon.types.map((x) => x.type.name).join(", "));
      //find the correct details for the pokemon.
    });
  }

  function loadList() {
    return (
      $.ajax(apiUrl, { dataType: "json" })
        // return fetch(apiUrl)
        // .then(function (response) {
        //   return response.json();
        // })
        .then(function (json) {
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url,
            };
            add(pokemon);
          });
        })
        .catch(function (e) {
          console.error(e);
        })
    );
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    // return fetch(url)
    //   .then(function (response) {
    //     return response.json();
    //   })
    return $.ajax(item.detailsUrl, { dataType: "json" })
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

  let dialogPromiseReject; // This can be set later, by showDialog

  function showModal(title, text) {
    let modalContainer = $("#modal-container");

    // Clear all existing modal content
    modalContainer.innerHTML = "";

    modalContainer.on("click", (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });

    let modal = document.createElement("div");
    modal.classList.add("modal");

    // Add the new modal content
    let closeButtonElement = document.createElement("button");
    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";

    let titleElement = document.createElement("h1");
    titleElement.innerText = title;

    let contentElement = document.createElement("p");
    contentElement.innerText = text;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(contentElement);
    modalContainer.append(modal);

    modalContainer.addClass("is-visible");

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

  function hideModal() {
    let modalContainer = document.querySelector("#modal-container");
    modalContainer.classList.remove("is-visible");
    modalContainer.removeChild(modalContainer.firstChild);

    if (dialogPromiseReject) {
      dialogPromiseReject();
      dialogPromiseReject = null;
    }
  }

  window.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector("#modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

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

// ALL OLD CODE FROM PERVIOUS SECTIONS!!!!! PLACE HW HERE FOR FUTURE USE AND LOOK BACK DATA!

// document.querySelector('#show-dialog').addEventListener('click', () => {
//   showModal('Confirm action', 'Are you sure you want to do this?');
// });
// end of 1.8 hw

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

//   let closeButtonElement = document.createElement('button');
// closeButtonElement.classList.add('modal-close');
// closeButtonElement.innerText = 'Close';
// closeButtonElement.addEventListener('click', hideModal);

// document.querySelector('#show-modal').addEventListener('click', () => {
//   showModal('Modal title', 'This is the modal content!');
// });

// help with this. i did not have showdialog function in place.
// function showDialog(title, text) {
//   showModal(title, text);

//   // We want to add a confirm and cancel button to the modal
//   var modal = modalContainer.querySelector('.modal');

//   var confirmButton = document.createElement('button');
//   confirmButton.classList.add('modal-confirm');
//   confirmButton.innerText = 'Confirm';

//   var cancelButton = document.createElement('button');
//   cancelButton.classList.add('modal-cancel');
//   cancelButton.innerText = 'Cancel';

//   modal.appendChild(confirmButton);
//   modal.appendChild(cancelButton);

//   // We want to focus the confirmButton so that the user can simply press Enter
//   confirmButton.focus();
// }
// what i added right now. for 1.8 hw .

//   function showDialog(title, text) {
//     showModal(title, text);

//       // We want to add a confirm and cancel button to the modal
//       let modal = modalContainer.querySelector('.modal');

//       let confirmButton = document.createElement('button');
//       confirmButton.classList.add('modal-confirm');
//       confirmButton.innerText = 'Confirm';

//       let cancelButton = document.createElement('button');
//       cancelButton.classList.add('modal-cancel');
//       cancelButton.innerText = 'Cancel';

//       modal.appendChild(confirmButton);
//       modal.appendChild(cancelButton);
//      // Return a promise that resolves when confirmed, else rejects
//   return new Promise((resolve, reject) => {
//     cancelButton.addEventListener('click', () => {
//       hideModal();
//       reject();
//     });
//     confirmButton.addEventListener('click', () => {
//       hideModal();
//       resolve();
//     })
//     dialogPromiseReject = reject;
//   });
// }
// This can be used to reject from other functions

//1.8 fixes?
// function hideModal() {
//   console.log("hideModalFunction");
//   let modalContainer = document.querySelector("#modal-container");
//   modalContainer.classList.remove("is-visible");

//   if (dialogPromiseReject) {
//     dialogPromiseReject();
//     dialogPromiseReject = null;
//   }
// }
// let dialogPromiseReject; // This can be set later, by showDialog

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

//1.8

//1.6 hw
// function showDetails(pokemon){
//   alert('Details of ' + pokemon.name + ' ' + pokemon.height + ' ' + pokemon.types)
// }

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
