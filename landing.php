<?php
    require_once('User.php');
    require_once('config.php');

    if(!isset($_SESSION['user'])){
        header("Location:index.php");
    }
    
      
?>


<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/landing.css">
    <link rel="icon" href="premier_logo_Tobel.png" type="image/x-icon">

    <title>Landing Page</title>
</head>
<body>

    <section class="menu">
        <header class="header-title">
            <div class="logo">
                <img src="img/logo/tobel-high-resolution-logo-transparent (1).png" alt="">
            </div>
        </header>
        <div class="nav-bar">
            <div class="user">
                <img src="img/logo/ishak_photo_profile.png" alt="photo profile" class="profile-photo">
                <p class="username"><?= htmlspecialchars($_SESSION['user']->getPseudo());?></p>
            </div>
            <hr>
            <nav >
                <ul class="sidebar">
                    <li><img src="img/icons/chercher.png" alt="">Chercher</li>
                    <li><img src="img/icons/accueil.png" alt="">Accueil</li>
                    <li><img src="img/icons/ajouter.png" alt="">Créer un Post</li>
                    <li><img src="img/icons/commenter.png" alt="">Messages</li>
                    <li><img src="img/icons/reglage.png" alt="">Réglage</li>
                    <li><a href="disconnect.php"><img src="img/icons/se-deconnecter.png" alt="">Déconnecter</a></li>
                </ul>
            </nav>
        </div>
    </section>

    <div class="menu2flex"></div>


    <section class="feed">
        <!-- Future Option to make posts -->
        <button id="activate-notif">Activer Notification</button>
    </section>

    <section class="public-chat">
        <header class="public-chat-header">
            Chat Public
        </header>
        
        <div class="chat">
            <div class="outgoing">
                <div class="details">
                    <p>Hello admin, I have things to say</p>
                </div>
            </div>
        
            <div class="incoming">
                <div class="details">
                    <img src="img/logo/profile-photo-ibrahim.jpg" alt="">
                    <p><b>Admin: </b>I am admin ! Je peux vraiment parler énorment mon cher amie</p>
                </div>
            </div>
        
        </div>
        <hr>
        <form method="post" action="#" class="sending-message">
            <input type="text" autocomplete="off" placeholder="Type message..." name="message" id="massage"></input>
            <button id="send-btn"><img src="img/icons/telegram-plane-brands-solid-white.svg" alt="Envoyé"></button>
            <?php

            if (isset($_POST['message']) && isset($_SESSION['user']) && !empty($_POST['message']) && !empty($_SESSION['user'])) {
                $pseudo = htmlspecialchars($_SESSION['user']->getPseudo());
                $message = nl2br(htmlspecialchars($_POST['message']));

                try {
                    $insert_message = $bdd->prepare('INSERT INTO messages(pseudo, message) VALUES(?, ?)');
                    $insert_message->execute(array($pseudo, $message));
                    header("Location: landing.php");
                    exit();
                    echo "Message sent successfully!"; // Optional feedback
                } catch (PDOException $e) {
                    echo "Error: " . $e->getMessage(); // Handle any errors
                }
            } 
            ?> 
        </form>

    </section>

<script src="js/landing__.js"></script>

</body>
</html>