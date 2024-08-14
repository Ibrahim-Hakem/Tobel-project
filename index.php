<?php
    session_start();

    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true){
        header("Location: landing.php");
    }
?>


<html lang="fr">
<head>
    <meta charset="UTF-8">
    
 
    <style>
    <?php require_once('css/style.css');
          require_once('css/style_base.css');?>
    form{
        justify-content: space-around;
        height: 80%;
    }
    section.inscription{
        height: 75%;
    }
    </style>
            <link rel = "icon" href = "premier_logo_Tobel.png" type = "image/x-icon">
    <title>Connexion à Tobel</title>
</head>
<body>
    <section class="inscription">
        <header>
            Connexion au Compte
        </header>
        <form action="connexion.php" method="post">
            <fieldset>
                <div>
                    <label for="email">Adresse e-mail</label>
                    <input type="email" name="email" id="email" title="Veuillez renseigner votre adresse e-mail" placeholder="Adresse e-mail" >                     
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <label for="password">Mot de Passe</label>
                    <input type="password" name="password" id="password" title="Veuillez renseigner votre mot de passe" placeholder="Mot de passe" >                    
                </div>
            </fieldset>
            <fieldset>
                <div>
                    <input type="submit" value="se connecter">
                    <a href="inscription.php">inscription</a>
                </div>
            </fieldset>

        </form>
    </section>
    <section class="left">
        <h1>Tobel</h1>
        <p>Bienvenue sur Tobel, sur ce site, vous allez pouvoir discuter avec vos amis sans limite.</p>
        <p>Si vous voulez signaler un bug ou demander un nouvel ajout, contactez l'auteur du site ici.</p>

    </section>
</body>
</html>