// Initialize provider
import Fortmatic from 'fortmatic';
import Web3 from 'web3';

class Fm {
  constructor() {
    this.fm = new Fortmatic('pk_test_9E6F1DC09BE9D836');
    window.web3 = new Web3(fm.getProvider());
  }

  //Logs user in
  handleLogin = () => {
    fm.user.login();
  }

  //Checks if user is logged-in
  loggedIn = () => {
    let isLoggedIn = await this.fm.user.isLoggedIn();
    return isLoggedIn;
  }

  //Logout
  handleLogout = () => {
    this.fm.user.logout();
  }
}

export default Fm;