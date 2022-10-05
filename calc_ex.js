//Selção de Elementos

const nomeInput = document.querySelector("#nome");
const salarioHoraInput = document.querySelector("#salarioHora");
const quantidadeHorasInput = document.querySelector("#quantidadeHoras");
const quantidadeExtraInput = document.querySelector("#quantidadeExtra");

const botaocalc = document.querySelector("#btncalcular");
const botaofecha = document.querySelector("#btnfecha");

const salarioNumber = document.querySelector("#salario-number span");
const valeNumber = document.querySelector("#vale-number span");
const extraNumber = document.querySelector("#extra-number span");
const pagamentoNumber = document.querySelector("#pagamento-number span");

const botaovoltar = document.querySelector("#btnvoltar")

const resultContainer = document.querySelector("#result-container");
const calcContainer = document.querySelector("#calc-container")

//FUNÇÕES

function validDigits(text) {
    return text.replace(/[^0-9,]/g, "");
}

function calcSalario(salarioHora, quantidadeHoras) {
    const salario = salarioHora * quantidadeHoras;

    return (salario);
}

function calcVale(salarioHora, quantidadeHoras) {
    const salario = salarioHora * quantidadeHoras;
    const vale = salario * (40 / 100);

    return (vale);
}

function calcTotalExtra(salarioHora, quantidadeExtra) {
    const totalExtra = salarioHora * quantidadeExtra;

    return (totalExtra);
}

function calcPagamento(salarioHora, quantidadeHoras, quantidadeExtra) {
    const totalExtra = salarioHora * quantidadeExtra;
    const salario = salarioHora * quantidadeHoras;
    const pagamento = (salario * (60 / 100) + totalExtra).toFixed(2);

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
}

function showOrHideResults() {
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}


//EVENTOS

[salarioHoraInput, quantidadeHorasInput, quantidadeExtraInput].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);
  
      e.target.value = updatedValue;
    });
  });

botaocalc.addEventListener("click", (e) => {
    e.preventDefault();

    const nome = nomeInput.value;
    const salarioHora = salarioHoraInput.value.replace(",", ".");
    const quantidadeHoras = quantidadeHorasInput.value.replace(",", ".");
    const quantidadeExtra = quantidadeExtraInput.value.replace(",", ".");

    console.log(nome, salarioHora, quantidadeHoras, quantidadeExtra)

    if (!salarioHora || !quantidadeHoras || !quantidadeExtra) return;

    const resultadoSalario = calcSalario(salarioHora, quantidadeHoras);
    const resultadoVale = calcVale(salarioHora, quantidadeHoras);
    const resultadoTotalExtra = calcTotalExtra(salarioHora, quantidadeExtra);
    const resultadoPagamento = calcPagamento(salarioHora, quantidadeHoras, quantidadeExtra);


    console.log(nome);
    console.log(resultadoSalario);
    console.log(resultadoVale);
    console.log(resultadoPagamento);
    

});




