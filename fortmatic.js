// Initialize provider
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

const fm = new Fortmatic('pk_test_9E6F1DC09BE9D836');
window.web3 = new Web3(fm.getProvider());

//Logs user in
let handleLogin = async () => {
    let accounts = await fm.user.login();
    if (loggedIn()) {
        let userData = await fm.user.getUser();
    }
}

//Checks if user is logged-in
let loggedIn = () => {
    let isLoggedIn = await fm.user.isLoggedIn();
    return isLoggedIn;
}

//Logout
let handleLogout = () => {
    fm.user.logout();
}