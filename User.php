<?php

class User
{

    private $_id;
    private $_pseudo;
    private $_email;
    private $_password;
    private $_ip;
    private $_dateInscription;
    private $_firstName;
    private $_lastName;
    private $_classe;
    private $_averageNote;
    private $_birthDay;
    private $_profilePhoto;

    public function getId() {return $this->_id;}
    public function getPseudo() {return $this->_pseudo;}
    public function getEmail() {return $this->_email;}
    public function getPassword() {return $this->_password;}
    public function getIp() {return $this->_ip;}
    public function getDateIndscription() {return $this->_dateInscription;}
    public function getFirstName() {return $this->_firstName;}
    public function getLastName() {return $this->_lastName;}
    public function getClasse() {return $this->_classe;}
    public function getAverageNote() {return $this->_averageNote;}
    public function getBirthDay() {return $this->_birthDay;}
    public function getProfilePhoto() {return $this->_profilePhoto;}

    public function setId(int $newId) {$this->_id = $newId;}
    public function setPseudo(string $newPseudo) {$this->_pseudo = $newPseudo;}
    public function setEmail(string $newEmail) {$this->_email = $newEmail;}
    public function setPassword(string $newPassword) {$this->_password = $newPassword;}
    public function setIp(string $newIp) {$this->_ip = $newIp;}
    public function setDateInscription(string $newDateInscription) {$this->_dateInscription = $newDateInscription;}
    public function setFirstName(string $newFirstName) {$this->_firstName = $newFirstName;}
    public function setLastName(string $newLastName) {$this->_lastName = $newLastName;}
    public function setClasse(string $newClasse) {$this->_classe = $newClasse;}
    public function setAverageNote(float $newAverageNote) {$this->_averageNote = $newAverageNote;}
    public function setBirthDay(string $newBirthDay) {$this->_birthDay = $newBirthDay;}
    public function setProfilePhoto(string $newProfilePhoto) {$this->_profilePhoto = $newProfilePhoto;}



    public function __construct(array $data)
    {
        $this->setId($data[0]);
        $this->setPseudo($data[1]);
        $this->setEmail($data[2]);
        $this->setPassword($data[3]);
        $this->setIp($data[4]);
        $this->setDateInscription($data[5]);
        $this->setFirstName($data[6]);
        $this->setLastName($data[7]);
        $this->setClasse($data[8]);
        $this->setAverageNote($data[9]);
        $this->setBirthDay($data[10]);
        $this->setProfilePhoto($data[11]);
        
    }

}


?>