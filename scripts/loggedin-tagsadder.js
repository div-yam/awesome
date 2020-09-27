var called = new Array();

function handleInputName(me ,e) {
	if(document.querySelector(".tag-input").value && document.querySelector(".name-input").value)
	document.querySelector('.btn-upload-final').removeAttribute("disabled");

	else {
	if(!document.querySelector('.btn-upload-final').toggleAttribute("disabled")){
		document.querySelector('.btn-upload-final').toggleAttribute("disabled");
	 }
	}
	document.querySelector(".add-tag-placeholder").style.display = "block";
	document.querySelector(".form-tags").style.display = "block";
}

function handleInput(me, e) {

	if(document.querySelector(".tag-input").value && document.querySelector(".name-input").value)
	document.querySelector('.btn-upload-final').removeAttribute("disabled");

	else {
	if(!document.querySelector('.btn-upload-final').toggleAttribute("disabled")){
		document.querySelector('.btn-upload-final').toggleAttribute("disabled");
	 }
	}

	if(e.key!=" ")
	return false;
	var copy=me.value;
	
	me.value="";
	me.value=copy.substring(0, copy.length-1);
	
	var place = me.placeholder;

	if(called.includes(place))
		return false;
	else called.push(place);

	//console.log(place + " called");
	//console.log(document.querySelector(".form-tags").children.length);
	var cNodes=document.querySelector(".form-tags").children;
	var cdiv=document.createElement("div");
	cdiv.setAttribute("class","col");

	var ccinp=document.createElement("input");
	ccinp.setAttribute("type","text");
	ccinp.setAttribute("onkeyup","handleInput(this, event)");
	ccinp.setAttribute("class","form-control tag-input");
	ccinp.setAttribute("placeholder","Tag " + Number( Number(place.replace(/[^0-9]/g,'')) + 1 ) );

	cdiv.appendChild(ccinp);

	if(Number(place.replace(/[^0-9]/g,'')) % 3 == 0) {

		var crdiv=document.createElement("div");
		crdiv.setAttribute("class","form-row");						
		crdiv.appendChild(cdiv);

		document.querySelector(".form-tags").appendChild(crdiv);
	}
	else
	{
		document.querySelector(".form-tags").children[cNodes.length-1].appendChild(cdiv);
	}
}
