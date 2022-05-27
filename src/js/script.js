function createMainCard(market) {
    
    const cardLi = document.createElement("li");
    const imgCard = document.createElement("img");
    const h3Card = document.createElement("h3");
    const sectionCard = document.createElement("span");
    const priceCard = document.createElement("p");
    
    imgCard.src = market.img;
    h3Card.innerText = market.nome;
    priceCard.innerText = `R$ ${market.preco.toFixed(2)}`;
    sectionCard.innerText = market.secao;
    
    cardLi.append(imgCard, h3Card, sectionCard,priceCard);
    
    return cardLi;
}

function assembleData(produtos) {
    
    const ulCard = document.querySelector("ul"); 
    ulCard.innerHTML = ""
    
    for (let counter = 0; counter < produtos.length; counter++) {
        
        const market = produtos[counter];
        
        const cardLi = createMainCard(market);

        ulCard.append(cardLi);
    }

}
assembleData(produtos);

const btnFilterTodos = document.querySelector(".estiloGeralBotoes--mostrarTodos");
btnFilterTodos.addEventListener("click", filterProds);

const btnFilterHortfruti = document.querySelector(".estiloGeralBotoes--filtrarHortifruti");
btnFilterHortfruti.addEventListener("click", filterProds);

const btnFilterPanificadora = document.querySelector(".estiloGeralBotoes--filtrarPanificadora");
btnFilterPanificadora.addEventListener("click", filterProds);

const btnFilterLaticinios = document.querySelector(".estiloGeralBotoes--filtrarLaticinios");
btnFilterLaticinios.addEventListener("click", filterProds);

function filterProds(event) {
    const section = event.target.dataset.section;
    const filtered = produtos.filter(function(product) {
        
        if (section === "todos") {
            return product;
        } else {
            return product.secao === section;
        }
    })

    assembleData(filtered);
    totalSum(filtered);
}

const btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", searchProds);

const schfield = document.querySelector(".campoBuscaPorNome");
schfield.addEventListener("keydown", searchEnter);

function searchProds(event) {
    const searchField = document.querySelector(".campoBuscaPorNome").value;

    const filtered = produtos.filter(function(product){
        return product.nome.toLowerCase().includes(searchField.toLowerCase());
    })
    
    assembleData(filtered);
    
    totalSum(filtered);
}

function searchEnter(event) {
    if (event.code === "Enter") {
        searchProds(event);
    }
}

const divTotalSum = document.querySelector("#totalSum");
const pSum = document.createElement("p");
divTotalSum.append(pSum);
pSum.className = "totalSum";

function totalSum(filtered) {
    let total = 0;
    
    filtered.forEach(function(produto) {
        total += produto.preco;
    });
    
    pSum.innerHTML = `R$ ${total.toFixed(2)}`;


}
totalSum(produtos);