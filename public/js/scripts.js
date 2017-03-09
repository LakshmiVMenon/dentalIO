$( function() {
    $(".headerNavList li a").click(function() {
      $(".headerNavList li a").removeClass('active');
      $(this).addClass('active');
    });  

});
function headerMenu() {
    var x = document.getElementById("headerNavs");
    if(x.className === "headerNavList"){
        x.className += " responsive";
    }
    else {
        x.className = "headerNavList";
    }
  }

function processLogin(){
  event.preventDefault();
  var uname = document.getElementById('uname').value;
  var password = document.getElementById('pwd').value;

  var isfieldsValidated = validateLoginFields(uname,password);

  if(isfieldsValidated.isValid){
    var formElement = {username:uname, password:password};
    var xhr = new XMLHttpRequest();
    xhr.open("POST", '/login', true);

    xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");

    xhr.onreadystatechange = function() {
        if(xhr.readyState == 4 && xhr.status == 200) {
            var resp = JSON.parse(xhr.responseText);
            if(resp.isloggedin){
              window.location.href = '/docdetail';
            }
            else{
              document.getElementById('loginerror').innerHTML = resp.errMsg;
              return false;
            }
        }
    }
    xhr.send(JSON.stringify(formElement));
  }
};

function validateLoginFields(uname,password){
  if(uname !== "" && password !== ""){
    return {isValid:true, errorMsg:''};
  }
  else
    if( uname === ''){
      return {isValid:true, errorMsg:'Empty username'};
    }
    else if (password === ''){
      return {isValid:true, errorMsg:'Empty password'};
    } 
};

