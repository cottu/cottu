<?php
// Importiamo il file WSDL (Web Service Definition Language)
$wsdl = 'http://localhost/wsdl/valuta.wsdl'; // Aggiungi il percorso corretto del file WSDL

// Funzione per recuperare i tassi di cambio da BCE
function getExchangeRates($currency) {
    // Recuperiamo il file XML dalla BCE
    $xml = simplexml_load_file("http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml");

    // Verifica che il file XML sia stato caricato correttamente
    if (!$xml) {
        throw new Exception('Impossibile caricare i tassi di cambio');
    }

    // Cicliamo attraverso le valute nel file XML e recuperiamo il tasso per la valuta desiderata
    foreach ($xml->Cube->Cube->Cube as $rate) {
        if ($rate['currency'] == strtoupper($currency)) {
            return (float)$rate['rate'];
        }
    }

    throw new Exception('Valuta non trovata');
}

// Definiamo la classe del servizio SOAP
class CurrencyConverter {
    public function convertCurrency($amount, $currency) {
        // Convertiamo il valore passato in Euro (base)
        $rate = getExchangeRates($currency);
        return $amount * $rate;
    }
}

// Creiamo un server SOAP
$server = new SoapServer($wsdl); // Usa il file WSDL
$server->setClass('CurrencyConverter'); // Impostiamo la classe che gestirà le richieste
$server->handle(); // Gestiamo la richiesta SOAP
?>
