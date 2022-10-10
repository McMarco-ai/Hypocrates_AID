import LoginController from '../controller/login.js'

export default class LoginView {

    constructor(){

        this.loginController = new LoginController()
        
        this.loginForm = document.querySelector("#loginForm")
        this.loginUsername = document.querySelector("#loginUsername")
        this.loginPassword = document.querySelector("#loginPassword")
        this.loginSubmit = document.querySelector("#loginSubmit")
        
        this.bindLoginForm()
    }

    //Prevent form validation and get both username and password indicated

    bindLoginForm() {

        this.loginForm.addEventListener('submit', event => {

            event.preventDefault();
            
            this.loginController.validateLogin(this.loginUsername.value , this.loginPassword.value)

        })
    }
}

new LoginView()