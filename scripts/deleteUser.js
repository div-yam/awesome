    function deleteUsers()
    {
      var user = firebase.auth().currentUser;
    //alert(user.email)
    firebase.database().ref('users/' + user.uid).remove();
    user.delete().then(() =>{
     alert("User Deleted")
      });
    }