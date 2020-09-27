auth.onAuthStateChanged(user =>{

    if(!user)
    {
        console.log('User Not Logged In! ');

        console.log("Opened: "+window.location.href);
        var path = window.location.href;
        var split = path.split("/");
        var x = split.slice(0, split.length - 1).join("/") + "/";

        console.log("To be replaced with : "+ x+"index.html");


        window.location.replace(x+"index.html");
    }
});