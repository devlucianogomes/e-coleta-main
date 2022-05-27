// Funcao que tras os dados do ibge
function populateUFs() {
  const ufselect = document.querySelector(".uf");
  console.log(ufselect);

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((response) => {
      return response.json();
    })
    .then((states) => {
      // Fazendo um for dos esatdos
      for (let state of states) {
        ufselect.innerHTML += `<option value='${state.id}'> ${state.nome} </option`;
      }
    });
}

populateUFs();

// Funcao para pegar as cidades e habilitar o campo

function getCities(event) {
  const citySelect = document.querySelector(".city");
  const stateInput = document.querySelector(".inputSate");

  const ufValue = event.target.value;

  const indexSelected = event.target.selectedIndex;
  stateInput.value = event.target.options[indexSelected].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `;

  citySelect.innerHTML = "<option value>Selecione a Cidade</option>";

  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((cities) => {
      for (let city of cities) {
        citySelect.innerHTML += `<option value='${city.nome}'> ${city.nome} </option`;
      }

      citySelect.disabled = false;
    });
}

// Selecionando o input do select de estado
document.querySelector(".uf").addEventListener("change", getCities);

// Montando o select dos tipos de item de colega
// Pegando todos os Li's para por o evento
let itemsToCollect = document.querySelectorAll(".items-grid li");
for (let item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const inputCollectItems = document.querySelector("input[name = items]");

// variavel dos itens selecionados
let selectedItems = [];

function handleSelectedItem(event) {
  // add or remove class with JS
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;

  // verificar se existem itens selecionados, se sim, pegá-los
  const alreadySelected = selectedItems.findIndex((item) => {
    return item == itemId;
  });

  console.log(alreadySelected);

  // se ja tiver selecionado, tirar da seleção
  if (alreadySelected >= 0) {
    const filteredItems = selectedItems.filter((item) => {
      return item != itemId;
    });

    selectedItems = filteredItems;
  } else {
    selectedItems.push(itemId);
  }

  // atualizando o collected
  inputCollectItems.value = selectedItems;
}
