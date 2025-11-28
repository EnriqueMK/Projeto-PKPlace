// Map para armazenar o texto de desconto gerado dinamicamente
const dynamicDiscountMap = new Map();

// Executa a função de descontos ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.restaurants-section')) {
        generateDynamicDiscounts();
    }
});

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

    if (JSON.parse(localStorage.getItem("status")).logado === "true") {
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
        window.location.href = 'pages/reserve.html';
    } else {
        const resp = confirm("Faça login para continuar com a reserva.")
        if (resp) {
            window.location.href = "pages/login.html"
        } 
    }
}

