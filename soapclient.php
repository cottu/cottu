<?php
// Creiamo un client SOAP
$client = new SoapClient('http://localhost/soapserver.php?wsdl'); 

// Recuperiamo i dati dall'utente (importo e valuta da convertire)
$amount = 100; // Sostituisci con l'importo da convertire
$currency = 'USD'; // Sostituisci con la valuta di destinazione, per esempio 'USD'

// Chiamata al metodo del server per effettuare la conversione
try {
    $result = $client->convertCurrency($amount, $currency);
    echo "L'importo di $amount EUR è equivalente a $result $currency.";
} catch (SoapFault $e) {
    echo "Errore nel servizio: " . $e->getMessage();
}
?>
