function myImages() {
    var allPhotos=document.getElementById("header");
    while (allPhotos.firstChild) {
        allPhotos.removeChild(allPhotos.lastChild); } 
        bool_my_img="true";
    Photos();
}

function allImages() {
    var allPhotos=document.getElementById("header");
    while (allPhotos.firstChild) {
        allPhotos.removeChild(allPhotos.lastChild); }
        bool_my_img="false";
    Photos(); 
}

function Photos(){
var storage_img = firebase.storage();
			var storageRef_img = storage_img.ref();
							
			// Create a reference under which you want to list
			var listRef_img = storageRef_img.child('images');
			
			var i=0;
			var src_img = document.getElementById("header");
			// Find all the prefixes and items.
			
			var colors=[];

			colors.push("#FF6F61");
			colors.push("#6B5B95");
			colors.push("#88B04B");
			colors.push("#F7CAC9");
			colors.push("#45B8AC");
			colors.push("#7FFFD4");
			colors.push("#000000");
			colors.push("#FFF8DC");
			colors.push("#FF00FF");
			colors.push("#00FF00");
			colors.push("#FFFF00");
			colors.push("#9ACD32");
			colors.push("#FFFFFF");
			colors.push("#00FF7F");
			colors.push("#FF0000");
			colors.push("#F5FFFA");

			var iterator_grad_id_img=0;
			var iterator_img_id_img=0;

			listRef_img.listAll().then(function(res) {

			
				res.items.forEach(function(itemRef) {    
                var names=itemRef.name;	
				var users= firebase.auth().currentUser;
				var n = names.search(users.uid);
				var realname;

                if(n==-1 && bool_my_img=="true") { 
                return;
                }
                
				iterator_grad_id_img++;
				// Get metadata properties
				//itemRef.getMetadata().then(function(metadata) {
				// Metadata now contains the metadata for 'images/forest.jpg'
					var graddiv = document.createElement("div");

					graddiv.setAttribute("class","grad-div");
					//graddiv.setAttribute("id",metadata.name);
					graddiv.setAttribute("id",iterator_grad_id_img);

					var ccol = "linear-gradient(to bottom right, "+colors[Math.floor((Math.random() * colors.length) )]+","+colors[Math.floor((Math.random() * colors.length) )]+")";
					graddiv.style.backgroundImage = ccol;
				
					src_img.appendChild(graddiv);

					itemRef.getDownloadURL().then(function(nurl) {
						
						i++;var img_author;
                        iterator_img_id_img++;
                        
                        var imgdiv=document.createElement("div");
                        imgdiv.setAttribute("class","div-img-parent");
                        


						var img = document.createElement("img");
						img.setAttribute("class", "img-load");
						
	
						img.src = nurl;

						var textdiv=document.createElement("div");
						textdiv.setAttribute("class","text-block");
						var textdiv_forUpvote=document.createElement("div");
						textdiv_forUpvote.setAttribute("class","text-block");
						var views_para=document.createElement("p");
						var upvotes_para=document.createElement("p");
						var name_para=document.createElement("p");
						
						itemRef.getMetadata().then(function(itemMetadata){

							firebase.database().ref('images').once('value', function(snapshot) {
								snapshot.forEach(function(childSnapshot) {
									var childKey = childSnapshot.key;
								    var childData = childSnapshot.val();
                                    
									if( childData.name == itemMetadata.name)
									{   firebase.database().ref('/images/' + childKey).once('value').then(function(snapshot) {
									    realname = snapshot.val().realname;
									    views_para.innerHTML="";
										views_para.innerHTML="Views " + snapshot.val().views;
										upvotes_para.innerHTML="";
										upvotes_para.innerHTML="Upvotes: "+snapshot.val().upvotes;
									}); 
										
									firebase.database().ref('/users/' + childData.author).once('value').then(function(snapshot) {
									name_para.innerHTML="";
									name_para.innerHTML=snapshot.val().username;   
									img_author=snapshot.val().username;
									});
									    textdiv.appendChild(upvote_btn);
									    textdiv.appendChild(unvote_btn);
									    textdiv.appendChild(name_para);
										textdiv.appendChild(views_para);
										//textdiv.appendChild(upvotes_para);
										

									}
									});
									});
								    });
                        
						var remgrad=document.getElementById(iterator_img_id_img);
						remgrad.remove();

						var imgcont=document.createElement("div");
                        imgcont.setAttribute("class", "div-img-load");
                        if(n!=-1 && bool_my_img=="true") {
                            var delBtn_div = document.createElement("div");
                            delBtn_div.setAttribute("class","delBtn-div");
                            var delBtn=document.createElement("button");
                            delBtn.setAttribute("class", "delBtn");
                            delBtn.innerHTML="Delete";
                            var delBtns = document.createElement("button");
                            delBtns.setAttribute("class", "delBtns");
                            delBtns.innerHTML="×";
                            imgdiv.appendChild(delBtns);
                            imgcont.appendChild(delBtn_div); }
                        
						var upvote_btn=document.createElement("button");
						
						var unvote_btn=document.createElement("button");
						
						unvote_btn.setAttribute("class", "unvote_btn");
						upvote_btn.setAttribute("class", "upvote_btn");
						upvote_btn.style.display='none';
						unvote_btn.style.display='none';

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
									} }

									if(counter==0)
									{
                                       upvote_btn.style.display='block';
									}
									else
									{
										unvote_btn.style.display='block';
									}
								
								}
							
							});
						}); 
                        
						//to open the image Modal
						img.onclick = function() { 
						document.getElementById("imageModal").src=nurl;
						$('.modale').addClass('opened');
						loadModal(itemRef);
						}	
					    //Upvote function
						upvote_btn.onclick = function() {
						upvote(names, users, views_para, upvotes_para, name_para, textdiv, unvote_btn, upvote_btn, img_author);
						}
							
					    //Unvote function
						unvote_btn.onclick = function() {
						unvote(names, users, views_para, upvotes_para, name_para, textdiv, unvote_btn, upvote_btn, img_author);	
						}
                        
						imgdiv.appendChild(img);
						imgcont.appendChild(imgdiv);
						imgcont.appendChild(textdiv);

						//imgcont.appendChild(upvote_btn);
						//imgcont.appendChild(unvote_btn);
                        src_img.appendChild(imgcont);
                        delBtns.onclick = function() {
                            
                        document.getElementById("del_ind_footer").innerHTML=" "
                        document.getElementById("del_ind_footer").appendChild(delBtn); };
                        $(document).ready(function(){
                        $(".delBtns").click(function(){
						document.querySelector("#Del_single_image").innerHTML ="Are you sure you want to delete "+ realname+"? This action cannot be reverted"; 
                        $("#modalDelete_Individual").modal();
                        });
                        }); 
						
						
                        
                        function delImagesLocal(){
                        storageRef_img.child('images'+'/'+names).delete().then(function() {
                        // File deleted successfully
                        console.log("Images Deleted")
                        }).catch(function(error) {
                        // Uh-oh, an error occurred!
                        }); }

                          
                        delBtn.onclick = function() {
                        storageRef_img.child('images'+'/'+names).delete().then(function() {
                        // File deleted successfully
                        console.log("Images Deleted")
                        }).catch(function(error) {
                        // Uh-oh, an error occurred!
                        }); 
                              
                              firebase.database().ref('/images').once('value', function(snapshot) {
                                snapshot.forEach(function(childSnapshot) {
                                    var childKey = childSnapshot.key;
                                    var childData = childSnapshot.val();
                                    console.log("Entry :"+childSnapshot.key);
                                    console.log("Entry :"+childSnapshot.val().name);
                                    if(childSnapshot.val().name == names)
                                    { 
                                      firebase.database().ref('/images/'+childSnapshot.key).remove();
									  console.log("Deleted"+childSnapshot.val().name);
                                    }
                                
                                });
                            }); 
                            setTimeout(function() {
                                location.reload();				
                                }, 1000);
                         };
                        }).catch(function(error) {

							// A full list of error codes is available at
							// https://firebase.google.com/docs/storage/web/handle-errors
							switch (error.code) {
								case 'storage/object-not-found':
								// File doesn't exist
								break;

								case 'storage/unauthorized':
								// User doesn't have permission to access the object
								break;

								case 'storage/canceled':
								// User canceled the upload
								break;

								case 'storage/unknown':
								// Unknown error occurred, inspect the server response
								break;
							}
						});
					// }).catch(function(error) {
					// 		console.log("Error in retrieving metadata "+error);
					// 		// Uh-oh, an error occurred!
					// });								
            		});
			}).catch(function(error) {
					// Uh-oh, an error occurred!
					console.log(error);
            });			
            

        }





        