//get_sth_from_url
function get_from_url(parameter){var sPageURL = window.location.search.substring(1),sURLVariables = sPageURL.split('&'),sParameterName,i;for (i = 0; i < sURLVariables.length; i++) {sParameterName = sURLVariables[i].split('=');if (sParameterName[0] === parameter) {return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);}}return false;}
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}
function random_number(min, max) {return Math.floor(Math.random() * (max - min) ) + min;}

const catch_lines=["B&W Season comin right up! 🔥","I coded this all alone, in about 1.5 Months! 🐱‍👤","Luna?0000 Chat-bot is coming to B&W!","Are you excited for the STICKERS? 👀","Roastin B&W? Try codin it URSELF >:","B&W 'n' Chill?! (IDK why tho xP)","God be like: Sorry BUT you're IRANIAN 🤷‍♂️","I Lost Weight With B&W TV.","Do you suffer from DUMBNESS? 🕳","'M' is the first letter of my friend's _old best friend.","Yes youu; Gimmi CHICKEN Nuggies!","It's ICY COLD out there! Wear your Jacket John. 🧊","Try drinking ICE Tea cuz it doesn't worth listenin to. ;P"];

function chk_code(){$.get((base_url+'/php/chk_code.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (chkval) {if(chkval==='n'){window.location.replace(base_url);}});}
function chk_name(){$.get((base_url+'/php/chk_name.php?name='+encodeURIComponent(username)), function (chkval) {if(chkval==='n'){window.location.replace(base_url);}});}

function info(str){document.getElementById('info').innerText=str;}
function info_clear(){document.getElementById('info').innerText=catch_lines[random_number(0,13)];}

function get_username(){document.getElementById('user_name').innerText=(username);}
function get_bio(){$.get((base_url+'/php/get_bio.php?name='+username), function (bio) {document.getElementById('bio').innerHTML='"'+bio+'"<br>Tap to change Bio!';return bio;});}

var av_num = 0;
const av_num_max = 30;
function get_avatar(){$.get((base_url+'/php/get_avatar.php?name='+username), function (avatar_num) {document.getElementById('avatar').src=avatar_num});}
function pre_avatar(){av_num = av_num - 1;if(av_num < 1){av_num = av_num_max;}$.get((base_url+'/php/set_avatar.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&avnum="+encodeURIComponent(base_url+"/data/avatar/"+av_num+".jpg")), function (chkval) {if(chkval==="y"){document.getElementById('avatar').src="data/avatar/"+av_num+".jpg";}});}
function next_avatar(){av_num = av_num + 1;if(av_num > av_num_max){av_num = 1;}$.get((base_url+'/php/set_avatar.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&avnum="+encodeURIComponent(base_url+"/data/avatar/"+av_num+".jpg")), function (chkval) {if(chkval==="y"){document.getElementById('avatar').src="data/avatar/"+av_num+".jpg";}});}

function enter_session(){
    session_name=document.getElementById('enter0').value;
	if(session_name===""){
		//pass
	} else {
	    info("Logging you in...");
	    var sessions_name = session_name;
	    $.get((base_url+'/php/chk_session.php?session='+encodeURIComponent(session_name)), function (chkval) {
	        if(chkval==='y'){
	            $.get((base_url+'/php/get_history.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (sessions) {
	                if(sessions.includes(session_name)){
	                    session_name = sessions;
	                } else{
	                    session_name = session_name + "," + sessions;
	                }
	                $.get((base_url+'/php/add_history.php?session='+encodeURIComponent(session_name)+"&&code="+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (chkval) {
	                    if(chkval==="y"){
	                        info("Log-in was successful!");
	                        window.location.replace(base_url+"/chatroom_u3.php?name="+encodeURIComponent(username)+"&&code="+encodeURIComponent(code)+"&&session="+encodeURIComponent(sessions_name.replace(",","")));
	                    } else{
	                        info("Failed to enter the Session!!");
	                    }
	                });
	            });
	        } else {
	            info("Invalid Session!");
	        }
	    });
	}
    sleep(500).then(() => {
        document.getElementById("enter0").value="";
        info_clear();
        get_sessions();
    });
}

function get_history(){
    $.get((base_url+'/php/get_history.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (sessions) {
        if(sessions==="" || sessions==="n"){
            document.getElementById('history').innerHTML='<div class="text3">No Record! :(</div>';
        } else {
            document.getElementById('history').innerHTML='<span class="text3">Your History!</span><button id="clear_history">Clear</button>';
            const session_array = sessions.split(",");
            for (let i=0; i<((session_array.length)-1); i++){
                $.get((base_url+'/php/chk_session.php?session='+encodeURIComponent(session_array[i])), function (chkval) {
                    if(chkval==="y"){
                        let new_session = '<div><button id="history'+i+'" class="button2">'+session_array[i]+'</button><style>.button1{transition: 100ms;}</style><button id="delete_his'+i+'" class="button4">X</button><style>.button4{transition: 100ms;}</style>';
                        document.getElementById('history').innerHTML+=new_session;
                    } else{
                        let new_session = '<div><button class="button2"><span style="color: #e00000;">Expired Session!</span></button><style>.button1{transition: 100ms;}</style><button id="delete_his'+i+'" class="button4">X</button><style>.button1{transition: 100ms;}</style>';
                        document.getElementById('history').innerHTML+=new_session;
                    }
                });
            }
        }
    });
}

function get_sessions(){
    $.get((base_url+'/php/get_sessions.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (sessions) {
        if(sessions==="" || sessions==="n"){
            document.getElementById('my_ses').innerHTML='<div class="text3">Empty! :(</div>';
        } else {
            document.getElementById('my_ses').innerHTML='<div class="text3">Your Sessions!</div>';
            const session_array = sessions.split(",");
            for (let i=1; i<session_array.length; i++){
                $.get((base_url+'/php/get_info.php?code='+encodeURIComponent(session_array[i])), function (session_info) {
                    let new_session = '<div><button id="my_ses'+i+'" class="button2"><span>'+session_array[i]+'</span></button><style>.button2{transition: 100ms;}#my_ses'+i+':hover span{display: none}#my_ses'+i+':hover:before{content:"'+session_info+'";}</style><button id="delete_ses'+i+'" class="button4">X</button><style>.button4{transition: 100ms;}</style>';
                    document.getElementById('my_ses').innerHTML+=new_session;
                });
            }
        }
    });
}

function add_session(){
    session_name=document.getElementById('create0').value;
    if(session_name==="" || session_name===" "){
        //pass
    } else if((session_name.includes(",")) || (session_name.includes("#"))){
        info('Pls do not use any "," or "#" for the name!');
    } else {
        session_name+="#"+random_number(100000000,999999999);
        info("Creating your Session...");
        $.get((base_url+'/php/chk_session.php?session='+encodeURIComponent(session_name)), function (chkval) {
            if(chkval==='y'){
                info("This Session does already exist!");
            } else {
                $.get((base_url+'/php/add_session.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session_name)), function (chkval) {
                    if(chkval==="y"){
                        document.getElementById("create").value="";
                        info("The Session has been created!");
                    } else {
                        info("Failed to create the Session!");
                    }
                });
            }
        });
    }
    sleep(500).then(() => {
        document.getElementById("create0").value="";
        info_clear();
        get_sessions();
    });
}

function del_history(id){
    $.get((base_url+'/php/get_history.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (sessions) {
        let session_array = sessions.split(",");
        let upd = "";
        for (let i=0; i<((session_array.length)-1); i++){
            if(!(i==id)){
                upd += session_array[i]+",";
            }
        }
        info("Deleting your Session...");
        $.get((base_url+'/php/upd_history.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&upd="+encodeURIComponent(upd)), function (chkval) {
            if(chkval==="y"){
                info("The History has been removed!");
            } else{
                info("Failed to remove the History!");
            }
        });
        sleep(500).then(() => {
            info_clear();
            get_history();
        });
    });
}

function del_session(id){
    session_name=document.getElementById(id).textContent;
    if(confirm("Proceed to delete this Session!?")){
        info("Deleting your Session...");
        $.get((base_url+'/php/del_session.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session_name)), function (chkval) {
            if(chkval==="y"){
                info("The Session has been deleted!");
            } else{
                info("Failed to delete the Session!");
            }
        });
    }
    sleep(500).then(() => {
        info_clear();
        get_sessions();
    });
}

function change_bio(){
    $.get((base_url+'/php/get_bio.php?name='+username), function (old_bio){
        let new_bio=prompt("Type your next BIO... OmO, Now!",old_bio);
        new_bio = new_bio.replaceAll("'",("\\'")).replaceAll("^*np*^",("")).replaceAll("<","(").replaceAll(">",")")
        if(new_bio==="" || new_bio===" "){
            info("Failed! You ain't anything?! :0");
        } else {
            info("Changing your Bio...");
            $.get((base_url+'/php/set_bio.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&bio="+encodeURIComponent(new_bio)), function (chkval) {
                if(chkval==="y"){
                    info("Your Bio changed, Just now!");
                } else{
                    info("Failed to change the Bio!");
                }
            });
        }
    });
    sleep(500).then(() => {
        info_clear();
        get_bio();
    });
}

function change_pass(){
    let new_code=document.getElementById("change_password").value;
    if(new_code==="" || new_code===" "){
        info("You can't do FREE PASS ;)");
    } else {
        info("Changing your password...");
        $.get((base_url+'/php/set_code.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&new_code="+encodeURIComponent(new_code)), function (chkval) {
            if(chkval==="y"){
                info("Your password changed, Just now!");
            } else{
                info("Failed to change the password!");
            }
        });
        sleep(1000).then(() => {
            window.location.replace(base_url);
        });
    }
    sleep(500).then(() => {
        info_clear();
        window.location.replace(base_url);
    });
}

function custom_avatar(){
    info("Loading the AVATAR image!");
    $.get((base_url+'/php/set_avatar.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&avnum="+encodeURIComponent(document.getElementById("custom_avatar").value)), function (chkval) {
        if(chkval==="y"){
            info("Your AVATAR changed to a Custom.");
            document.getElementById('custom_avatar').value="";
        }
    });
    sleep(500).then(() => {
        info_clear();
        get_avatar();
    });
}

function del_acc(){
    if(confirm("Proceed to delete your ACCOUNT!?")){
        info("Deleting your ACCOUNT...");
        $.get((base_url+'/php/del_acc.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (chkval) {
            if(chkval==="y"){
                info("Your ACCOUNT has been deleted!");
                sleep(2000).then(() => {
                    window.location.replace(base_url);
                });
            } else{
                info("Failed to delete Your ACCOUNT!");
            }
        });
    }
    sleep(500).then(() => {
        info_clear();
    });
}

function clear_history(){
    info("Clearing...");
    $.get((base_url+'/php/del_history.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (chkval){
        if(chkval==="y"){
            info("Cleared!");
        } else {
            info("Failed!");
        }
    });
    sleep(500).then(() => {
        info_clear();
        get_history();
    });
}

const base_url = "https://bw.ariaizanlou.ir";
const code = get_from_url('code'); const username = get_from_url('name');
get_username(); get_avatar(); get_bio(); info_clear(); get_sessions(); get_history(); chk_code(); chk_name(); 

document.getElementById('pre_avatar').addEventListener('click',() => {pre_avatar();});
document.getElementById('next_avatar').addEventListener('click',() => {next_avatar();});
document.getElementById('bio').addEventListener('click',() => {change_bio();});
document.getElementById('delete_acc').addEventListener('click',() => {del_acc();});
document.getElementById('create1').addEventListener('click',() => {add_session();});
document.getElementById('enter1').addEventListener('click',() => {enter_session();});
document.getElementById('log_out').addEventListener('click',() => {window.location.replace(base_url);});

var input = document.getElementById("enter0");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        enter_session();
    }
});

var input = document.getElementById("create0");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        add_session();
    }
});

var input = document.getElementById("change_password");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        change_pass();
    }
});

var input = document.getElementById("custom_avatar");
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        custom_avatar();
    }
});


const onClick = (event) => {
    let typeid = event.srcElement.id;
    let typeclass = event.target.className;
    if(typeid==="clear_history"){
        clear_history();
    } else if(typeid.includes("delete_ses")){
        session_id="my_ses"+typeid.split("ses")[1];
        del_session(session_id);
    } else if(typeid.includes("delete_his")){
        session_id=typeid.split("his")[1];
        del_history(session_id);
    } else if(typeid.includes("my_ses")){
        session_name=document.getElementById(typeid).textContent;
        window.location.replace(base_url+"/chatroom_u3.php?name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session_name)+"&&code="+encodeURIComponent(code));
    } else if(typeid.includes("history")){
        session_name=document.getElementById(typeid).textContent;
        window.location.replace(base_url+"/chatroom_u3.php?name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session_name)+"&&code="+encodeURIComponent(code));
    }
}
window.addEventListener('click', onClick);

//Izanlou / -2024