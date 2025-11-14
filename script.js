window.onload = function () {
    if (!localStorage.getItem("status")) {
        const dadosUsuario = {
            logado: "false",
            email: null
        };
        localStoragewwww.setItem("status", JSON.stringify(dadosUsuario));
    }
}

// Mensagem de erro global
var msgError = document.querySelector("#msg-error");

// Cadastra o usuário 
function cadastrarUsuario(event) {
    // Impede o formulário enviar automaticamente
    event.preventDefault();

    const user = document.querySelector("#nome").value.trim();
    const em = document.querySelector("#email").value.trim();
    const pass = document.querySelector("#senha").value.trim();
    const confirmPass = document.querySelector("#confirmar-senha").value.trim();

    function registrarDados(usu, email, password) {
        if (pass === confirmPass) {
            const dados = {
                usuario: usu,
                email: email,
                senha: password
            }

            // Coloca os dados do Objeto no localStorage
            localStorage.setItem(em, JSON.stringify(dados));
            alert("Cadastro feito com sucesso!");
            window.location.href = "index.html"
        } else {
            msgError.innerHTML = "As senhas não coincidem. Tente novamente!"
        }
    }

    if (localStorage.getItem(em)) {
        const loginSalvo = JSON.parse(localStorage.getItem(em));
        if (em === loginSalvo.email) {
            msgError.innerHTML = `Conta já cadastrada. <a href="index.html" style="text-decoration: underline; color: black;">Fazer login</a>`
        } else {
            registrarDados(user, em, pass);
        }
    } else {
        registrarDados(user, em, pass);
    }
}

function loginUsuario(event) {
    event.preventDefault();

    const em = document.querySelector("#username").value.trim();
    const pass = document.querySelector("#password").value.trim();

    if (localStorage.getItem(em)) {
        // Pega os dados salvos no localStorage e joga em um Objeto
        const dadosSalvo = JSON.parse(localStorage.getItem(em));

        if (em === dadosSalvo.email && pass === dadosSalvo.senha) {

            // Marca o usuário logado
            localStorage.setItem(
                "status", JSON.stringify({
                    logado: "true",
                    email: em
                })
            );
            
            alert("Login realizado com sucesso! Redirecionando...")
            window.location.href = "dashboard.html";
        } else {
            msgError.style.color = "red";
            msgError.innerHTML = "ERRO! Email ou senha incorretos.";
        }
    } else {
        msgError.innerHTML = `Você não tem cadastro <a href="cadastro.html" style="color: red;">Cadastre aqui!<a>`
    }
}




// Map para armazenar o texto de desconto gerado dinamicamente
const dynamicDiscountMap = new Map();

function redirecionarCadastro() {
    window.location.href = 'cadastro.html';
}

// Função para gerar descontos e horários dinâmicos (Atualizada para usar IDs)
function generateDynamicDiscounts() {
    const now = new Date();
    const dayOfWeek = now.getDay(); 
    
    const currentMinute = now.getMinutes();
    let currentHour = now.getHours();
    
    if (currentMinute >= 30) {
        currentHour = (currentHour + 1) % 24; 
    }
    
    let discountPool;
    if (dayOfWeek >= 1 && dayOfWeek <= 5) { 
        discountPool = ["Sem descontos","30%", "30%", "35%", "40%", "50%"]; 
    } else { 
        discountPool = ["Sem descontos", "Sem descontos", "10%", "15%", "20%"]; 
    }
    
    const dayNames = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const currentDayName = dayNames[dayOfWeek];
    
    const discountElements = document.querySelectorAll('.discount');
    
    discountElements.forEach(element => {
        const randomIndex = Math.floor(Math.random() * discountPool.length);
        const discount = discountPool[randomIndex];
        
        const hourString = String(currentHour).padStart(2, '0');
        
        // Constrói o novo texto dinâmico
        const newText = `Desconto: ${discount} na reserva para ${currentDayName} às ${hourString}h`;
        
        // Atualiza o texto na página
        element.textContent = newText;
        
        // Armazena o texto gerado no Map, usando o ID do elemento (ex: discount-1) como chave
        dynamicDiscountMap.set(element.id, newText);
    });
}

// NOVA FUNÇÃO: Captura dados do restaurante, armazena em localStorage e redireciona (ATUALIZADA)
function reserveRestaurant(buttonElement) {
    const card = buttonElement.closest('.restaurant-card');
    if (!card) return;

    // 1. Coleta dados estáticos do data-attributes
    const restaurantId = card.getAttribute('data-id');
    const name = card.getAttribute('data-name');
    const desc = card.getAttribute('data-desc');
    const img = card.getAttribute('data-img');
    const address = card.getAttribute('data-address'); // NOVO: Coleta o endereço
    const dishesJSON = card.getAttribute('data-dishes'); 

    // 2. Coleta dados dinâmicos do Map
    const discountElement = card.querySelector('.discount');
    const discountText = dynamicDiscountMap.get(discountElement.id) || discountElement.textContent;
    
    // 3. Cria o objeto de dados (incluindo o endereço e os pratos)
    const selectedRestaurantData = {
        id: restaurantId,
        name: name,
        desc: desc,
        img: img,
        address: address, // NOVO: Adiciona o endereço
        discountText: discountText,
        dishes: dishesJSON 
    };

    // 4. Armazena os dados no localStorage (converte o objeto para string JSON)
    localStorage.setItem('selectedRestaurant', JSON.stringify(selectedRestaurantData));

    // 5. Redireciona para a página de reserva
    window.location.href = 'reserva.html';
}

// Executa a função de descontos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.restaurants-section')) {
        generateDynamicDiscounts();
    }
});