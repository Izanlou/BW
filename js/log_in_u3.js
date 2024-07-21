//VAR
const base_url = "https://bw.ariaizanlou.ir/"

//SLEEP
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//LOGIN
function log_in(){
    let name=document.getElementById("username").value; 
    let code=document.getElementById("password").value;
    if(name==="" || code===""){
        document.getElementById("log_in").innerText="Null Information!";
    } else{
        $.get((base_url+'php/chk_name.php?name='+encodeURIComponent(name)), function (chk_val) {
            if(chk_val==="y"){
                $.get((base_url+'php/chk_code.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(name)), function (chk_val) {
                    if(chk_val==="y"){
                        document.getElementById("log_in").innerText="Logging you in...";
                        sleep(500).then(() => {
                            window.location.replace(base_url+"main_menu_u3.php?name="+encodeURIComponent(name)+"&&code="+encodeURIComponent(code));
                        });
                    } else{
                        document.getElementById("log_in").innerText="Wrong Password!";
                    }
                });
            } else{
                document.getElementById("log_in").innerText="Not Registered!";
            }
        });
    }
}

//LISTENERS
document.getElementById('log_in').addEventListener('click',() => {
    log_in();
});

var input = document.getElementById("username");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("log_in").click();
    }
});

var input = document.getElementById("password");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("log_in").click();
    }
});

document.getElementById('password').addEventListener('dblclick',() => {
var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
});

//Izanlou / -2024