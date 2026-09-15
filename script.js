let tela = document.getElementById("tela");

let primeiroNumero = "";
let operacao = "";

function adicionar(valor) {
    tela.value += valor;
}

function limpar() {
    tela.value = "";
    primeiroNumero = "";
    operacao = "";
}

function apagar() {
    tela.value = tela.value.slice(0, -1);
}

function calcular() {
    let expressao = tela.value;

    let partes = expressao.split(/([+\-*/])/);

    if (partes.length < 3) {
        return;
    }

    primeiroNumero = partes[0];
    operacao = partes[1];
    let segundoNumero = partes[2];

    fetch("http://127.0.0.1:5000/calcular", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            num1: primeiroNumero,
            num2: segundoNumero,
            operacao: operacao
        })
    })
    .then(resposta => resposta.json())
    .then(dados => {
        if (dados.erro) {
            tela.value = dados.erro;
        } else {
            tela.value = dados.resultado;
        }
    })
    .catch(() => {
        tela.value = "Erro no servidor";
    });
}