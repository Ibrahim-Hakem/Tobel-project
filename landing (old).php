<?php
    require_once('User.php');
    require_once('config.php');

    if(!isset($_SESSION['user'])){
        header("Location:index.php");
    }
    
      
?>

<html lang="fr">

<head>
    <meta charset="UTF-8">
    <style>
        <?php 
            require('css/style_base.css');
            require("css/style_landing.css"); 
        ?>
    </style>
    <title>Tobel</title>
    
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="icon" href="premier_logo_Tobel.png" type="image/x-icon">
</head>


<body id="body">
    <a href="disconnect.php">Se déconnecter</a><br>
<?= htmlspecialchars($_SESSION['user']->getPseudo()); ?>
<form method="post" action="" class="sending-message">
    <textarea name="message" id="massage" cols="30" rows="10"></textarea>
    <input id="send-btn" type="submit" value="Envoyer">

<?php

    if (isset($_POST['message']) && isset($_SESSION['user']) && !empty($_POST['message']) && !empty($_SESSION['user'])) {
        $pseudo = htmlspecialchars($_SESSION['user']->getPseudo());
        $message = nl2br(htmlspecialchars($_POST['message']));

        try {
            $insert_message = $bdd->prepare('INSERT INTO messages(pseudo, message) VALUES(?, ?)');
            $insert_message->execute(array($pseudo, $message));
            echo "Message sent successfully!"; // Optional feedback
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage(); // Handle any errors
        }
    } else {
        echo "Please fill in all fields."; // Optional feedback
    }

?> 
</form>

<div class="chat">

</div>

<script src="js/landing__.js"></script>

</body>
</html>
