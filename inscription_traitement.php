<?php
    require_once 'config.php';

    require_once('User.php');

    function convert_month_to_num($month_text){
        switch ($month_text):
            case 'jan':
                return '01';
            case 'fév':
                return  '02';
            case 'mar':
                return '03';
            case 'avr':
                return '04';
            case 'mai':
                return '05';
            case 'jun':
                return '06';
            case 'jul':
                return '07';
            case 'aou':
                return'08';
            case 'sep':
                return '09';
            case 'oct':
                return '10';      
            case 'nov':
                return '11';  
            case 'déc':
                return '12';
 
        endswitch;
    }

    $currentDateTime = new \DateTime();

    //set timeZone
    $currentDateTime->setTimezone(new \DateTimeZone('Europe/Paris'));
    $dateTime = $currentDateTime->format('YYYY-MM-jj HH:ii:ss');


    if (isset($_POST['pseudo']) && isset($_POST['first_name']) && isset($_POST['last_name']) && isset($_POST['email']) && isset($_POST['password']) && isset($_POST['password_repeat']) && isset($_POST["day_of_birth"]) && isset($_POST["month_of_birth"]) && isset($_POST["year_of_birth"]) && isset($_POST["classe"])){
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $first_name = htmlspecialchars($_POST['first_name']);
        $last_name = htmlspecialchars($_POST['last_name']);
        $email = htmlspecialchars($_POST['email']);
        $password = htmlspecialchars($_POST['password']);
        $password_repeat = htmlspecialchars($_POST['password_repeat']);
        $day_of_birth = htmlspecialchars($_POST['day_of_birth']);
        $month_of_birth = htmlspecialchars($_POST['month_of_birth']);
        $year_of_birth = htmlspecialchars($_POST['year_of_birth']);
        $classe = htmlspecialchars($_POST['classe']);
        $month_numeric = convert_month_to_num($month_of_birth);
        if (strlen($day_of_birth) == 1){
            $day_of_birth = '0' . $day_of_birth;
        }

        $birth_day = strval($year_of_birth . '-' . $month_numeric . '-' . $day_of_birth);



        $check = $bdd->prepare("SELECT pseudo, email, password, first_name, last_name, birth_day FROM utilisateur WHERE email = ?");
        $check->execute([$email]);
        $data = $check->fetch();
        
        $row = $check->rowCount();
        $_SESSION['index'] = $data;
        if ($row == 0){
            
            if(strlen($pseudo) <= 100){
                if (strlen($email) <= 100){
                    if (filter_var($email, FILTER_VALIDATE_EMAIL)){
                        if ($password == $password_repeat){
                            
                            $password = hash('sha256', $password);
                            $ip = $_SERVER['REMOTE_ADDR'];
                            
                            $insert = $bdd->prepare('INSERT INTO utilisateur (pseudo, email, password, ip, date_inscription, first_name, last_name, classe, birth_day) VALUES(:pseudo, :email, :password, :ip, :date_inscription, :first_name, :last_name, :classe, :birth_day);');
                            $insert->execute(array(':pseudo' => $pseudo, ':email' => $email, ':password' => $password, ':ip' => $ip, ':date_inscription' => $dateTime, ':first_name' => $first_name, ':last_name' => $last_name, ':classe' => $classe, ':birth_day' => $birth_day));

                            if (isset($_POST['average_note']) && !empty($_POST['average_note'])){
                                $average_note = htmlspecialchars($_POST['average_note']);
                                $update_bdd = $bdd->prepare('UPDATE utilisateur SET average_note = :average_note WHERE email = :email;');
                                $update_bdd->execute(array(':average_note' => $average_note, ':email' => $email));
                            }
                            $every_thing = $bdd->prepare('SELECT * FROM utilisateur;');
                            $every_thing->execute(array());
                            $_SESSION['data'] = $every_thing->fetchAll();
                            
                            header("Location: landing.php");
                            
                            
                        } else header('Location: inscription.php?reg_err=password');
                    } else header('Location: inscription.php?reg_err=email');
                }else header('Location: inscription.php?reg_err=email_lenght');
            }else header('Location:inscription.php?reg_err=pseudo_lenght');
        }else header("Location: inscription.php?reg_err=already");
    }
    
?>