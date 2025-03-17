<?php
    require_once('User.php');
    require_once('config.php');

    if(!isset($_SESSION['user'])){
        header("Location:index.php");
    }
    
      
?>