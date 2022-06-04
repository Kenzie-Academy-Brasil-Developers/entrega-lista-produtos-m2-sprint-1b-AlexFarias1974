let cart = [];


function createMainCard(card) {

    const cardLi = document.createElement("li");
    cardLi.classList.add("liCard")
    const imgCard = document.createElement("img");
    imgCard.classList.add("imgCard");
    const h3Card = document.createElement("h3");
    h3Card.classList.add("h3Card");
    const spanCard = document.createElement("span");
    spanCard.classList.add("spanSection");
    const sectionBtnCard = document.createElement("section");
    const priceCard = document.createElement("p");
    priceCard.classList.add("priceCard")
    const btnCard = document.createElement("button");
    
    imgCard.src = card.img;
    h3Card.innerText = card.nome;
    spanCard.innerText = card.secao;
    priceCard.innerText = `R$ ${card.preco.toFixed(2)}`;
    btnCard.innerText = "Comprar"

    btnCard.addEventListener("click", function() {
        cart.push(card);
        document.querySelector(".card_Cart").innerHTML = "";
        createCart(card);
    })

    const olNutrients = document.createElement("ol");
    olNutrients.classList.add("olNut");
    card.componentes.forEach(function(arr) {
        const liNutrients = document.createElement("li")
        liNutrients.classList.add("liNut");
        liNutrients.innerText = arr
        olNutrients.appendChild(liNutrients);

    })

    cardLi.append(imgCard, h3Card, spanCard, olNutrients, sectionBtnCard);
    sectionBtnCard.append(priceCard, btnCard);
    

return cardLi;
}

function assembleData(produtos) {
    
    const ulCard = document.querySelector("ul"); 
    ulCard.innerHTML = ""
    
    for (let counter = 0; counter < produtos.length; counter++) {
        
        const card = produtos[counter];
        
        const cardLi = createMainCard(card);

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
}



const btnSearch = document.querySelector("#btnSearch");
btnSearch.addEventListener("click", searchProds);

const schfield = document.querySelector(".campoBuscaPorNome");
schfield.addEventListener("keydown", searchEnter);

function searchProds(event) {
    const searchField = document.querySelector(".campoBuscaPorNome").value;

    const filtered = produtos.filter(function(product){
        return product.nome.toLowerCase().includes(searchField.toLowerCase()) || product.secao.toLowerCase().includes(searchField.toLowerCase()) || product.categoria.toLowerCase().includes(searchField.toLowerCase());
    })

    assembleData(filtered);
}

function searchEnter(event) {
    if (event.code === "Enter") {
        searchProds(event);
    }
}

const divCart = document.querySelector(".card_Cart");
function createCart() {
    
    for (let i = 0; i < cart.length; i++) {
        
     
        const ulCart = document.createElement("ul");
        ulCart.classList.add("ulProdCart")

        const liCart = document.createElement("li");
        liCart.classList.add("liCart");
        ulCart.append(liCart);

        const figCart = document.createElement("figure");
        figCart.classList.add("figImgCart")
        divCart.append(figCart);

        const imgCart = document.createElement("img");
        imgCart.classList.add("imgProdCart")
        imgCart.src = cart[i].img;
        imgCart.alt = cart[i].nome;
        figCart.append(imgCart);

        const divProdCart = document.createElement("div");
        divProdCart.classList.add("dataProds");
        liCart.append(divProdCart);

        const h3ProdCart = document.createElement("h3");
        h3ProdCart.classList.add("h3ProdCart");
        const h4ProdCart = document.createElement("h4");
        h4ProdCart.classList.add("h4ProdCart");
        const pProdCart = document.createElement("p");
        pProdCart.classList.add("pProdCart");


        h3ProdCart.innerText = cart[i].nome;
        h4ProdCart.innerText = cart[i].secao;
        pProdCart.innerText = `R$ ${cart[i].preco.toFixed(2)}`;

        divProdCart.append(h3ProdCart, h4ProdCart, pProdCart);

        const figTrashCan = document.createElement("figure");
        figTrashCan.classList.add("figTrashCan");
        liCart.append(figTrashCan);
        
        const imgTrashCan = document.createElement("img");
        imgTrashCan.src = "/src/img/trash-can.png";
        imgTrashCan.alt = "Trashcan icon";
        figTrashCan.append(imgTrashCan);

        imgTrashCan.addEventListener("click", function(event) {
            cart.splice(cart[event.target.id], 1);
            document.querySelector(".card_Cart").innerHTML = "";
            createCart();
        })
        imgTrashCan.id
        divCart.append(ulCart);

    }    
        totalSumCart(cart);
        totalQuantCart(cart);
}

const divQuant = document.querySelector(".quantity");
const divTotal = document.querySelector(".total");

const pTotalQuant = document.createElement("p");
divQuant.append(pTotalQuant);

const pTotalValue = document.createElement("p");
divTotal.append(pTotalValue);

function totalQuantCart(produtos) {
    let total = 0;

    produtos.forEach(function(cart) {
        total++
    });
    pTotalQuant.innerHTML = total

}
totalQuantCart(cart)


function totalSumCart(produtos) {
    let total = 0;
    
    produtos.forEach(function(cart) {
        total += cart.preco;
    });
    
    pTotalValue.innerHTML = `R$ ${total.toFixed(2)}`;


}
totalSumCart(cart);