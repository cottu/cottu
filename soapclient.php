<?php

$client = new SoapClient('http://localhost/soapserver.php?wsdl'); 


$amount = 100; 
$currency = 'USD'; 

// Converto
try {
    $result = $client->convertCurrency($amount, $currency);
    echo "L'importo di $amount EUR è equivalente a $result $currency.";
} catch (SoapFault $e) {
    echo "Errore nel servizio: " . $e->getMessage();
}
?>
