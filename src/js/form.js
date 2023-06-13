function sprawdz() {
    
    var form =  document.querySelector('form');
  
    if (form.checkValidity()){
        var radioButtons = form.elements['radio']; 
        var selectedRadioId = null;

        for (var i = 0; i < radioButtons.length; i++) {
            if (radioButtons[i].checked) {
                selectedRadioId = radioButtons[i].id; 
                break;
            }
        }


        var formData = new FormData(form);
        var jsonObject = {};
        var bought=false;
        for (var entry of formData.entries()) {
            if (entry[0] === 'radio') {
                jsonObject[entry[0]] = selectedRadioId;
            }else {
                jsonObject[entry[0]] = entry[1];
                if(entry[0] === 'k1'||entry[0] === 'k2'||entry[0] === 'k3' || entry[0] === 'k4')
                    bought=true;
            }
        }
        if(bought)
            return jsonObject;
        alert("Wybierz co najmniej jedeną książkę");
        return null;
    }else{
        form.reportValidity();
        return null;
    }
  
};

function zapisz() {
    var output = sprawdz();
    if (output !== null) {
        var list;
        if (localStorage.getItem("formularz") === null)
            list = [];
        else
            list = JSON.parse(localStorage.getItem("formularz"));

        list.push(output);

        localStorage.setItem("formularz", JSON.stringify(list));
        loadData();
    }
}
function editData(index){
    document.getElementById("save").style.display="none";
    document.getElementById("update").style.display="block";
    var data;
    if (localStorage.getItem("formularz") === null)
        data = [];
    else 
        data = JSON.parse(localStorage.getItem("formularz"));
    
    document.getElementById("naz").value=data[index].naz;
    document.getElementById("mail").value=data[index].email;
    document.getElementById("tel").value=data[index].tel;
    document.getElementById("adres").value=data[index].adres;
    document.getElementById("k1").checked=data[index].k1 !== undefined ? true:false;
    document.getElementById("k2").checked=data[index].k2 !== undefined ? true:false;
    document.getElementById("k3").checked=data[index].k3 !== undefined ? true:false;
    document.getElementById("k4").checked=data[index].k4 !== undefined ? true:false;
    document.getElementById(data[index].radio).checked = true;
    document.getElementById("more").value=data[index].more;
    
    document.querySelector("#update").addEventListener("click",function(){
        var output=sprawdz();

        if(output !== null){
            data[index].naz=document.getElementById("naz").value;
            data[index].email=document.getElementById("mail").value;
            data[index].tel=document.getElementById("tel").value;
            data[index].adres=document.getElementById("adres").value;
            document.getElementById("k1").checked ? data[index].k1 =true:false;
            document.getElementById("k2").checked ? data[index].k2 =true:false;
            document.getElementById("k3").checked ? data[index].k3 = true:false;
            document.getElementById("k4").checked ? data[index].k4 = true:false;
            var radioButtons = document.querySelector('form').elements['radio']; 
            var selectedRadioId = null;
            for (var i = 0; i < radioButtons.length; i++) {
                if (radioButtons[i].checked) {
                    selectedRadioId = radioButtons[i].id; 
                    break;
                }
            }
            data[index].radio=selectedRadioId;
            data[index].more=document.getElementById("more").value;
            
            document.getElementById("save").style.display="block";
            document.getElementById("update").style.display="none";
            localStorage.setItem("formularz", JSON.stringify(data));
            loadData();
        }
       
    });
   
    
}
function deleteData(index){
    var data;
    if (localStorage.getItem("formularz") === null)
        data = [];
    else 
        data = JSON.parse(localStorage.getItem("formularz"));
    data.splice(index,1);
    localStorage.setItem("formularz",JSON.stringify(data));
    loadData();

}
function loadData(){
    var data;
    if (localStorage.getItem("formularz") === null)
        data = [];
    else 
        data = JSON.parse(localStorage.getItem("formularz"));


    var html = "";


    data.forEach(function (element, index) {
        html += "<tr><td>" + element.naz + "</td><td>" + element.email + "</td><td>" + element.tel + "</td><td>"
                + element.adres + "</td><td>";
        let bylo=false;
        if (element.k1 !== undefined){
            html += "Drużyna Pierścienia";
            bylo=true;
        }
        if (element.k2 !== undefined){
            bylo ? html+=",<br>" :bylo=true;
            html += "Dwie wieże";
        }    
        if (element.k3 !== undefined){
            bylo ? html+=",<br>" :bylo=true;
            html += "Powrót króla";
        }    
        if (element.k4 !== undefined){
            bylo ? html+=",<br>" :bylo=true;
            html += "Hobbit";
        }   
    
        html += "</td><td>" + element.radio + "</td><td>" + element.more + "</td><td><button onClick=\"editData("+index+")\">Edytuj</button><button onClick=\"deleteData("+index+")\">Usuń</button></td></tr>";
    });

    document.querySelector("#dane tbody").innerHTML = html;

}

