$('.btn-upload').click(function(){ $('#imgupload').trigger('click'); });


$("#imgupload").change(function() {
    var userId = firebase.auth().currentUser.uid;

    var defimgdiv=document.querySelector("#def-upload-img");
    var defimg=document.createElement("img");
    defimg.setAttribute("class", "img-upload");
    defimg.setAttribute("id", userId+"@"+this.files[0].name);

    var reader = new FileReader();
    reader.onload = function(){
        var dataURL = reader.result;
        defimg.src = dataURL;

        if(defimgdiv.childElementCount) {
            defimgdiv.removeChild(defimgdiv.childNodes[0]); 
        }

        defimgdiv.appendChild(defimg);
    };
    reader.readAsDataURL(this.files[0]);

    var utext = document.querySelector(".btn-upload");
    
    utext.innerText="Loaded "+this.files[0].name + " -- ";
    console.log("Read " + utext.innerText );

    document.querySelector(".add-name-placeholder").style.display = "block";
    document.querySelector(".form-name").style.display = "block";

    var fname = userId+"@"+this.files[0].name;
    var file = this.files[0]; // use the Blob or File API
    var floc="images/"+fname;


    $('.btn-upload-final').click(function() {

        if(defimgdiv.childNodes[0].id != fname)
        return;

        console.log("Uploading a file " + fname);
                        //  firebase.analytics();
            var storage = firebase.storage();
            var storageRef = storage.ref();			

            var tags=[];

            var trav=document.querySelectorAll(".tag-input");
            var index;

            for ( index=0; index<trav.length;index++) {
                console.log(trav[index].value);
                 
                if(trav[index].value != "") {
                    tags.push(trav[index].value);
                }

            }
            
            // An image entry.
            var postImg = {
                author: userId,
                name: fname,
                realname: document.querySelector(".name-input").value,
                tags: tags,
                views: 0,
                upvotes: 0,
            };
        
            var newPostKey = firebase.database().ref().child('images').push().key;
            
            // Write the new post's data simultaneously in the posts list and the user's post list.
            var updates = {};
            updates['/images/' + newPostKey] = postImg;
            //updates['/user-posts/' + uid + '/' + newPostKey] = postData;

            firebase.database().ref().update(updates).then(function(){

            storageRef.child(floc).put(file).then(function(snapshot) {
            
            console.log('Uploaded a blob or file!');
            utext.innerText="Uploaded "+fname +"!!";

            setTimeout(function() {
                location.reload();				
                }, 1000);
            });

                
         
        });
    });
});