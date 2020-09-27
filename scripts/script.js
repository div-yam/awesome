function switchVisible() {
    if (document.getElementById('signindiv')) {

        if (document.getElementById('signindiv').style.display == 'none') {
            document.getElementById('signindiv').style.display = 'block';
            document.getElementById('signupdiv').style.display = 'none';
        }
        else {
            document.getElementById('signindiv').style.display = 'none';
            document.getElementById('signupdiv').style.display = 'block';
        }
    }
}

function signupvisible()
{ 
        if (document.getElementById('container').style.display == 'none') {

            document.getElementById('container').style.display = 'block';
            document.getElementById('signindiv').style.display = 'none';
            document.getElementById('signupdiv').style.display = 'block';
        }
        else {
            document.getElementById('container').style.display = 'block';
            document.getElementById('signindiv').style.display = 'none';
            document.getElementById('signupdiv').style.display = 'block';
        }

}

function loginvisible()
{ 
    if (document.getElementById('loginvisible')) 
    {
        if (document.getElementById('container').style.display == 'none') {
            
            document.getElementById('container').style.display = 'block';
            document.getElementById('signindiv').style.display = 'block';
            document.getElementById('signupdiv').style.display = 'none';
        }
        else
        {
            document.getElementById('container').style.display = 'block';
            document.getElementById('signindiv').style.display = 'block';
            document.getElementById('signupdiv').style.display = 'none';

        }
    }
}


