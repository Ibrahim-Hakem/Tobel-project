<?php
    
    require_once "config.php";
    require_once('User.php');

    $currentDateTime = new \DateTime();

    //set timeZone
    $currentDateTime->setTimezone(new \DateTimeZone('Europe/Paris'));

   
    if ($_POST["email"] == ""){
        $_POST["email"] == NULL;
    }
    if (isset($_POST["email"]) && isset($_POST["password"]) && !empty($_POST["email"]) && !empty($_POST["password"])){
        //$ip = getIPAddress();  
        
        $email = htmlspecialchars($_POST["email"]);
        $password = htmlspecialchars($_POST["password"]);
        
        $check = $bdd->prepare("SELECT * FROM utilisateur WHERE email = ?");
        $check->execute([$email]);
        $data = $check->fetch();    
        $row = $check->rowCount();
        

        if ($row == 1){
            if (filter_var($email, FILTER_VALIDATE_EMAIL)){
                $password = hash('sha256', $password);
                
                if ($data["password"] === $password){
                    $every_thing = $bdd->prepare('SELECT * FROM utilisateur;');
                    $every_thing->execute();
                    $_SESSION['data'] = $every_thing->fetchAll();
                    $_SESSION['logged_in'] = false;
                    if ($_SESSION['logged_in'] === false){
                        $_SESSION['user'] = new User($data);
                        $_SESSION['logged_in'] = true;


                    } 
                    header("Location:landing.php");                
                    
                }else header("Location:index.php?login_err=password");
            }else header("Location:index.php?login_err=email");
        } else header("Location:index.php?login_err=already");

    }else header("Location:index.php");