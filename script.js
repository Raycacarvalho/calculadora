const tela = document.getElementById("tela");

const OPERADORES = ["+", "-", "*", "/", "^"];

let resultadoNaTela = false;

function adicionar(valor) {
    if (resultadoNaTela) {
        // Continua a conta se o usuário digitar um operador; recomeça se digitar um número.
        tela.value = OPERADORES.includes(valor) ? tela.value : "";
        resultadoNaTela = false;
    }
    tela.value += valor;
}

function limpar() {
    tela.value = "";
    resultadoNaTela = false;
}

function apagar() {
    if (resultadoNaTela) {
        limpar();
        return;
    }
    tela.value = tela.value.slice(0, -1);
}

function mostrar(texto) {
    tela.value = texto;
    resultadoNaTela = true;
}

function separarExpressao(expressao) {
    // Procura o operador a partir do segundo caractere, para que o sinal de
    // um número negativo inicial não seja confundido com uma operação.
    for (let i = 1; i < expressao.length; i++) {
        if (OPERADORES.includes(expressao[i])) {
            return {
                num1: expressao.slice(0, i),
                operacao: expressao[i],
                num2: expressao.slice(i + 1)
            };
        }
    }
    return null;
}

function calcular() {
    // Um resultado já exibido não é uma conta nova: calcular de novo sobre ele
    // apagaria o valor que está na tela.
    if (resultadoNaTela) {
        return;
    }

    const partes = separarExpressao(tela.value);

    if (!partes || partes.num1 === "" || partes.num2 === "") {
        mostrar("Expressão incompleta");
        return;
    }

    fetch("http://127.0.0.1:5000/calcular", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(partes)
    })
    .then(resposta => resposta.json())
    .then(dados => {
        mostrar(dados.erro ? dados.erro : String(dados.resultado));
    })
    .catch(() => {
        mostrar("Erro no servidor");
    });
}

// Sem isso o botão clicado continua com foco e o Enter seguinte o aciona de novo.
document.querySelectorAll("button").forEach(botao => {
    botao.addEventListener("click", () => botao.blur());
});

document.addEventListener("keydown", evento => {
    const tecla = evento.key;

    if (/^[0-9.]$/.test(tecla) || OPERADORES.includes(tecla)) {
        adicionar(tecla);
    } else if (tecla === "Enter" || tecla === "=") {
        evento.preventDefault();
        calcular();
    } else if (tecla === "Backspace") {
        apagar();
    } else if (tecla === "Escape") {
        limpar();
    }
});
