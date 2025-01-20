<?php
$wsdl = 'http://localhost/wsdl/valuta.wsdl'; 

function getExchangeRates($currency) {
    // Recupero il file XML dalla BCE
    $xml = simplexml_load_file("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");

    if (!$xml) {
        throw new Exception('Impossibile caricare i tassi di cambio');
    }
    foreach ($xml->Cube->Cube->Cube as $rate) {
        if ($rate['currency'] == strtoupper($currency)) {
            return (float)$rate['rate'];
        }
    }

    throw new Exception('Valuta non trovata');
}

class CurrencyConverter {
    public function convertCurrency($amount, $currency) {
        // Convertiamo il valore passato in Euro (base)
        $rate = getExchangeRates($currency);
        return $amount * $rate;
    }
}

// Creo un server SOAP
$server = new SoapServer($wsdl); 
$server->setClass('CurrencyConverter'); 
$server->handle(); 
?>
