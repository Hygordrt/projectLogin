const init = () => {

    // const validateEmail = (event) => { // função para validar e-mail
    //     const input = event.currentTarget;
    //     const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //     const emailTest = regex.test(input.value);

    //     if (!emailTest) {
    //         submitButtonC.setAttribute("disabled", "disabled");
    //         input.nextElementSibling.classList.add('error'); // aqui pega o proximo elemento depois do input, nesse caso e o span
    //     } else {
    //         submitButtonC.removeAttribute("disabled");
    //         input.nextElementSibling.classList.remove('error');
    //     }
    // }

    // const validatePassowrd = (event) => { // função para validar senha
    //         const input = event.currentTarget; // recebe o evento

    //         if (input.value.length < 8) {
    //             submitButtonC.setAttribute("disabled", "disabled");
    //             input.nextElementSibling.classList.add('error');
    //         } else {
    //             submitButtonC.removeAttribute("disabled");
    //             input.nextElementSibling.classList.remove('error');
    //         }
    //     }

    //ADICIONANDO EFEITO PARA LOGIN
    const errorHandler = () => { //quando acontece erro, ela adiciona e remove classes
        submitButtonL.classList.remove('loading');
        submitButtonL.classList.remove('success');
        submitButtonL.classList.add('error');
        submitButtonL.textContent = "Error :(";
    }
    const successHandler = () => {
        submitButtonL.classList.remove('loading');
        submitButtonL.classList.remove('error');
        submitButtonL.classList.add('success');
        submitButtonL.textContent = "Carregando :)";
    }

    //ADICIONANDO EFEITO PARA CADASTRAR
    const errorCad = () => { //quando acontece erro, ela adiciona e remove classes
        submitButtonC.classList.remove('loading');
        submitButtonC.classList.remove('success');
        submitButtonC.classList.add('error');
        submitButtonC.textContent = "Error :(";
    }
    const successCad = () => {
        submitButtonC.classList.remove('loading');
        submitButtonC.classList.remove('error');
        submitButtonC.classList.add('success');
        submitButtonC.textContent = "Cadastrado :)";
    }

//Pegando os inputs
const usuario = document.querySelector('input[type="email"]');
const senha = document.querySelector('input[type="password"]');
const submitButtonL = document.querySelector('.login__submit');
const submitButtonC = document.querySelector('.Cadastro__submit');

// usuario.addEventListener('input', validateEmail);
// senha.addEventListener('input', validatePassowrd);

//localStorage
const getBanco = () => JSON.parse(localStorage.getItem ('usuarios')) ?? [];
const setBanco = (banco) => localStorage.setItem ('usuarios', JSON.stringify(banco));

// INSERINDO USUARIO NO localStorage
const createUser = (newUser) => {
    const usuarios = getBanco()
    usuarios.push (newUser)
    setBanco(usuarios)
}

//FUNÇÃO PARA CADASTRO NOVO
if (submitButtonC) {
    submitButtonC.addEventListener('click', (event) => {
    event.preventDefault();

    submitButtonC.textContent = "Loading...";

    const newUser = {
        login: document.querySelector('input[type="CadastroEmail"]').value,
        senha: document.querySelector('input[type="password"]').value,
    }
    createUser(newUser)
                   
    successCad();
    setTimeout(() => {
        alert("Cadastro criado com sucesso!");
        window.location="index.html";
    }, "1000") 
    })
}

//FUNÇÃO PARA LOGAR
if (submitButtonL) {
    submitButtonL.addEventListener('click', (event) => {
                event.preventDefault();
    
                submitButtonL.textContent = "Loading...";
                
                let listaUser = []

                let userValid = {
                    login: '',
                    senha: ''
                }

                listaUser = JSON.parse(localStorage.getItem ('usuarios'))
                
                listaUser.forEach((item) => {
                    if(usuario.value == item.login && senha.value == item.senha){
                        userValid = {
                            login: item.login,
                            senha: item.senha
                        }
                    }
                });

                if(usuario.value == userValid.login && senha.value == userValid.senha){
                    successHandler();
                    setTimeout(() => {
                        window.location="logou.html";
                    }, "1000")
     
                } else {
                    errorHandler();
                    setTimeout(() => {
                        alert('Login e senha não confere.')
                        window.location="index.html";
                    }, "1000") 
                }
            })
        }
}
window.onload = init;