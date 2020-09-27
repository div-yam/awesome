function upvote(names, users, views_para, upvotes_para, name_para, textdiv, unvote_btn, upvote_btn, img_author) {
firebase.database().ref('/images').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log("Entry :"+childSnapshot.key);
        console.log("Entry :"+childSnapshot.val().name);
        if(childSnapshot.val().name == names)
        {  var counter=0;
            if(childSnapshot.val().upvotes!=0) {
            if(childSnapshot.val().upvoter[users.uid]==users.uid)
            {
                counter++;
            }
         }
        if(counter==0){
        firebase.database().ref('images/'+childKey+'/'+'upvotes').transaction(function(currentUpvotes) {
            var updates = {};
            updates['images/' + childKey + '/upvoter/'+users.uid] = users.uid;
            updates['images/' + childKey + '/upvotes'] = childSnapshot.val().upvotes+1;
            
            return firebase.database().ref().update(updates);
        });
          var upvotes_display=childSnapshot.val().upvotes+1;
          var views_display=childSnapshot.val().views;
          views_para.innerHTML="";
          views_para.innerHTML="Views " + views_display;
          upvotes_para.innerHTML="";
          upvotes_para.innerHTML="Upvotes: "+upvotes_display;
          name_para.innerHTML="";
          name_para.innerHTML=img_author; 
          textdiv.appendChild(name_para);
          textdiv.appendChild(views_para);
          //textdiv.appendChild(upvotes_para);
          unvote_btn.style.display='block';
          upvote_btn.style.display='none';
          var user_uid=users.uid;
          
         
          unvote_btn.style.display='block';
          upvote_btn.style.display='none';
        } 
        }
    });
}); 
}

function unvote(names, users, views_para, upvotes_para, name_para, textdiv, unvote_btn, upvote_btn, img_author) {
firebase.database().ref('/images').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val();
        console.log("Entry :"+childSnapshot.key);
        console.log("Entry :"+childSnapshot.val().name);
        if(childSnapshot.val().name == names)
        {  var counter=0;
           if(childSnapshot.val().upvoter[users.uid]==users.uid)
            {
                counter++;
            }
        if(counter!=0){
        firebase.database().ref('images/'+childKey+'/'+'upvotes').transaction(function(currentUpvotes) {
        firebase.database().ref('/images/'+childKey+'/upvoter/'+users.uid).remove();
        console.log("Deleted"+childSnapshot.val().name);
        return currentUpvotes - 1;
        });
        
          var upvotes_display=childSnapshot.val().upvotes-1;
          var views_display=childSnapshot.val().views;
          views_para.innerHTML="";
          views_para.innerHTML="Views " + views_display;
          upvotes_para.innerHTML="";
          upvotes_para.innerHTML="Upvotes: "+upvotes_display;
          name_para.innerHTML="";
          name_para.innerHTML=img_author; 
          textdiv.appendChild(name_para);
          textdiv.appendChild(views_para);
          //textdiv.appendChild(upvotes_para);     
         
          unvote_btn.style.display='none';
          upvote_btn.style.display='block';
          } 
        }
        });
     }); 
}