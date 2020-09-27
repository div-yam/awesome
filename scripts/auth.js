



   //for checking the status of the user i.e whether he is logged in or not
   auth.onAuthStateChanged(user =>{

      if(user) {
         console.log('User Logged In: ', user);

         console.log("Opened: "+window.location.href);
         var path = window.location.href;
         var split = path.split("/");
         var x = split.slice(0, split.length - 1).join("/") + "/";

         console.log("To be replaced with : "+ x+"loggedin.html");

         window.location.replace(x+"loggedin.html");
         document.getElementById('loginnav').style.display = 'none';
         document.getElementById('signupnav').style.display = 'none';
         document.getElementById('logoutnav').style.display = 'inline-block';
         document.getElementById('container').style.display = 'none';
      }

      else{
         console.log('User Logged Out');
         document.getElementById('loginnav').style.display = 'inline-block';
         document.getElementById('signupnav').style.display = 'inline-block';
         document.getElementById('logoutnav').style.display = 'none';
         document.getElementById('container').style.display = 'none';
      }

   });


//signup
const signupform = document.querySelector('#signup-form');
signupform.addEventListener('submit', (e) =>{
       e.preventDefault(); // to prevent it from going back, i.e. does not refreshes the page
       document.getElementById('errors1').style.display='none';
       //get user info
       const email = signupform['signup-email'].value;
       const password = signupform['signup-password'].value;
       const repassword = signupform['signup-repassword'].value;
      // console.log(email, password)
        const uName=signupform['signup-name'].value;


      //signup the user
if(password == repassword)
{    
     auth.createUserWithEmailAndPassword(email, password).then(cred => {

        console.log(cred.user);
        const modal = document.querySelector('#modal-signup');
        signupform.reset();
        var par = document.getElementById("error1");
        var ta = document.createTextNode("");
        par.appendChild(ta);
        var user = firebase.auth().currentUser;

        if (user) {
         // User is signed in.
            console.log("Hi");

            firebase.database().ref('users/' + user.uid).set({
               username: uName,
               email: email,
            }, function(error) {
               if (error) {
                  console.log("//The write failed");
               }
               else {
                  console.log("//Data saved successfully");

                  return result.user.updateProfile({
                     displayName: uName
                   })
               }
            });
       } else {
          console.log("Bye");
         // No user is signed in.
       }
        
     }).catch(err => {
      document.getElementById('errors1').style.display='block';
      var para = document.getElementById("error1");
      para.innerHTML= err.message;
     }); 
   }

   else
   {
      alert("The passwords do not match");
   }
});




//logout

const logout = document.querySelector('#logout');
logout.addEventListener('click',(e) => {
   e.preventDefault();

   auth.signOut().then(() =>{

      //console.log('User Signed Out');

   });

});

const forgot = document.querySelector("#forgot-button");
forgot.addEventListener('click',(e) => {
      var auth = firebase.auth();
      //const loginforms = document.querySelector('#login-form');
      const emailAddress = document.getElementById("forgot-email").value;
   e.preventDefault();
   auth.sendPasswordResetEmail(emailAddress).then(() =>{
      // Email sent.
      alert("Email Sent")
   }).catch(function(error) {
      // An error happened.
      alert("Email Not sent")
   });
})
// Login Form


const loginform = document.querySelector('#login-form');
const loginButton = document.querySelector('#login-button');
loginform.addEventListener('submit', (e) =>{

e.preventDefault();

//get User info
const email = loginform['login-email'].value;
const password = loginform['login-password'].value;

auth.signInWithEmailAndPassword(email, password).then(cred =>{

//console.log(cred.user)  //not needed really


const modal = document.querySelector('#modal-login');  //to get the login form in work

loginform.reset();
var par = document.getElementById("error2");
var ta = document.createTextNode("");
par.appendChild(ta);


}).catch(err => {
   document.getElementById('errors2').style.display='block';
   var para = document.getElementById("error2");
   para.innerHTML= err.message;
   
  }); 
});




