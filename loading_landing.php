<?php 

    require_once("php/Component/header.php");
    


    $allmsgs = $bdd->query("SELECT * FROM messages ORDER BY id ASC;");
    $user = $_SESSION['user'];
    while ($msg = $allmsgs->fetch()){


        
        $msgPseudo = $msg['pseudo'];
        try {
            if (isset($msg['sender']) && !empty($msg['sender'])){
                $sender = $msg['sender'];
                $userQuery = $bdd->prepare("SELECT * FROM utilisateur WHERE email = :sender");
                $userQuery->execute(['sender' => $sender]);
                $userData = $userQuery->fetch();
                $msgPseudo = $userData['pseudo'];
        
            }
            

        }
        catch (Error){
            $msgPseudo = $msg['pseudo'];
        }


        if ($user->getEmail() == $msg['sender']){
            echo "<div class='outgoing'>";
            echo "<div class='details'>";
            echo "<p title=' ".$msg['date_publication']." '>" . $msg['message'] . "</p>";
            echo "</div>";
            echo "</div>";
        }
        else {
            echo "<div class='incoming'>";
            echo "<div class='details'>";
            echo "<img src='img/bdd/" . $userData['profile_photo'] . " '>";
            echo "<p title=' ". $msg['date_publication'] ." '><b>". $msgPseudo ." : </b>". $msg['message'] ."</p>";
            echo "</div>";
            echo "</div>";
        }

    }

    
?>