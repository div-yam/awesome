function logout()
{
	auth.signOut();
	console.log('User Logged Out! ');

	console.log("Opened: "+window.location.href);
	var path = window.location.href;
	var split = path.split("/");
	var x = split.slice(0, split.length - 1).join("/") + "/";

	console.log("To be replaced with : "+ x+"index.html");


	window.location.replace(x+"index.html");

}