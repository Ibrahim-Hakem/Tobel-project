<?php
    session_start();
    echo $_POST['password'];
    if (isset($_POST['password'])){
        echo hash('sha256' ,$_POST["password"]);

    }



?>