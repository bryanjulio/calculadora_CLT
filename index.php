<!DOCTYPE html>
<html lang="pt-br">

    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Calculadora de Salário Horista</title>
        <link rel="stylesheet" href="custom.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap"
            rel="stylesheet" />
        <script src="calc_ex.js" defer></script>
    </head>

    <body>
        <div class="container">
            <div id="calc-container">
                <h2>Calculadora de Salário Horista</h2>
                <form id="calc-form">
                    <div class="form-inputs">
                        <div class="form-control">
                            <label for="nome">Nome completo:</label>
                            <input type="text" name="nome" id="nome" placeholder="Digite seu nome completo" />
                        </div>
                        <div class="form-control">
                            <label for="salarioHora">Seu ganho por hora em R$:</label>
                            <input type="text" name="salarioHora" id="salarioHora"
                                placeholder="Digite o valor da sua hora" required />
                        </div>
                        <div class="form-control">
                            <label for="quantidadeHoras">Total de horas trabalhadas no mês:</label>
                            <input type="text" name="quantidadeHoras" id="quantidadeHoras"
                                placeholder="Digite o total de horas que você trabalha no mês" required />
                        </div>
                        <div class="form-control">
                            <label for="quantidadeExtra">Horas extras realizadas:</label>
                            <input type="text" name="quantidadeExtra" id="quantidadeExtra"
                                placeholder="Digite a quantidade de horas extras feitas no mês" required />
                        </div>
                    </div>
                    <div class="action-control">
                        <button id="clear-btn">Limpar</button>
                        <button id="calc-btn">Calcular</button>
                    </div>
                </form>
            </div>
            <div id="nomecontainer" class="hide">
                <p id="nome-usuario"> <span></span></p><br>
            </div>
            <hr class="hide">
            <div id="result-container" class="hide">
                <!-- SALÁRIO SEM ACRESCIMO OU DESCONTO: R$<p id="salario-number">    <span></span></p><br> -->
                SALÁRIO LÍQUIDO R$<p id="pagamento-number"> <span></span></p><br>
                SALÁRIO BRUTO: R$<p id="salario-bruto"> <span></span></p><br>
                ADICIONAL H/ EXTRAS: R$<p id="extra-number"> <span></span></p><br>
                <!-- A RECEBER D/ VALE: R$<p id="vale-number">  <span></span></p><br> -->

                <div>
                    <h3>Base:</h3>
                </div>
                <br>
                Valor/Hora em R$:<p id="salario-input"> <span></span></p><br>
                Horas trabalhadas no mês:<p id="horas-input"> <span></span></p><br>
                Horas extras realizadas no mês:<p id="extra-input"> <span></span></p><br>

                <h1 style="text-align: center;">Tabela descontos INSS</h1>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody id="tabela-corpo">
                        <!-- Os dados da tabela serão preenchidos aqui -->
                    </tbody>
                </table>
                <button id="back-btn">Voltar</button>
            </div>
        </div>


    </body>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script>
        $(document).ready(function () {
            $.ajax({
                url: 'scraping.php', // Substitua pelo caminho correto
                dataType: 'json',
                success: function (data) {
                    // Limpa o corpo da tabela
                    $('#tabela-corpo').empty();

                    // Loop para adicionar os dados à tabela
                    $.each(data, function (index, row) {
                        var valores = row.valores;
                        var aliquota = row.aliquota;

                        // Cria uma nova linha na tabela
                        var newRow = '<tr><td>' + valores + '</td><td';

                        if (index >= 1) {
                            newRow += ' class="aliquota-align-right"';
                        }

                        newRow += '>' + aliquota + '</td></tr>';

                        // Adiciona a linha à tabela
                        $('#tabela-corpo').append(newRow);
                    });
                }
            });
        });

    </script>




</html>