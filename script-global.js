// -------------------------------------------------------
// BOTÃO DE REDIRECIONAMENTO DO FORMULÁRIO
// -------------------------------------------------------
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
// SISTEMA DE LOGIN, HEADER E FOOTER
// -------------------------------------------------------
window.onload = function () {

    if (!localStorage.getItem("status")) {
        const dadosUsuario = {
            logado: "false",
            email: null
        };
        localStorage.setItem("status", JSON.stringify(dadosUsuario));
    }

    const status = JSON.parse(localStorage.getItem("status"));

    if (status.logado === "true") {
        const navLinkNav = document.querySelector("#linknav");
        if (navLinkNav) navLinkNav.style.margin = "0px";

        const mensagemOla = document.querySelector("#container-cc");
        if (mensagemOla) {
            const dados = JSON.parse(localStorage.getItem(status.email));

            mensagemOla.innerHTML = `Olá, ${dados.usuario}!`;
            mensagemOla.style.color = "#f12435";
            mensagemOla.style.fontWeight = "bold";
        }
    }
};


// -------------------------------------------------------
// HERDAR FOOTER + REDIRECIONAMENTO (AGORA FUNCIONANDO)
// -------------------------------------------------------
function herdarFooter(caminhoCorreto) {
    fetch(caminhoCorreto)
        .then(response => {
            if (!response.ok) throw new Error("Erro ao carregar footer");
            return response.text();
        })
        .then(data => {

            document.getElementById("footer-placeholder").innerHTML = data;

            // 🔥 AGORA OS ELEMENTOS EXISTEM — PODE REDIRECIONAR
            const inicio = document.getElementById("btn-inicio");
            const reservas = document.getElementById("btn-reservas");

            if (inicio) {
                inicio.style.cursor = "pointer";
                inicio.addEventListener("click", () => {
                    window.location.href = "index.html";
                });
            }

            if (reservas) {
                reservas.style.cursor = "pointer";
                reservas.addEventListener("click", () => {
                    window.location.href = "reserved.html";
                });
            }
        })
        .catch(err => console.error(err));
}


// -------------------------------------------------------
// LOGOUT
// -------------------------------------------------------
function logout() {
    const status = JSON.parse(localStorage.getItem("status"));

    if (status.logado === "true") {
        alert("Conta deslogada!");

        localStorage.setItem("status", JSON.stringify({
            logado: "false",
            email: null
        }));

        window.location.reload();
    } else {
        alert("Você não está logado!");
    }
}
