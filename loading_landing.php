<?php 
    require_once("User.php");
    require_once("config.php");
    


    $allmsgs = $bdd->query("SELECT * FROM messages ORDER BY id ASC;");
    $user = $_SESSION['user'];
    while ($msg = $allmsgs->fetch()){
        if ($user->getPseudo() == $msg['pseudo']){
            echo "<div class='outgoing'>";
            echo "<div class='details'>";
            echo "<p title=' ".$msg['date_publication']." '>" . $msg['message'] . "</p>";
            echo "</div>";
            echo "</div>";
        }
        else {
            echo "<div class='incoming'>";
            echo "<div class='details'>";
            echo "<p title=' ".$msg['date_publication']." '><b>" . $msg['pseudo'] . ":</b> " . $msg['message'] . "</p>";
            echo "</div>";
            echo "</div>";
        }

    }

    
?>