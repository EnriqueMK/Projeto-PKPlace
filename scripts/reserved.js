document.addEventListener('DOMContentLoaded', () => {
const reservationCard = document.getElementById('reservation-card');
const noReservationMessage = document.getElementById('no-reservation-message');
const pageTitle = document.getElementById('page-title');

const activeReservation = localStorage.getItem('activeReservation');

if (activeReservation) {
    // Há uma reserva ativa
    const data = JSON.parse(activeReservation);
    
    pageTitle.textContent = "Sua Reserva Ativa";
    
    document.getElementById('res-image').src = data.img;
    document.getElementById('res-name').textContent = data.name;
    
    // 1. Lógica para calcular a validade (2 horas)
    const confirmationTime = new Date(data.confirmationTimestamp);
    const expiryTime = new Date(confirmationTime.getTime() + (2 * 60 * 60 * 1000)); // Adiciona 2 horas (em milissegundos)
    
    // Formata a hora de expiração (HH:MM)
    const formattedExpiryTime = expiryTime.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false // Formato 24h
    });

    // 2. Exibe a validade da oferta
    document.getElementById('res-time').textContent = formattedExpiryTime;
    
    document.getElementById('res-discount').textContent = data.discountText;
    document.getElementById('res-address').textContent = data.address;
    
    reservationCard.style.display = 'block';

    // Lógica do botão Cancelar Reserva
    document.getElementById('cancel-reservation-btn').addEventListener('click', () => {
        // Limpa a reserva ativa
        localStorage.removeItem('activeReservation');
        
        // Exibe mensagem de sucesso (substituindo o alert)
        pageTitle.textContent = "Reserva Cancelada";
        reservationCard.style.display = 'none';
        noReservationMessage.style.display = 'block';
        noReservationMessage.innerHTML = '<h2 style="color: #c11e2a;">Reserva Cancelada com Sucesso!</h2><p style="margin-top: 15px;">Você pode fazer uma nova reserva no <a href="/index.html" class="btn-reserve">Dashboard</a>.</p>';
    });

} else {
    // Nenhuma reserva ativa
    pageTitle.textContent = "Minhas Reservas";
    reservationCard.style.display = 'none';
    noReservationMessage.style.display = 'block';
}
});