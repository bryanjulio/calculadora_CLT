<?php
require 'vendor/autoload.php';

use Goutte\Client;

// URL do site que você deseja fazer scraping
$url = 'https://www.gov.br/inss/pt-br/direitos-e-deveres/inscricao-e-contribuicao/tabela-de-contribuicao-mensal';

// Inicializa o cliente Goutte
$client = new Client();

// Faz uma solicitação HTTP GET para a página
$crawler = $client->request('GET', $url);

// Array para armazenar os dados da tabela
$data = [];

// Encontre a tabela com a classe "plain"
$table = $crawler->filter('table.plain');

if ($table->count() > 0) {
    // Itere pelas linhas da tabela
    $table->filter('tr')->each(function ($row) use (&$data) {
        // Extrai os valores das células (td) da linha
        $cell1 = $row->filter('td')->eq(0)->text();
        $cell2 = $row->filter('td')->eq(1)->text();

        // Verifique se a célula 1 não está vazia
        if (!empty($cell1)) {
            // Adicione os valores das células ao array de dados
            $data[] = [
                'valores' => $cell1,
                'aliquota' => $cell2,
            ];
        }
    });
} else {
    echo "Tabela não encontrada.";
}
$data = array_slice($data, 0, 5);
// Imprima o array de dados
echo json_encode($data);
?>
