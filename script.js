const loginUsuario = () => {
    let email = document.querySelector("#username").value
    let password = document.querySelector("#password").value

    localStorage.setItem(email, password)
}