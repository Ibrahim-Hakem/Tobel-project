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
    <script src="js/landing.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="icon" href="premier_logo_Tobel.png" type="image/x-icon">
</head>


<body id="body">
    <a href="disconnect.php">Se déconnecter</a><br>
<?= htmlspecialchars($_SESSION['user']->getPseudo()); ?>
<form method="post" action="">
<textarea name="message" id="massage" cols="30" rows="10"></textarea>
<input type="submit" value="Envoyer">

<?php
    if (isset($_POST['message']) && isset($_SESSION['user']) && !empty($_POST['message']) && !empty($_SESSION['user'])){
    $pseudo = htmlspecialchars($_SESSION['user']->getPseudo());
    $message = nl2br(htmlspecialchars($_POST['message']));
    
    $insert_message = $bdd->prepare('INSERT INTO messages(pseudo, message) VALUES(?, ?)');
    $insert_message->execute(array($pseudo, $message));
    
    ?> 
    


    
    <script>
        let ajax = XMLHttpRequest();
        let body = document.getElementsByTagName("body");

        ajax.onload(function() {
            if (this.status == 200 && this.readyState == 4){
                document.innerHTML = ajax.responseText;
            }
        });

        ajax.open("POST", "test.txt", true);
        ajax.send();
    </script>
    
    <?php
    }

?> 


</form>
</body>
</html>
