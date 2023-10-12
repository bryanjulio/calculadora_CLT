$(document).ready(function () {
	fetch("scraping.php")
		.then((response) => response.json())
		.then((data) => {
			const formattedData = data.map((item, index) => {
				if (index === 0) {
					return item;
				} else if (index === 1) {
					// Elimina caracteres não numéricos do item 1
					item.valores = item.valores.replace(/[^0-9.,]/g, "");
					return item;
				} else {
					const valores = item.valores.replace(
						/.*?([\d.,]+).*?([\d.,]+)$/,
						"$2"
					);
					item.valores = valores;
					return item;
				}
			});

			for (let key in formattedData) {
				if (formattedData.hasOwnProperty(key)) {
					// Verificar se a chave 'valores' existe em cada objeto
					if (formattedData[key].valores) {
						// Remover os pontos dos valores e substituir vírgulas por pontos
						formattedData[key].valores = formattedData[key].valores
							.replace(/\./g, "")
							.replace(",", ".");
					}
				}
			}

			const elements = {
				nome: $("#nome"),
				salarioHora: $("#salarioHora"),
				quantidadeHoras: $("#quantidadeHoras"),
				quantidadeExtra: $("#quantidadeExtra"),
				calcBtn: $("#calc-btn"),
				clearBtn: $("#clear-btn"),
				calcContainer: $("#calc-container"),
				resultContainer: $("#result-container"),
				nameContainer: $("#nomecontainer"),
				salarioNumber: $("#salario-number span"),
				valeNumber: $("#vale-number span"),
				extraNumber: $("#extra-number span"),
				pagamentoNumber: $("#pagamento-number span"),
				salarioBrutoNumber: $("#salario-bruto"),
				salarioInput: $("#salario-input span"),
				horasInput: $("#horas-input span"),
				extraInput: $("#extra-input span"),
				nomeUser: $("#nome-usuario span"),
				backBtn: $("#back-btn"),
			};

			function updateResult() {
				const nome = elements.nome.val();
				const salarioHora = elements.salarioHora.val().replace(",", ".");
				const quantidadeHoras = elements.quantidadeHoras
					.val()
					.replace(",", ".");
				const quantidadeExtra = elements.quantidadeExtra
					.val()
					.replace(",", ".");

				if (!salarioHora || !quantidadeHoras || !quantidadeExtra) return;

				const resultadoSalario = (salarioHora * quantidadeHoras).toFixed(2);
				const resultadoVale = (salarioHora * quantidadeHoras * 0.4).toFixed(2);
				const resultadoTotalExtra = (salarioHora * quantidadeExtra).toFixed(2);

				var salario = salarioHora * quantidadeHoras;
				// Itere sobre o objeto de dados e encontre a alíquota apropriada

				salario = parseFloat(salario);

				let descontoInss = 0;
				for (let i = 1; i < formattedData.length; i++) {
					const limiteSuperior = parseFloat(formattedData[i].valores);
					
                    const aliquota =
						parseFloat(formattedData[i].aliquota.replace(",", ".").replace("%", "")) /
						100;
                    console.log(salario);
					console.log(aliquota);
					console.log(limiteSuperior);
					if (salario <= limiteSuperior) {
						descontoInss = salario * aliquota;
						break; // Pare a iteração quando encontrar a alíquota adequada.
					}else{
                         descontoInss = 0;
                    }
				}
                 console.log(descontoInss);
				const resultadoPagamento = (
					salario +
					salarioHora * quantidadeExtra -
					descontoInss
				).toFixed(2);
				const resultadoBruto = (
					salarioHora * quantidadeHoras +
					salarioHora * quantidadeExtra
				).toFixed(2);

				elements.nomeUser.text(`Olá ${nome}!`);
				elements.salarioNumber.text(resultadoSalario);
				elements.valeNumber.text(resultadoVale);
				elements.extraNumber.text(resultadoTotalExtra);
				elements.pagamentoNumber.text(resultadoPagamento);
				elements.salarioBrutoNumber.text(resultadoBruto);

				elements.salarioInput.text(salarioHora);
				elements.horasInput.text(quantidadeHoras);
				elements.extraInput.text(quantidadeExtra);

				elements.calcContainer.addClass("hide");
				elements.resultContainer.removeClass("hide");
				elements.nameContainer.removeClass("hide");
			}

			function cleanInputs() {
				for (const key in elements) {
					if (elements[key].is("input")) {
						elements[key].val("");
					}
				}

				elements.extraNumber.removeClass("hide");
				elements.pagamentoNumber.removeClass("hide");
				elements.nomeUser.removeClass("hide");
				elements.calcContainer.removeClass("hide");
				elements.resultContainer.addClass("hide");
				elements.nameContainer.addClass("hide");
			}

			elements.nome.keypress(function (e) {
				const keyCode = e.keyCode ? e.keyCode : e.which;
				if (keyCode > 47 && keyCode < 58) {
					e.preventDefault();
				}
			});

			$(document).keypress(function (e) {
				if (e.key === "Enter") {
					elements.calcBtn.click();
				}
			});

			const inputs = [
				elements.salarioHora,
				elements.quantidadeHoras,
				elements.quantidadeExtra,
			];

			inputs.forEach(function (el) {
				el.on("input", function (e) {
					const updatedValue = el.val().replace(/[^0-9,]/g, "");
					el.val(updatedValue);
				});
			});

			elements.calcBtn.click(function (e) {
				e.preventDefault();
				updateResult();
			});

			elements.clearBtn.click(function (e) {
				e.preventDefault();
				cleanInputs();
			});

			elements.backBtn.click(function (e) {
				cleanInputs();
			});
		})
		.catch((error) => {
			console.error("Ocorreu um erro:", error);
		});
});
