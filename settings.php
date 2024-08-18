
<?php
    require_once('php/Component/header.php');
    
      
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/settings.css">
    <link rel="icon" href="premier_logo_Tobel.png" type="image/x-icon">
    <title>Settings - Tobel</title>
</head>
<body>
    
    <section class="menu">
        <header>
            <h3>Settings</h3>
            <button id="exit"><img src="img/icons/x.png" alt=""></button>
        </header>
        <div class="settings">
            
            <div class="account-info">
                <form method="post" action="#" enctype="multipart/form-data" autocomplete="off">
                    <div class="username">
                        <p>Votre pseudo est : <b><?= $_SESSION['user']->getPseudo() ?></b></p>
                        <input id="new-username-input" name="new-username" type="text" placeholder="Nouveau Pseudo">
                    </div>
                    
                    <div class="profile-photo">
                        <p>Votre photo de profile :</p> 

                        <img src=<?= "img/bdd/" . $_SESSION['user']->getProfilePhoto(); ?> alt="Photo Profile missing">
                        <input id="profile-photo-input" name="profile-photo-input" type="file">
                    </div>
                    <div class="submit-div">
                        <input type="submit" value="Sauvegarder">
                    </div>
                    <?php
                    
                    if (isset($_POST['new-username']) && !empty($_POST['new-username'])){
                        $id = $_SESSION['user']->getId();
                        $newPseudo = htmlspecialchars($_POST['new-username']);

                        $_SESSION['user']->setPseudo(htmlspecialchars($_POST['new-username']));
                        $stmt = $bdd->prepare("UPDATE utilisateur SET pseudo = :new_pseudo WHERE id = :id");
                                            // UPDATE `utilisateur` SET `pseudo` = 'Ibrahim (admin)' WHERE `utilisateur`.`id` = 1;
                        // Bind parameters
                        
                        $stmt->bindParam(':new_pseudo', $newPseudo);
                        $stmt->bindParam(':id', $id);
                        $stmt->execute();

                        header("Location: settings.php");
                        exit();
                    }
                    
                    if (isset($_FILES['profile-photo-input']) && $_FILES['profile-photo-input']['error'] == UPLOAD_ERR_OK){
                        $file_extention = strtolower(explode('.', $_FILES['profile-photo-input']['name'])[1]);
                        echo  $file_extention;
                        $fileTmpPath = $_FILES['profile-photo-input']['tmp_name'];

                        $correct_fileExetention = ['jpg', 'jpeg', 'png'] ;


                        if (in_array($file_extention, $correct_fileExetention)) {
                            $newFileName = "profile-photo-" . $_SESSION['user']->getId() . '.' . $file_extention;
                            $uploadFileDir = "img/bdd/";
    
                            $dest_path = $uploadFileDir . $newFileName;
                                
                            if (file_exists($dest_path)) {
                                unlink($dest_path); // Delete the existing file
                            }
    
                            if (move_uploaded_file($fileTmpPath, $dest_path)){
                                $stmt = $bdd->prepare("UPDATE utilisateur SET profile_photo = :profile_photo WHERE id = :id");
                                $stmt->bindParam(':profile_photo', $newFileName);
                                $stmt->bindParam(':id', $_SESSION['user']->getId());
                                $stmt->execute();
                                
                                $_SESSION['user']->setProfilePhoto($newFileName);
                                echo "<script>alert('File is successfully uploaded.');</script>";
                            }
                            else {
                                echo "<script>alert('Désolé, quelque chose s'est mal passé, veuillez réessayé votre image.')</script>";
                            }

                        }
                        else {
                            echo "<script>alert('Image non valide !')</script>";
                        }



                        header("Location: settings.php");
                        exit();
                    }
                    
                    ?>
                </form>
            </div>

        </div>
    </section>


<script src="js/settings__.js"></script>
</body>
</html>