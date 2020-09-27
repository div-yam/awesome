$('.closemodale').click(function (e) {
    e.preventDefault();
    $('.modale').removeClass('opened');
});
function loadModal(itemRef) {
    itemRef.getMetadata().then(function(itemMetadata){
    firebase.database().ref('images').once('value', function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    if( childData.name == itemMetadata.name)
    {firebase.database().ref('/images/' + childKey).once('value').then(function(snapshot) {
     document.getElementById("realnameModal").innerHTML=""
     document.getElementById("realnameModal").innerHTML = snapshot.val().realname;
     document.getElementById("tagsModal").innerHTML=""
     snapshot.val().tags.forEach(function(item) {
     document.getElementById("tagsModal").innerHTML += '#'+item;
     });
     document.getElementById("upvotesModal").innerHTML=""
     document.getElementById("upvotesModal").innerHTML = snapshot.val().upvotes+" Upvotes";
     }); 
     }
     });
    });
    });
}