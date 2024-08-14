<?php 

    require_once("config.php");



    $allmsgs = $bdd->query("SELECT * FROM messages;");
    while ($msg = $allmsgs->fetch()){
    
    echo "<p><b>" . $msg['pseudo'] . "</b>: " . $msg['message'] . "</p>";
    
    }


?>