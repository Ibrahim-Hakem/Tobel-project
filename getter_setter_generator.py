



def getter_generator(*get_values):
    for i in range(len(get_values)):
        text = "public function get"+ get_values[i][0].upper()+ get_values[i][1:] +"() {return $this->_"+ get_values[i] +";}"
        print(text)

def setter_generator(*set_values):
    for i in range(len(set_values)):
        capital_text = set_values[i][0].upper()+ set_values[i][1:]
        text = "public function set"+ capital_text +"(string $new"+ capital_text +") {$this->_"+ set_values[i] + " = $new"+ capital_text +";}"
        print(text)



def construct_generator(*construct_values):
    for i in range(len(construct_values)):
        capital_text = construct_values[i][0].upper()+ construct_values[i][1:]
        text = "$this->set" + capital_text + "($data["+ str(i) +"]);"
        print(text)



construct_generator("id", "pseudo", "email", "password", "ip", "dateInscription", 
"firstName", "lastName", "classe", "averageNote", "birthDay")      
