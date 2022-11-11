// DADOS RESULTADOS
const dados = [];

// Seleção de elementos

const nomeInput = document.querySelector("#nome");
const salarioHoraInput = document.querySelector("#salarioHora");
const quantidadeHorasInput = document.querySelector("#quantidadeHoras");
const quantidadeExtraInput = document.querySelector("#quantidadeExtra");
const calcBtn = document.querySelector("#calc-btn");
const clearBtn = document.querySelector("#clear-btn");


const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
const nameContainer = document.querySelector("#nomecontainer")

const salarioNumber = document.querySelector("#salario-number span");
const valeNumber = document.querySelector("#vale-number span");
const extraNumber = document.querySelector("#extra-number span");
const pagamentoNumber = document.querySelector("#pagamento-number span");

const salarioInput = document.querySelector("#salario-input span");
const horasInput = document.querySelector("#horas-input span");
const extraInput = document.querySelector("#extra-input span");

const nomeUser = document.querySelector("#nome-usuario span")

const backBtn = document.querySelector("#back-btn");



// Funções



function createTable(dados) {
    dados.innerText

}

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

function calcSalario(salarioHora, quantidadeHoras) {
    const salario = (salarioHora * quantidadeHoras).toFixed(2);

    return (salario);
}

function calcVale(salarioHora, quantidadeHoras) {
    const salario = salarioHora * quantidadeHoras;
    const vale = salario * (40 / 100);

    return (vale.toFixed(2));
}

function calcTotalExtra(salarioHora, quantidadeExtra) {
    const totalExtra = (salarioHora * quantidadeExtra).toFixed(2);

    return (totalExtra);
}

function calcPagamento(salarioHora, quantidadeHoras, quantidadeExtra) {
    const totalExtra = salarioHora * quantidadeExtra;
    let salario = salarioHora * quantidadeHoras;


    if (salario <= 1212) {
        descontoInss = salario * (7.5 / 100)
        console.log(salario.toFixed(2))

    } else if (salario > 1212 && salario <= 2427) {
        descontoInss = salario * (9 / 100)

    } else if (salario > 2427 && salario <= 3641) {
        descontoInss = salario * (12 / 100)
    } else {
        descontoInss = salario * (14 / 100)
    }


    const pagamento = (salario * (60 / 100) + totalExtra - descontoInss).toFixed(2);

    return (pagamento);
}


function cleanInputs() {
    nomeInput.value = "";
    salarioHoraInput.value = "";
    quantidadeHorasInput.value = "";
    quantidadeExtraInput.value = "";
    salarioNumber.className = "";
    valeNumber.className = "";
    extraNumber.className = "";
    pagamentoNumber.className = "";
    nomeUser.className = "";

}

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
    nameContainer.classList.toggle("hide");
}


// Init
createTable(dados);



// Eventos

nomeInput.addEventListener("keypress", function (e) {
    var keyCode = (e.keyCode ? e.keyCode : e.which);

    if (keyCode > 47 && keyCode < 58) {
        e.preventDefault();
    }
});



document.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        calcBtn.click();
    }
});



[salarioHoraInput, quantidadeHorasInput, quantidadeExtraInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

calcBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = nomeInput.value;
    const salarioHora = salarioHoraInput.value.replace(",", ".");
    const quantidadeHoras = quantidadeHorasInput.value.replace(",", ".");
    const quantidadeExtra = quantidadeExtraInput.value.replace(",", ".");

    console.log(nome, salarioHora, quantidadeHoras, quantidadeExtra);

    if (!salarioHora || !quantidadeHoras || !quantidadeExtra) return;



    const resultadoSalario = calcSalario(salarioHora, quantidadeHoras);
    const resultadoVale = calcVale(salarioHora, quantidadeHoras);
    const resultadoTotalExtra = calcTotalExtra(salarioHora, quantidadeExtra);
    const resultadoPagamento = calcPagamento(salarioHora, quantidadeHoras, quantidadeExtra);




    nomeUser.innerText = (`Olá ${nome}!`);
    salarioNumber.innerHTML = resultadoSalario;
    valeNumber.innerHTML = resultadoVale;
    extraNumber.innerHTML = resultadoTotalExtra;
    pagamentoNumber.innerHTML = resultadoPagamento;

    salarioInput.innerHTML = salarioHoraInput.value;
    horasInput.innerHTML = quantidadeHorasInput.value;
    extraInput.innerHTML = quantidadeExtraInput.value;


    showOrHideResults();

});


clearBtn.addEventListener("click", (e) => {
    e.preventDefault();

    cleanInputs();
});


backBtn.addEventListener("click", (e) => {
    cleanInputs();
    showOrHideResults();
});
console.log;