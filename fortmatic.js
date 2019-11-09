// Initialize provider

//For Kevin: uncomment next two lines after npm installing
//import Fortmatic from 'fortmatic';
//import Web3 from 'web3';

const fm = new Fortmatic('pk_test_9E6F1DC09BE9D836');
window.web3 = new Web3(fm.getProvider());

//Logs user in
let handleLogin = () => {
    fm.user.login();
    $('#section-login').hide();
    $('#section-logout').show();
    let userData = fm.user.getUser();
}

//Logout
let handleLogout = () => {
    fm.user.logout();
    $('#section-logout').hide();
    $('#section-login').show();
}

window.onload = function() {
    $('#section-logout').hide();
    $('#btn-login').click(() => {
        handleLogin();
    });
    $('#btn-logout').click(() => {
        handleLogout();
    });
}
