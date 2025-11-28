// botao de redirecionamento
document.addEventListener("DOMContentLoaded", function () {
    const logo = document.querySelector(".logo-text");
    if (logo) {
        logo.style.cursor = "pointer";
        logo.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});

// botao de redirecionamento

function cadastroParceiro(event) {
    event.preventDefault();

    const status = JSON.parse(localStorage.getItem("status"));
    if (!status || status.logado !== "true") {
        alert("Você precisa estar logado para cadastrar um parceiro.");
        window.location.href = "login.html";
        return;
    }

    const restaurante = {
        nome: document.getElementById("nomerestaurante").value.trim(),
        local: document.getElementById("Localização").value.trim(),
        email: document.getElementById("email").value.trim(),
        ramo: document.getElementById("ramo").value,
        reuniao: document.querySelector("input[name='reuniao']:checked").value,
        numero: document.getElementById("numero").value.trim(),
        criadoPor: status.email,
        criadoEm: new Date().toLocaleString()
    };

    let parceiros = JSON.parse(localStorage.getItem("parceiros")) || [];
    parceiros.push(restaurante);
    localStorage.setItem("parceiros", JSON.stringify(parceiros));

    alert("Sua requisição foi enviada! Nossa equipe entrará em contato pelo e-mail informado.");

    window.location.href = "index.html";
}

// -------------------------------------------------------
// ⭐ RESERVA ATIVA / CANCELAMENTO
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
    const reservationCard = document.getElementById('reservation-card');
    const noReservationMessage = document.getElementById('no-reservation-message');
    const pageTitle = document.getElementById('page-title');

    const activeReservation = localStorage.getItem('activeReservation');

    if (activeReservation) {
        const data = JSON.parse(activeReservation);

        pageTitle.textContent = "Sua Reserva Ativa";

        document.getElementById('res-image').src = data.img;
        document.getElementById('res-name').textContent = data.name;

        const confirmationTime = new Date(data.confirmationTimestamp);
        const expiryTime = new Date(confirmationTime.getTime() + (2 * 60 * 60 * 1000));

        const formattedExpiryTime = expiryTime.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        document.getElementById('res-time').textContent = formattedExpiryTime;

        document.getElementById('res-discount').textContent = data.discountText;
        document.getElementById('res-address').textContent = data.address;

        reservationCard.style.display = 'block';

        document.getElementById('cancel-reservation-btn').addEventListener('click', () => {
            localStorage.removeItem('activeReservation');

            pageTitle.textContent = "Reserva Cancelada";
            reservationCard.style.display = 'none';
            noReservationMessage.style.display = 'block';
            noReservationMessage.innerHTML =
                '<h2 style="color: #c11e2a;">Reserva Cancelada com Sucesso!</h2><p style="margin-top: 15px;">Você pode fazer uma nova reserva no <a href="index.html" class="btn-reserve">Dashboard</a>.</p>';
        });

    } else {
        pageTitle.textContent = "Minhas Reservas";
        reservationCard.style.display = 'none';
        noReservationMessage.style.display = 'block';
    }
});
