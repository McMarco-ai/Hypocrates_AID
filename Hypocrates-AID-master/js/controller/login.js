import Users from '../models/users.js'

export default class LoginController {

    constructor() {

        this.users = new Users()
    }

    //Validate form credentials for an already existing user

    validateLogin(loginUsername,loginPassword) {

        if(this.users.getAllUsers().some(user => user.username == loginUsername && user.password == loginPassword)){

            this.users.loginUser(loginUsername)
            alert(`Logged in Successfully as ${loginUsername}`)
            window.location.replace('../html/home.html');
        }
        else
        {
            alert('Incorrect Credentials')
            window.location.replace('../html/login.html');
        }
    }

    //Validate if there's no user with the choosed username.
    //If so, proceed to model for user registration in local storage

    validateSignup(createUsername,createAge,createAdress,createPassword) {

        if(!this.users.getAllUsers().some(user => user.username == createUsername)){

            this.users.signupUser(createUsername,createAge,createAdress,createPassword)
            alert('SignedUp Successfully')
            window.location.replace('../html/login.html');
        }

        else{

            alert("Username already in use!")
        }
    }
}
