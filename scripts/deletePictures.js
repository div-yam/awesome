
function deletePhotos()
{
	var q;
	for(q=0;q<my_photo_count;q++)
	{   var DelRef = storageRef.child('images'+'/'+arr[q]);
        DelRef.delete().then(function() {
		// File deleted successfully
		console.log("Images Deleted")
	  }).catch(function(error) {
		// Uh-oh, an error occurred!
	  });
	}
}




function deletePhotosDatabase()
{
	firebase.database().ref('/images').once('value', function(snapshot) {
		snapshot.forEach(function(childSnapshot) {
			var childKey = childSnapshot.key;
			var childData = childSnapshot.val();
			console.log("Entry :"+childSnapshot.key);
			console.log("Entry :"+childSnapshot.val().author);

			if(childSnapshot.val().author == firebase.auth().currentUser.uid)
			{
				firebase.database().ref('/images/'+childSnapshot.key).remove();
				console.log("Deleted"+childSnapshot.val().name);
				
				
			}
		});
	});
	setTimeout(function() {
		location.reload();				
		}, 1000);
}
