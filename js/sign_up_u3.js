//VAR
const base_url = "https://bw.ariaizanlou.ir/"

//SLEEP
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//LOGIN
function sign_up(){
    let name=document.getElementById("sign_username").value; 
    let code=document.getElementById("sign_password").value;
    let confirm_code=document.getElementById("confirm_password").value;
    if(name==="" || code==="" || confirm_code===""){
        document.getElementById("log_in").innerText="Null Information!";
    } else{
        if(!(code===confirm_code)){
            document.getElementById("log_in").innerText="Matching Error!";
        } else{
            $.get((base_url+"php/chk_name.php?name="+encodeURIComponent(name)), function (chk_val){
                if(chk_val==="y"){
                    document.getElementById("log_in").innerText="Already Exists!";
                } else{
                    $.get((base_url+"php/add_code.php?name="+encodeURIComponent(name)+"&&code="+encodeURIComponent(code)), function (chk_val){
                        if(chk_val==="y"){
                            document.getElementById("log_in").innerText="Registered, Done! ";
                            sleep(500).then(() => {window.location.replace(base_url);});
                        } else{
                            document.getElementById("log_in").innerText="Failed, Sorry :(";
                        }
                    });
                }
            });
        }
    }
}

//LISTENERS
document.getElementById('log_in').addEventListener('click',() => {
    sign_up();
});

var input = document.getElementById("sign_username");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("log_in").click();
    }
});

var input = document.getElementById("confirm_password");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter"){
        event.preventDefault();
        document.getElementById("log_in").click();
    }
});

//Izanlou / -2024