const fm = new Fortmatic('pk_test_9E6F1DC09BE9D836');
window.web3 = new Web3(fm.getProvider());

var CURRENT_RECIPIENT =  ""
var CURRENT_UID = ""

//send user to login
let handleLanding = () => {
    $('#logged-in').hide();
    $('#LandingPage').hide();
    $('#loginPage').show();
    closeSideNav();
}

//Logs user in
let handleLogin = () => {
    fm.user.login().then(() => {
        console.log(fm.user.isLoggedIn());
        $('#loginPage').hide();
        $('#logged-in').show();
        let userData = fm.user.getUser().then(res => {
            document.getElementById("btn-3-h3").innerText += "  "+truncate(res.userId,16,'...')
            CURRENT_UID = res.userId
        })
    });
}

//Logout
let handleLogout = () => {
    fm.user.logout();
    $('#logged-in').hide();
    $('#loginPage').show();
    closeSideNav();
}

//Send message
let renderMessage = (input = document.getElementById("messageInput").value) => {
    var div = document.createElement("DIV");
    //div.setAttribute("class", "messageBubble");
    div.classList = ["messageBubble sender"]
    //div.setAttribute("class", "sender");

    var text = document.createTextNode(input);
    div.appendChild(text);

    var messages = document.getElementById('messages');
    messages.appendChild(div)

    document.getElementById('messageInput').value = "";
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        redirect: 'follow',
        referrer: 'no-referrer',
        body: JSON.stringify(data)
    });
    await response.clone().json()
    return response.clone().json()
}

autoReloadChat = () => {
    if(CURRENT_RECIPIENT!=""){
        e = {target:{lastChild: CURRENT_RECIPIENT}}
        loadChat(e)
    }
}

//setInterval(autoReloadChat,3000)

//Click a person's contact to open a chat
function loadChat(e) {
    to_addr = e.target.lastChild.innerText || e.target.lastChild
    console.log(to_addr)
    CURRENT_RECIPIENT = to_addr
    document.getElementById("messages").innerHTML = ""

    try {
        postData('/loadMessages', {addr: to_addr}).then(data => {
            console.log(data);
        })
    } catch (error) {
        console.error(error);
    }

    fetch('/json').then((res) => {
        return res.json();
    }).then(res1 => {
        console.log(res1)
        res1.data.reverse().forEach(message => {
            if (message.text!="" && CURRENT_RECIPIENT==message.recipient) renderMessage(message.text)
        })
    })
}

sendMessage = () => {
    input = document.getElementById("messageInput").value
    try {
        postData('/upload', {textToUpload:input,UID:CURRENT_UID,recipient:CURRENT_RECIPIENT}).then(data => {
            console.log(data);
        })
    } catch (error) {
        console.error(error);
    }
}


//function for truncation in the middle of a string
var truncate = function (fullStr, strLen, separator) {
    if (fullStr.length <= strLen) return fullStr;

    separator = separator || '...';

    var sepLen = separator.length,
        charsToShow = strLen - sepLen,
        frontChars = Math.ceil(charsToShow/2),
        backChars = Math.floor(charsToShow/2);

    return fullStr.substr(0, frontChars) +
           separator +
           fullStr.substr(fullStr.length - backChars);
}

if(!document.cookie.contacts){
    document.cookie = {
        contacts : ""
    }
}

//Adds a contact
let addContact = () => {
    if (document.getElementById('eth-field').value != '') {
        var name = document.createElement('H3')
        var raw = document.getElementById('eth-field').value
        name.innerText = raw
        if(document.cookie.contacts){
            document.cookie = {
                contacts: document.cookie+','+raw
            }
        } else {
            document.cookie = {
                contacts: raw
            }
        }
        var div = document.createElement('DIV');
        var img = document.createElement('IMG')
        img.src = 'http://localhost:3000/ethereum'
        img.setAttribute('class', 'account-icon')
        div.setAttribute('class', 'btn-2');
        div.appendChild(img)
        div.appendChild(name);

        var contacts = document.getElementById('contacts');
        contacts.appendChild(div);

        document.getElementById('eth-field').value = '';
    }
}

//Allows for adding events to dynamic elements
window.onload = function() {
    $('#loginPage').hide(); //Hides in login page
    $('#logged-in').hide(); //Hides in login page
    //$('#chat').hide(); //Hides chat page
    $('#btn-landing').on('click', () => { //Landing
        handleLanding();
    });
    $('#enter-button').on('click', renderMessage); //Send message
    $('#btn-login').on('click', () => { //Login
        handleLogin();
    });
    $('#btn-logout').on('click', () => { //Logout
        handleLogout();
    });
    $('#addContact button').on('click', addContact); //Adds a contact
    $(document).on('click', '.btn-2', e => loadChat(e)); //Opens chat page
}
