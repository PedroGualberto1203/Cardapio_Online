const InputSenha = document.querySelector("#senha")
const InputUsuario = document.querySelector("#usuario")
const ButtonLogin = document.querySelector("#ButtonLogin")
const  warn = document.querySelector("#warn")
const UsuarioAdm = "opdc123"
const SenhaAdm = 123456

// função para pegar o está escrito no input, conferir se é o login correto, e encaminhar para o html do crud
function ConferenciaSenhaLogin(){

    let InputUserValue = ""  // declarou as variaveis que irão quardar o que for colocado no input
    let InputSenhaValue = ""

    InputUsuario.addEventListener("input", function(event){
        console.log(event.target.value)
         InputUserValue = event.target.value  // quarda na variavel o que for escrito no input
    })
    
    InputSenha.addEventListener("input", function(event){
        console.log(event.target.value)
         InputSenhaValue = event.target.value  // quarda na variavel o que for escrito no input
    })

    ButtonLogin.addEventListener("click", function() {
        if(InputUserValue !== UsuarioAdm && Number(InputSenhaValue) !== SenhaAdm ){  // Ao clicar no login, ele vai verificar se o que foi quardado no input é ou não o user e senha certo, se for abre o html do crud
            warn.classList.remove("hidden")
        } else {
            window.location.href = "../../Backend/front/crud.html"
        }

    })

}

ConferenciaSenhaLogin()


//Função para ocultar ou não a senha, de acordo com o click do olho no input
document.addEventListener('DOMContentLoaded', function() {

    const senhaInput = document.getElementById('senha');
    const iconeOlho = document.getElementById('iconeOlho');

    iconeOlho.addEventListener('click', function() {
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
         iconeOlho.querySelector('i').classList.remove('fa-eye-slash');
        iconeOlho.querySelector('i').classList.add('fa-eye');

    } else {

        senhaInput.type = 'password';
        iconeOlho.querySelector('i').classList.remove('fa-eye');
        iconeOlho.querySelector('i').classList.add('fa-eye-slash');
        
    }
    });
});

