$.ajaxSetup({
    beforeSend: function (xhr, settings) {
        if (!csrfSafeMethod(settings.type)) {
            xhr.setRequestHeader("X-CSRFToken", document.getElementById('csrftoken').value);
        }
    }
});

function csrfSafeMethod(method){
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

//var doctor = $("#doctorselect").val();

var regArray = []; // global array
function getdata() {
     
    var nn = document.getElementById('name').value;
    var xx = document.getElementById('contact').value;
    var ee = document.getElementById('emailid').value;
    var doctor = document.getElementById('doctorselect').value;
// {#            var gender_M = document.getElementById('gender_M').checked ;#}
// {#            var gender_F = document.getElementById('gender_F').checked ;#}

    var Gender ;

    if (gender=document.getElementById('gender_F').checked ) {
        Gender = "Female"  ;
    }
    else {
        Gender = "Male" ;
    }
    if ((nn>='a' && nn<='z') || (nn>='A' && nn<='Z')) {
       // name == nn ;
    }
    else {
        $("#error_message").append('<div class="alert alert-danger"> Not a valid Name  </div>');
        return false;
    }
    // CONTACT NUMBER VALIDATION OF PATIENTS
    if  (xx.length===10) {
        // contact = xx ;
    }
    else if (xx== '')  {
        console.log(xx);
        $("#error_message").append(' <div class="alert alert-danger"> Phone Number field cannot be left Blank  </div>');
        return false;
    }
    else {
        console.log('done');
        $("#error_message").append(' <div class="alert alert-danger"> Not a valid Phone Number </div>');
        return false;
    }

    var atpos = ee.indexOf("@");
    var dotpos = ee.lastIndexOf(".");
    if (atpos<1 || dotpos<atpos+2 || dotpos+2>=ee.length) {
        //alert("Not a valid e-mail address");
        $("#error_message").append(' <div class="alert alert-danger" role="alert"> Not a valid e-mail address</div>');

        return false;
    }
    // json object
   // var data = {"name":nn,"contact":xx,"emailid":ee, "gender" : Gender} ;

    var data = {"name":nn,"contact":xx,"emailid":ee, "gender" : Gender, "doctor": doctor } ;
    var data1 = regArray.push(data) ;
    console.log(data1);

    $.ajax({
        url: "/register/",
        type: "POST",
        data: {'data': JSON.stringify(data)},
        //data:{"name":nn,"contact":xx,"emailid":ee, "gender" : gender},
        success: function (result) {
            if (result == 1) {
                alert("done");
            }
            else {
                alert("error");
            }

        }
    });  
}


function getdoctor() {
   
    var nn = document.getElementById('name').value;
    var dd = document.getElementById('degree').value;
    var ss = document.getElementById('speciality').value;

    if ((nn>='a' && nn<='z') || (nn>='A' && nn<='Z')) {
       // name == nn ;
    }
    else {
        $("#error_message").append('<div class="alert alert-danger"> Not a valid Name  </div>');
        return false;
    }
  

    var data = {"name":nn,"degree":dd,"speciality":ss} ;
    var data1 = regArray.push(data) ;
    console.log(data1);

    $.ajax({
        url: "/doctorRegister/",
        type: "POST",
        data: {'data': JSON.stringify(data)},
        //data:{"name":nn,"contact":xx,"emailid":ee, "gender" : gender},
        success: function (result) {
            if (result == 1) {
                alert("done");
            }
            else {
                alert("error");
            }

        }
    }); 
}

function ControllerToHtml() {
    $("#doctorselect").empty();
    $.ajax({
        url : "/dataFromConToHtml/",
        type : "GET" , 
        success : function (doctors) {
            if (doctors!="" && doctors != null) {
                //console.log(doctors);
                for (i = 0; i < doctors.length; i++) {
                    //console.log(doctors[i])
                    //console.log(doctors[i])
                    $("#doctorselect").append('<option value="'+doctors[i].id+'">'+doctors[i].name+'</option>');
                }
            }

        }
    });
}

var patientArray = [];
function listTable(){
    $.ajax({
        url : "/dataFromConToHtmlList/" ,
        type : "GET" ,
        success : function(patients) {
            console.log(patients);
            patientArray = patients
            for (i=0; i<patients.length ; i++) {

                var x="";
                if( typeof(patients[i].doctor) != 'undefined' && patients[i].doctor != null )   {
                    x = patients[i].doctor.name ;
                } ;

                $("#patientlist").append('<tr> <td> '+ patients[i].name+' </td> <td>'+ patients[i].contact+' </td> <td>'+patients[i].emailid+'</td> <td>'+patients[i].gender+' </td> <td> '+x+' </td> ' +
                    ' <td> <button type= "button" class="btn btn-primary" onclick="delete1('+patients[i].id+')">Delete</button> </td> ' +
                    ' <td> <button type= "button" class="btn btn-primary" onclick ="edit('+i+')" data-toggle="modal" data-target="#myModal" >Edit</button> </td> </tr>');

                //console.log(patients[i].doctor);
            }
        }
    });


}


function edit(index)
        {
            var pateinetDetails = patientArray[index];
            console.log(pateinetDetails);

            document.getElementById('name').value = pateinetDetails.name ;
            document.getElementById('contact').value = pateinetDetails.contact;
            document.getElementById('emailid').value = pateinetDetails.emailid;
            
            document.getElementById('patientID').value = pateinetDetails.id ;

            if(pateinetDetails.gender=="Male"){
                document.getElementById('gender_M').checked = true ;
            }
            else {
                document.getElementById('gender_F').checked = true ;
            }

            document.getElementById('doctorselect').value = pateinetDetails.doctor.id ;
        }

 function updatePatientDetails() {
    var nn = document.getElementById('name').value;
    var xx = document.getElementById('contact').value;
    var ee = document.getElementById('emailid').value;
    var id = document.getElementById('patientID').value ;
    var Gender ;

    if (gender=document.getElementById('gender_F').checked ) {
        Gender = "Female"  ;
    }
    else {
        Gender = "Male" ;
    }
    var doctor = document.getElementById('doctorselect').value;
    var data = {"name":nn,"contact":xx,"emailid":ee, "gender" : Gender, "doctor": doctor , "id": id } ;
    $.ajax({
        url: "/updatePatientDetails/" ,
        type: "POST",
        data: {'data': JSON.stringify(data)},
        success: function (result) {
            if (result == 1) {
                alert("done");
                window.location.reload();
            }
            else {
                alert("error");
            }

        }
    }); 
 }


  function delete1(id)
        {
            $.ajax({
                url : "/delete/?id="+ id,
                type : "GET",
                success: function (result) {
                    if (result==1) {
                        window.location.reload();
                    }
                    else {
                        alert (" Not deleted " );
                    }

                }
            });
         }

