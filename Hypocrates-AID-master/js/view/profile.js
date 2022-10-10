import ProfileController from '../controller/profile.js'

export default class ProfileView{

    constructor(){

        this.profileController = new ProfileController()

        this.newUserName = document.querySelector('#newUserName')
        this.newUserAge = document.querySelector('#newUserAge')
        this.newUserAdress = document.querySelector('#newUserAdress')
        this.activeUserPassword = document.querySelector('#activeUserPassword')
        this.newUserPassword = document.querySelector('#newUserPassword')
        this.editProfileForm = document.querySelector('#editProfileForm')

        this.bindNewUserSettings()
    }

    
    bindNewUserSettings(){

        this.editProfileForm.addEventListener("submit",event=>{

            event.preventDefault();

            if(this.newUserName.value != "")
            {
                this.profileController.changeUserName(this.newUserName.value)
            }

            if(this.newUserAge.value != "")
            {
                this.profileController.changeUserAge(this.newUserAge.value)
            }

            if(this.newUserAdress.value != "")
            {
                this.profileController.changeUserAdress(this.newUserAdress.value)
            }

            if(this.newUserPassword.value != "")
            {
                this.profileController.changeUserPassword(this.activeUserPassword.value , this.newUserPassword.value)
            }

            window.location.replace('../html/profile.html');
        })
    }
}

new ProfileView()