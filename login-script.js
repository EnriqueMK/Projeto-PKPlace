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
            window.location.href = "index.html"
        } else {
            msgError.style.color = "red";
            msgError.innerHTML = "ERRO! Email ou senha incorretos.";
        }
    } else {
        msgError.innerHTML = `Você não tem cadastro <a href="cadastro.html" style="color: red;">Cadastre aqui!<a>`
    }
}
