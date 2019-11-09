// Initialize provider

//For Kevin: uncomment next two lines after npm installing
//import Fortmatic from 'fortmatic';
//import Web3 from 'web3';

const fm = new Fortmatic('pk_test_9E6F1DC09BE9D836');
window.web3 = new Web3(fm.getProvider());

//Logs user in
let handleLogin = () => {
    fm.user.login().then(() => {
        console.log(fm.user.isLoggedIn());
        $('.container').hide();
        $('#logged-in').show();
        let userData = fm.user.getUser();
    });
}

//Logout
let handleLogout = () => {
    fm.user.logout();
    $('#logged-in').hide();
    $('.container').show();
    closeSideNav();
}

let send = () => {
    var input = document.getElementById("messageInput").value;
    var div = document.createElement("DIV");
    div.setAttribute("id", "message");
    div.setAttribute("class", "sender");

    var text = document.createTextNode(input);
    div.appendChild(text);

    var time = document.createElement("DIV");
    time.setAttribute("class", "time");
    var timeTxt = document.createTextNode(getTime());
    time.appendChild(timeTxt);

    var messages = document.getElementById('messages');

    if (input !== "") {
        var sameTime = false;
        for (var i=0; i < messages.childElementCount; i++) {
            if (time.innerText == messages.childNodes[i].innerText) {
                sameTime = true;
                break;
            }
        }
        if (!sameTime) {
            messages.insertBefore(time, messages.children[0]);
        }
        messages.insertBefore(div, messages.children[0]);        
    }

    document.getElementById('messageInput').value = "";
}

function getTime() {
    var d = new Date();
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = [3];

    var hour = d.getHours();
    var minute = d.getMinutes();
    var z = "am"

    if (hour >= 12) {
        z = "pm";
    }

    if (hour > 12) {
        hour -= 12;
    }

    minute = checkTime(minute);

    date[0] = month[d.getMonth()] + " " + d.getDate();
    date[1] = d.getFullYear();
    date[2] = hour + ":" + minute + " " + z;

    return date.join(", ");

    function checkTime(i) {
        if (i < 10) { i = "0" + i };
        return i;
    }
}

function openSideNav() {
    $('.sidenav').width('200px');
}

function closeSideNav() {
    $('.sidenav').width('0px');
}

function openContacts() {
    $('#contactPage').show();
    $('#chat').hide();
    closeSideNav();
}

function openChat() {
    console.log('hi');
    $('#chat').show();
    $('#contactPage').hide();
    closeSideNav();
}

let addContact = () => {
    if (document.getElementById('nameInput').value != '') {
        var name = document.createTextNode(document.getElementById('nameInput').value);
        var div = document.createElement('DIV');
        div.setAttribute('class', 'contact');
        div.appendChild(name);

        var contacts = document.getElementById('contacts');
        contacts.appendChild(div);

        document.getElementById('nameInput').value = '';
    }
}

window.onload = function() {
    $('#logged-in').hide();
    $('#chat').hide();
    $('#enter button').on('click', send);
    $('#btn-login').on('click', () => {
        handleLogin();
    });
    $('#btn-logout').on('click', () => {
        handleLogout();
    });

    $('.menu').on('click', openSideNav);
    $('#closeNav').on('click', closeSideNav);
    $('#contactLink').on('click', openContacts);
    $('#addContact button').on('click', addContact);
    $(document).on('click', '.contact', openChat);
}
