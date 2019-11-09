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
}

let send = () => {
    var input = document.getElementById("input").value;
    var div = document.createElement("DIV");
    div.setAttribute("id", "message");

    var text = document.createTextNode("You: " + input);
    div.appendChild(text);

    var messages = document.getElementById("messages");

    if (input !== "") {
        messages.insertBefore(div, messages.children[0]);
    }

    document.getElementById("input").value = "";
}

window.onload = function() {
    $('#logged-in').hide();
    $('#enter button').click(send);
    $('#btn-login').click(() => {
        handleLogin();
    });
    $('#btn-logout').click(() => {
        handleLogout();
    });
}
