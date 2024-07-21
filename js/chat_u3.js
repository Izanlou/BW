//get_sth_from_url
function get_from_url(parameter){var sPageURL = window.location.search.substring(1),sURLVariables = sPageURL.split('&'),sParameterName,i;for (i = 0; i < sURLVariables.length; i++) {sParameterName = sURLVariables[i].split('=');if (sParameterName[0] === parameter) {return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);}}return false;}
function sleep(ms){return new Promise(resolve => setTimeout(resolve, ms));}

const base_url = "https://bw.ariaizanlou.ir";
const code = get_from_url('code');
const username = get_from_url('name');
const session = get_from_url('session');

function chk_code(){$.get((base_url+'/php/chk_code.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)), function (chkval) {if(chkval==='n'){window.location.replace(base_url);}});}
function chk_session(){$.get((base_url+'/php/chk_session.php?session='+encodeURIComponent(session)), function (chkval) {if(chkval==='n'){window.location.replace(base_url);}});}
function cls_actives(){$.get((base_url+'/php/cls_actives.php?code='+encodeURIComponent(session)), function () {});}

function load_info(){$("#session_message").text(session.split("#")[0]+"#...");$("#setting_title").text("#"+session.split("#")[1]);$.get((base_url+'/php/get_info.php?code='+encodeURIComponent(session)), function (session_info) {$("#setting_info").html('<pre id="setting_info_pre">'+session_info+'</pre>');});}
chk_code(); chk_session(); cls_actives(); load_info(); //primal_operations

const sticker_index = ['Minecraft','Animals','Apollo','Cassette','Cartoons','Simpsons'];
const sticker_value = [34,34,14,14,24,68];
const sticker_index_max_no = 5;
var sticker_index_no = 0;

//to_be_manuplated_values
let message_index = 0;
let tag_count = [];
let tag_index = 0;
let message_tag = "";

//information_functions
function ch_info(text, title){$("#session_message").text(title);$("#message_input").attr("placeholder", text);}
function ch_send(text,color,bgcolor){
    $("#message_input").css("background-color", bgcolor);
    $("#message_input").css("border-color", color);
    $("#send_button").css("background-color", bgcolor);
    $("#send_button").css("border-color", color);
    $("#message_input").attr("placeholder", text);
}
function cls_ch(){
    message_tag = "";
    sleep(600).then(()=>{
    $("#message_input").css("background-color", "#e0e0e0");
    $("#message_input").css("border-color", "#d3d3d3");
    $("#send_button").css("background-color", "#d2d2d2");
    $("#send_button").css("border-color", "#d3d3d3");
    $("#message_input").attr("placeholder", "Type your message...");
    $("#session_message").text(session.split("#")[0]+"#...");});
}
function timer_cls_ch(){sleep(300).then(()=>{refresh();});sleep(1000).then(() => {cls_ch();window.scrollTo(0, document.body.scrollHeight);});}

//message_proccessing
function message_transform(text){
    text = text.replaceAll("'",("\\'")).replaceAll("^*np*^",("")).replaceAll("<","(").replaceAll(">",")").replaceAll(/\n/g,"<br>").replaceAll('&s@ ','<img').replaceAll(' @s&','>').replaceAll('/b ','<b>').replaceAll(' b/','</b>').replaceAll('/i ','<i>').replaceAll(' i/','</i>');
    return text;
}

//div_creator
function message_creator(message){
    //message[0]:sender,[1]:rep_message,[2]:time,[3]:date,[4]:message,[5]:type,[6]:id,[7]:tag,[8]:avatar
    var type = message[5];
    message_id = message[6];
    message[4] = message[4].replaceAll(/(http:\/\/[^\s]+)/g, "<a href='$1'>$1</a>").replaceAll(/(https:\/\/[^\s]+)/g, "<a href='$1'>$1</a>"); //url_format
	message[4] = message[4].replaceAll('ssl//%&','https://');
    if(message[0]===username){add_on = "_u";}else{add_on = "";} //self_messages
    //message[7]:tag_on_other_messages => USERNAME#M_ID
    if(!(message[7] === "")){
        tag_username = message[7].split("#")[0];
        tag_message_id = message[7].split("#")[1];
        if(tag_username === username){tag_count.push(message_id)}; //add_to_@_count
    }
    //forming_new_message
    if(type==="1"){ //simple_message
        if(message[7]===""){
            new_message = `<div id="message_box" class="message_box`+add_on+`">
            <span class="user`+add_on+`">`+message[0]+`</span><br>
            <div class="message"><span id=M#`+message_id+`>`+message[4]+`</span></div>`
        } else { //for_reply
            new_message = `<div id="message_box" class="message_box`+add_on+`">
            <div class="user_rep" id=RM#`+tag_message_id+`>`+tag_username+`<br><span id='rep_message'>`+message[1]+`</span></div>
            <span class="user`+add_on+`">`+message[0]+`</span><br>
            <div class="message"><span id=M#`+message_id+`>`+message[4]+`</span></div>`
        }
        //additional_elements
        new_message += "<button class=copy_button id=C#"+message_id+">copy</button>";

    } else if(type==="2"){ //stickers
        if(message[7]===""){
            new_message = `<div id="message_box" class="sticker_box`+add_on+`">
            <span class="s_user">`+message[0]+`</span><br>
            <div class="message"><span id=M#`+message_id+`>`+message[4]+`</span></div>`
        } else { //for_reply
            new_message = `<div id="message_box" class="sticker_box`+add_on+`">
            <div class="user_rep" id=RM#`+tag_message_id+`>`+tag_username+`<br><span id='rep_message'>`+message[1]+`</span></div>
            <span class="s_user">`+message[0]+`</span><br>
            <div class="message"><span id=M#`+message_id+`>`+message[4]+`</span></div>`
        }
    }
    //additional_elements
    new_message += `<img class="avatar" src="`+message[8]+`">
    <span class="date_time">`+message[2]+`<br>`+message[3]+`</span>`
    if(add_on==="_u"){new_message+='<button class="delete_button" id=D#'+message_id+'>remove</button>';}
    new_message += '<button class="reply_button" id='+message[0]+'#'+message_id+'>reply</button>';
    //adding_to_UI
    document.getElementById("chat_win").innerHTML += new_message+"</div>";
}
//refresh
function refresh(){
    $.get((base_url+'/php/get_messages.php?session='+encodeURIComponent(session)), function (sql_value) {
        if(sql_value==="n"){ //check_if_session_is_empty
            i = 0;
            document.getElementById("chat_win").innerHTML="";
        } else {
            message_list=sql_value.split("\n");
            if(message_list.length === message_index){
                message_index = 0;
                document.getElementById("chat_win").innerHTML="";
            }
            var i = message_index;
            while(i<((message_list.length)-1)){
                message = message_list[i].split("^*np*^"); //self_message
                message_creator(message); i+=1;
            }
        }
        message_index = i;
    });
    set_user_active();
} refresh();
//transmit_to_sql
function submit_transmit(type,code,message,date,time,repon,tag){$.get((base_url+'/php/add_message.php?name='+encodeURIComponent(username)+"&&code="+encodeURIComponent(code)+"&&date="+encodeURIComponent(date)+"&&time="+encodeURIComponent(time)+"&&message="+encodeURIComponent(message)+"&&session="+encodeURIComponent(session)+"&&type="+encodeURIComponent(type)+"&&repon="+encodeURIComponent(repon)+"&&tag="+encodeURIComponent(tag)), function (chkval) {if(chkval==="y"){ch_info("Message Sent!","Sent!");document.getElementById("message_input").value="";} else {ch_info("Failed to Send!","Failed!");}});timer_cls_ch();}
//send_message
function send_message(tag,message,type){
    if(message ==="" || message===" "){
        ch_info("Empty Input!","Null Input!");
    } else {
        message = message_transform (message);
        chk_line_spam = message.replaceAll("<br>","");
        if(chk_line_spam==="" || chk_line_spam===" "){
            ch_info("Empty Input!","Null Input!");
        } else {
            message = "<pre>"+message+" </pre>";
            const today = new Date(); const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"]; var date = today.getDate() + " " + monthNames[today.getMonth()][0] + monthNames[today.getMonth()][1] + monthNames[today.getMonth()][2]; var time = today.getHours() + ":" + today.getMinutes();
            
            if(!(tag === "")){
                tag_message_id = 'M#'+tag.split("#")[1];
                var add = document.getElementById(tag_message_id).innerText;
                add = message_transform(add).replaceAll("<br>"," ");
            }
            submit_transmit(type,code,message,date,time,add,tag);
        }
    }
    cls_ch();
}
function del_message(id){
    ch_info("Deleting Message...","Deleting...");
    $.get((base_url+'/php/del_message.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session)+"&&id="+encodeURIComponent(id)), function (chkval) {
        if(chkval==="n"){
            ch_info("Failed to Delete!","Failed!");
        }
        refresh(); cls_ch();
    });
}

//other_functions
function cls_session(){
    if(confirm("Proceed to CLEAR this Session!?")){
        ch_info("Clearing Session...","Clearing...");
        $.get((base_url+'/php/cls_session.php?code='+encodeURIComponent(code)+"&&name="+encodeURIComponent(username)+"&&session="+encodeURIComponent(session)), function (chkval) {
            if(chkval==="y"){ch_info("Session Cleared!","Purged!");timer_cls_ch();} else{ch_info("Action Denied!","Denied!");cls_ch();}
        }); cls_ch();
    }
}
function ch_session_info(){
    let old_info=$("#setting_info").text();
    let new_info=prompt("Type your new INFO... OmO, Now!",old_info);new_info=message_transform(new_info);
    if(new_info==="" || new_info===" "){ch_info("Empty Info!","Null Info!");} 
    else {
        ch_info("Changing Session Info...","Changing Info...");
        $.get((base_url+'/php/get_creator.php?code='+encodeURIComponent(session)), function (creator_username) {
            $.get((base_url+'/php/set_info.php?code='+encodeURIComponent(session)+'&&name='+encodeURIComponent(username)+'&&info='+encodeURIComponent(new_info)), function (chkval) {
                if(chkval==="y" && creator_username === username){
                    ch_info("Session Info Changed!","Info Changed!");
                    cls_ch(); load_info();
                } else{
                    ch_info("Action Denied!","Denied!"); cls_ch();
                } 
            }); cls_ch();
        });
    }
}
function copy(id){
    var text_range = document.createRange();
    text_range.selectNode(document.getElementById(id));

    window.getSelection().removeAllRanges(); window.getSelection().addRange(text_range);
    document.execCommand('copy');
    ch_info("Message Copied!","Copied!"); cls_ch();
}
//stickers
function get_sticker(id){document.getElementById('sticker_view').innerHTML="";document.getElementById('sticker_name').innerText=sticker_index[id];for(var i=0; i<sticker_value[id]; i++){document.getElementById('sticker_view').innerHTML+=`<img id="S#`+i+`" class="sticker" src="`+base_url+`/data/sticker/`+sticker_index[id]+"/"+i+`.webp">`}}get_sticker(0);
function next_sticker(){sticker_index_no+=1;if(sticker_index_no > sticker_index_max_no){sticker_index_no = 0;}get_sticker(sticker_index_no);}
function pre_sticker(){sticker_index_no-=1;if(sticker_index_no < 0){sticker_index_no = sticker_index_max_no;}get_sticker(sticker_index_no);}

//online_check
function set_user_active(){$.get((base_url+'/php/get_actives.php?code='+encodeURIComponent(session)), function (alt_active_users) {if(!(alt_active_users.includes(username))){new_active_user_list = alt_active_users + username + ",";$.get((base_url+'/php/set_active.php?code='+encodeURIComponent(session)+"&&actives="+encodeURIComponent(new_active_user_list)), function () {});}});}set_user_active();
function add_active_html(user_id){$.get((base_url+'/php/get_bio.php?name='+encodeURIComponent(user_id)), function (bio) {$.get((base_url+'/php/get_avatar.php?name='+encodeURIComponent(user_id)), function (av_num) {new_active_user =`<button id="setting_active_user"><img id="session_setting_avatar" src="`+av_num+`"><span id="session_setting_user">`+user_id+`</span><span id="session_setting_online">online</span><span id="session_setting_bio">`+bio+`</span></button>`;document.getElementById("setting_bottom").innerHTML+=new_active_user;document.getElementById("active_user_title").innerHTML="Active B&W Nerdies :>";});});}
function add_active(){
    document.getElementById("setting_bottom").innerHTML='<span id="active_user_title">Loading Actives...</span></div>';
    $.get((base_url+'/php/get_actives.php?code='+encodeURIComponent(session)), function (active_users) {
        active_users = active_users.split(",");
        for(var i=0; i<((active_users.length)-1); i++){
            active_user=active_users[i];
            add_active_html(active_user);
        }
    });
}

//click_listener
setInterval(refresh, 3000);

//scroll_bottom
document.getElementById('send_button').addEventListener('dblclick',() => {
    window.scrollTo(0, document.body.scrollHeight);
});

//shortcuts
$('#message_input').keydown(function (e) {
    if (e.ctrlKey && e.keyCode == 13) {
        event.preventDefault();
        document.getElementById("send_button").click();
    }
});

$("#setting_top").toggle();$("#setting_mid").toggle();$("#setting_bottom").toggle();
$("#logo").click(function(){add_active();document.getElementById("sticker_deck").style.display="none";chkval=$("#send_win").height();if(!(chkval===450) && !(chkval===110)){$("#send_win").animate({height:'110'}, 220);}else{$("#send_win").animate({height:'75%'}, 250);}$("#setting_top").toggle();$("#setting_mid").toggle();$("#setting_bottom").toggle();});
$("#stickers").click(function(){document.getElementById("setting_mid").style.display="none";document.getElementById("setting_top").style.display="none";document.getElementById("setting_bottom").style.display="none";chkval=$("#send_win").height();if(!(chkval===450)){$("#send_win").animate({height:'450px'}, 250);}else{$("#send_win").animate({height:'110'}, 220);}$("#sticker_deck").toggle();})

const OC = (event) => {
    let oc_id = event.srcElement.id;
    let oc_class = event.target.className;

    //back_button
    if(oc_id==="back_button"){window.location.replace(base_url+"/main_menu_u3.php?code="+encodeURIComponent(code)+"&&name="+encodeURIComponent(username));}
    //setting_info
    else if(oc_id==="setting_info"){ch_session_info();}
    else if(oc_id==="setting_info_pre"){ch_session_info();}
    //clear_session
    else if(oc_id==="clear_session_button"){cls_session();}
    //shuffle_stickers
    else if(oc_id==="next_sticker"){next_sticker();} else if(oc_id==="pre_sticker"){pre_sticker();}

    //tag_button
    else if(oc_id==="tag_button"){
        try{
            if(tag_index === 0){
                tag_index = tag_count.length;
            }
            message_id="M#"+tag_count[tag_index-1];
            document.getElementById(message_id).scrollIntoView({behavior: "smooth",block: "center",inline: "center"});

            document.getElementById('tag_button').innerHTML = tag_index;
            tag_index -= 1;
        } catch (e) {
            document.getElementById('tag_button').innerHTML = "0";
            sleep(1000).then(() => {
                document.getElementById('tag_button').innerHTML = "@";
            });
        }
    }
    //reply_message_click
    else if(oc_class==="user_rep"){
        message_id = oc_id.split("#")[1];
        try{
            document.getElementById("M#"+message_id).scrollIntoView({behavior: "smooth",block: "center",inline: "center"});
        } catch (e) {
            ch_info("Root Message is deleted!","No Root!"); cls_ch();
        }
    }
    //send_button
    else if(oc_id==="send_button"){message = document.getElementById("message_input").value;if(message_tag === ""){send_message("",message,"1");}else{send_message(message_tag,message,"1");}} 
    //reply_button
    else if(oc_class==="reply_button"){
        rep_message_id = oc_id.split("#")[1];
        rep_username = oc_id.split("#")[0];
        message_tag = rep_username+"#"+rep_message_id;
        send_info = "Reply On > "+rep_username;
        ch_send(send_info,"#05a8de","#05a8de25");}
    //copy_button
    else if(oc_class==="copy_button"){
        message_id = oc_id.split("#")[1];
        copy("M#"+message_id);}
    //delete_button
    else if(oc_class==="delete_button"){
        message_id = oc_id.split("#")[1];
        del_message(message_id);}

    //send_sticker
    else if(oc_class==="sticker"){
        id = oc_id.split("#")[1];
        message = `&s@  src="ssl//%&`+base_url.split("https://")[1]+`/data/sticker/`+encodeURIComponent(sticker_index[sticker_index_no])+"/"+id+`.webp"  @s&`;
        if(message_tag === ""){send_message("",message,"2");}else{send_message(message_tag,message,"2");}
        document.getElementById("send_win").style.height="110px";
        document.getElementById("sticker_deck").style.display="none";
    }
}
window.addEventListener('click', OC);

//focus_into_box
function inputFocus(){$("#message_input").focus();} window.onkeydown = inputFocus;

//Izanlou / -2024