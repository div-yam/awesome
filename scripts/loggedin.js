
var database = firebase.database();
pushDataRef = database.ref("/users");
pushDataRef.on("child_added", function(snapshot){
  //console.log("Below is the data from child_added");
  //console.log(snapshot.val());
  var users = firebase.auth().currentUser;
  //alert(users.email)
  var name_val = snapshot.val().email;
  var n = name_val.localeCompare(users.email);
  if(n==0)
  { //document.getElementById('delete-accounts').style.display='none';
    var un = snapshot.val().username;
    var str=un.charAt(0);
    //alert(str)
    document.getElementById("delete-account").style.display="inline-block"; 
   document.getElementById("delete-account").innerHTML = str;  
    //alert(un)
  }
  
    //alert(name_val)
});

