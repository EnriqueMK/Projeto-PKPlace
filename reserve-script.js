// Função para exibir mensagem customizada
function showMessage(text, isError = false) {
    const msgElement = document.getElementById('status-message');
    msgElement.textContent = text;
    msgElement.style.backgroundColor = isError ? '#ffe0e6' : '#e6ffed';
    msgElement.style.color = isError ? '#c11e2a' : '#1e8449';
    msgElement.style.display = 'block';
    setTimeout(() => {
        msgElement.style.display = 'none';
    }, 5000);
}

document.addEventListener('DOMContentLoaded', () => {
    const rawDataString = localStorage.getItem('selectedRestaurant');
    const statusMessage = document.getElementById('status-message');

    if (!rawDataString) {
        showMessage("Nenhum restaurante selecionado. Redirecionando...", true);
        setTimeout(() => { window.location.href = 'index.html'; }, 2000);
        return;
    }
    
    const rawData = JSON.parse(rawDataString);
    const dishes = rawData.dishes ? JSON.parse(rawData.dishes) : [];
    const dishesContainer = document.getElementById('dishes-container');
    const leftBtn = document.querySelector('.left-btn');
    const rightBtn = document.querySelector('.right-btn');

    // 1. Atualiza o título da página
    document.getElementById('restaurant-name').textContent = `Reserva em ${rawData.name}`;
    document.title = `Reserva em ${rawData.name}`;
    
    // 2. Preenche os detalhes do restaurante
    document.getElementById('restaurant-image').src = rawData.img;
    document.getElementById('restaurant-image').alt = `Foto de ${rawData.name}`;
    document.getElementById('details-name').textContent = rawData.name;
    document.getElementById('details-description').textContent = rawData.desc;
    document.getElementById('details-address').textContent = rawData.address;
    document.getElementById('details-discount').textContent = rawData.discountText;

    // 3. Renderiza os pratos populares
    if (dishes.length > 0) {
        dishes.forEach(dish => {
            const dishHtml = `
                <div class="dish-card">
                    <img src="${dish.img}" alt="${dish.name}" class="dish-photo-placeholder">
                    <p class="dish-name">${dish.name}</p>
                </div>
            `;
            dishesContainer.innerHTML += dishHtml;
        });
    } else {
        dishesContainer.innerHTML = '<p style="text-align: center; width: 100%;">Nenhum prato popular listado para este restaurante.</p>';
        // Oculta os botões se não houver pratos para rolar
        document.querySelector('.carousel-container').style.display = 'block';
        leftBtn.style.display = 'none';
        rightBtn.style.display = 'none';
    }

    // 4. Adiciona lógica de finalização da reserva e redirecionamento
    document.querySelector('.final-reserve-btn').addEventListener('click', () => {
        
        if (localStorage.getItem('activeReservation')) {
            showMessage("Você já possui uma reserva ativa. Cancele-a para fazer uma nova.", true);
            return;
        }

        // Cria a data/hora de confirmação
        const confirmationTime = new Date().getTime(); 
        
        // Cria o objeto final da reserva, incluindo o horário de confirmação
        const finalReservationData = {
            ...rawData,
            // Note que a "hora" agora é o timestamp da confirmação
            confirmationTimestamp: confirmationTime 
        };

        // Armazena a reserva ativa e única no localStorage
        localStorage.setItem('activeReservation', JSON.stringify(finalReservationData));

        // Limpa o item temporário de seleção
        localStorage.removeItem('selectedRestaurant'); 

        // Redireciona para a página de reserva feita
        window.location.href = 'reserved.html';
    });
});

// Função para rolagem do carrossel (mantida)
function scrollDishes(direction) {
    const container = document.getElementById('dishes-container');
    const scrollAmount = 300; // Distância de rolagem
    
    if (direction === 'left') {
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    
}