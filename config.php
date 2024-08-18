<?php
    session_start();
    
    try 
    {
        $bdd = new PDO("mysql:host=127.0.0.1;dbname=tobel;charset=utf8;port=3306;charset=UTF8mb4", "root", "");
        $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
    }
    catch(Exception $e)
    {
        die('Erreur : '.$e->getMessage());       
    }
