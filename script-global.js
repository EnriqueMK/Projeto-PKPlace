window.onload = function() {
    if (!localStorage.getItem("status")) {
        const dadosUsuario = {
            logado: "false",
            email: null
        };
        localStorage.setItem("status", JSON.stringify(dadosUsuario));
    } 

    if (JSON.parse(localStorage.getItem("status")).logado === "true") {
        const navLinkNav = document.querySelector("#linknav")
        navLinkNav.style.margin = "0px"

        const mensagemOla = document.querySelector("#container-cc");
        mensagemOla.innerHTML = `Olá, ${JSON.parse(localStorage.getItem(JSON.parse(localStorage.getItem("status")).email)).usuario}!`;
        mensagemOla.style.color = "#f12435";
        mensagemOla.style.fontWeight = "bold";
    }
}

// Mensagem de erro global
var msgError = document.querySelector("#msg-error");

// Herdar 
function herdarFooter(caminhoCorreto) {
    fetch(caminhoCorreto)
    .then(response => {
        if (!response.ok) throw new Error('Erro ao carregar footer');
        return response.text();
    })
    .then(data => {
        document.getElementById('footer-placeholder').innerHTML = data;
    })
    .catch(err => console.error(err));
}

function logout() {
    const status = JSON.parse(localStorage.getItem("status"));

    if (status.logado === "true") {
        alert("Conta deslogada!")
        const dadosUsuario = {
            logado: "false",
            email: null
        };
        localStorage.setItem("status", JSON.stringify(dadosUsuario));
        window.location.reload();
    } else if (status.logado === "false") {
        alert("Você não está logado!")
    }
}

