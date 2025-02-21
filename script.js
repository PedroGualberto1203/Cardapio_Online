const menu = document.querySelector("#menu");
const cartBtn = document.querySelector("#cart-btn");
const cartModal = document.querySelector("#cart-modal");
const cartItemsContainer = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const checkoutBtn = document.querySelector("#checkout-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const cartCounter = document.querySelector("#cart-count");
const addressInput = document.querySelector("#address");
const addressWarn = document.querySelector("#address-warn");

let cart = [];

// Abrir o modal do carrinho
cartBtn.addEventListener("click", function() {
    cartModal.style.display = "flex"
    updateCartModal();
})

// Fechar o modal quando clicar fora
cartModal.addEventListener("click", function(event) {
    if(event.target === cartModal){  // event no caso é, o evento clicado, entao se o evento que eu cliquei for o cartModal ou o botao de fechar, coloque o display como none, ou seja, feche ele
        cartModal.style.display = "none"  //event.target ele indica qual iten eu cliquei
    }
})


closeModalBtn.addEventListener("click", function(event){
    cartModal.style.display = "none"
})

menu.addEventListener("click", function(event){
    let parentButton = event.target.closest(".add-to-cart-btn") // esse closest com o nome da classe,vai procurar essa classe dentro do buttom, o mesmo funciona se fosse um id, so ia colocar # no lugar do ponto

    if(parentButton){
        const name = parentButton.getAttribute("data-name")  // Vai guardar o atributo data-name que existe dentro do buttom
        const price = parseFloat(parentButton.getAttribute("data-price"))   // Vai guardar o atributo data-price que existe dentro do buttom
                                                                            // PareseFloat é para transformar aquilo em number
        addToCart(name, price) // está mandando o name e o price para a função

    }
})


// Função para adiconar no carrinho
function addToCart(name, price){                                     // Os argumentos querem dizer, quero que me mande o name e o price
    const existingItem = cart.find(item => item.name === name)       //find ele passa em cada item, ele percorre todos os itens da lista(o array) 
                                                                     // item.name === name esta verificando se o item.nmae, ou seja, o name do elemento clicado, é igual a algum outro name ja existente o array(faz essa verificação pelo find, já que ele percorre item por item)
                                                                     // se achar o msm name, ele vai guardar nessa variavel

    if(existingItem){ // se existir igual, adiciona +1 na quantidade
        existingItem.quantity += 1;  // Então se ja tem 1(ou seja, a const existingItem), adiciona +1 no quantity
        return // para parar a execução do if
    }else{
        cart.push({  //Adicionando name e price ao array cart
            name,
            price,
            quantity: 1,
        })
    }

    updateCartModal()

}


// Atualiza no carrinho
function updateCartModal(){  // Basicamente acessa a div que vai mostrar o itens adiconados(cart-items) e inserindo nela os itens do carrinho, por meio da variavel cart, que é onde está sendo guardado os itens adicionados por meio do click em cima no butao de carrinho de cada item
    cartItemsContainer.innerHTML = ""
    let total = 0;

    cart.forEach(item => {  // forEach é um loop que no caso esta percorrendo cada item, para mostrar cada item na lista de compra
      const cartItemElement = document.createElement("div")
      cartItemElement.classList.add("flex", "justify-between", "mb-4", "flex-col")  

    cartItemElement.innerHTML = `
        <div class="flex items-center justify-between">

            <div>
            <p class="font-bold">${item.name}</p>
            <p>Quantidade: ${item.quantity}</p>
            <p class="font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
            </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>

        </div>
    `

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)

    })

    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })

    cartCounter.innerHTML = cart.length


}

//Função para remover o item do carrinho

cartItemsContainer.addEventListener("click", function(event){
    if(event.target.classList.contains("remove-from-cart-btn")) {   // Se o elemento clicado contem esta classe mencionada
        const name = event.target.getAttribute("data-name")   // Pegue o atributo data-name deste elemento

        removeItemCart(name)

    }

})


function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)  // vai buscar na lista(cart), a posição deste item(findIndex), se o nome desse item na lista(item.name) é igual o nome que está sendo mandado, no caso, o nome/item clicado, se sim, vai me retornar a posição deste item na lista(proximas linhas)

    if(index !== -1) {  // esse -1, é que quando ele não encontra, como padrão ele me retorna -1, sempre, ent se achar, com crtz será diferente de -1
        const item = cart[index]
        

        if(item.quantity > 1){   // se a quantidade for maior que 1, tira 1 quantidade, atualiza o menu(updateCartModal()) e para a execução(return)
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)  // remove este objeto da lista, por meio do splice
        updateCartModal()

    }
}


addressInput.addEventListener("input", function(event){
    let inputValue = event.target.value  // Vai guardar o que for escrito no input

    if(inputValue !== ""){   // se o que estiver dentro do input, for diferente de vazio(ou seja, ja vai estar escrevendo), a borda vermelha do input some e o alerta(addressWarn) também
        addressInput.classList.remove("border-red-500")
        addressWarn.classList.add("hidden")
    }
})

// Finalizar pedido
checkoutBtn.addEventListener("click", function(){

    // const isOpen = checkRestaurantOpen()  // Chamando função que verifica se a cantina está ou não aberta
    // if(!isOpen){
        
    //     Toastify({     // Uso da biblioteca de aviso que a cantina esta fechada
    //         text: "CANTINA OPEN ESTÁ FECHADA NO MOMENTO",
    //         duration: 3000,
    //         close: true,
    //         gravity: "top", // `top` or `bottom`
    //         position: "right", // `left`, `center` or `right`
    //         stopOnFocus: true, // Prevents dismissing of toast on hover
    //         style: {
    //           background: "#ef4444",
    //         },
    //     }).showToast();

    //     return // para parar a execução do código, para não seguir para baixo
    // }

    if(cart.length === 0) return  // Se nao tiver nada no carrinho, nao faz nada

    if(addressInput.value === ""){ // Se tentar fenalizar o pedido sem escrever nada dentro do input...
        addressWarn.classList.remove("hidden")  // Remove o hidden da class do addresWarn, ou seja, faz aparecer o alerta na tela do carrinho
        addressInput.classList.add("border-red-500")  // adiciona uma borda vermelha no input
    return
    }

    // Enviar o pedido para API whatsapp

    const cartItems = cart.map((item) => {
        return(
            `${item.name} - Quantidade: (${item.quantity}) - Preço: R$${item.price}\n`
        )
    }).join("")  // Isso junta todo o Array

    const message = encodeURIComponent(cartItems)
    const phone = "62996635404"  //Telefone da cantina que irá receber a menssagem com os pedidos

    window.open(`https://wa.me/${phone}?text=${message}Colaborador: ${addressInput.value}`, "_blank")  // Redirecionamento para a API do whatssap, para mandar o pedido

    cart = []
    updateCartModal()

})


// Verificação se a cantina está aberta, para fazer o pedido, verifica a hora e manipula o card horário

// function checkRestaurantOpen() {
//     const data = new Date()  // pega a data de hoje
//     const hora = data.getHours()  // pega a hora que está
//     return hora >= 8 && hora < 12  //true = cantina aberta
// }

// const spanItem = document.querySelector("#date-span")
// const isOpen = checkRestaurantOpen()

// if(isOpen){
//     spanItem.classList.remove("bg-red-500")
//     spanItem.classList.add("bg-green-600")
// }else{
//     spanItem.classList.remove("bg-green-600")
//     spanItem.classList.add("bg-red-500")
// }


















