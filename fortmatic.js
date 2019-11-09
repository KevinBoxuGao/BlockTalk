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

//Send message
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
        var sameTime = false; //Won't display time if minute is the same
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

//Gets time
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

//Open sidenav
function openSideNav() {
    $('.sidenav').width('200px');
}

//Close sidenav
function closeSideNav() {
    $('.sidenav').width('0px');
}

//Click contacts link to open contacts
function openContacts() {
    $('#contactPage').show();
    $('#chat').hide();
    closeSideNav();
}

//Click a person's contact to open a chat
function openChat() {
    console.log('hi');
    $('#chat').show();
    $('#contactPage').hide();
    closeSideNav();
}

//Adds a contact
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

//Allows for adding events to dynamic elements
window.onload = function() {
    $('#logged-in').hide(); //Hides in login page
    $('#chat').hide(); //Hides chat page
    $('#enter button').on('click', send); //Send message
    $('#btn-login').on('click', () => { //Login
        handleLogin();
    });
    $('#btn-logout').on('click', () => { //Logout
        handleLogout();
    });

    $('.menu').on('click', openSideNav); //Opens sidenav
    $('#closeNav').on('click', closeSideNav); //Closes sidenav
    $('#contactLink').on('click', openContacts); //Opens contact page
    $('#addContact button').on('click', addContact); //Adds a contact
    $(document).on('click', '.contact', openChat); //Opens chat page
}
