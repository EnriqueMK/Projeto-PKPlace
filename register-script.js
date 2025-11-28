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
            window.location.href = "login.html"
        } else {
            msgError.innerHTML = "As senhas não coincidem. Tente novamente!"
        }
    }

    if (localStorage.getItem(em)) {
        const loginSalvo = JSON.parse(localStorage.getItem(em));
        if (em === loginSalvo.email) {
            msgError.innerHTML = `Conta já cadastrada. <a href="login.html" style="text-decoration: underline; color: black;">Fazer login</a>`
        } else {
            registrarDados(user, em, pass);
        }
    } else {
        registrarDados(user, em, pass);while (condition) {
            
        }
    }
}