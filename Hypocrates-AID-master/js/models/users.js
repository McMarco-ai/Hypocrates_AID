export default class Users {

    constructor() {

        this.users = localStorage.users ? JSON.parse(localStorage.users) : []

        this.createAdmin()
    }

    createAdmin(){

        if(!this.users.some(user => user.username == "admin" || user.name == "Admin"))
        {
            this.users.push({username : "admin" , password : "admin" , type : "admin"})
            this._persist()
        }
    }

    loginUser(username)
    {   

        sessionStorage.setItem('activeUser',username)
    }

    signupUser(username,age,adress,password){

        this.users.push({username,age,adress,password})
        this._persist()
    }

    removeUser(selectedUsername) {
        this.users = this.users.filter(user => user.username != selectedUsername)
        this._persist()
    }

    getAllUsers(){

        return this.users
    }

    isLogedIn(){

        return sessionStorage.getItem('activeUser') !== null ? true : false
    }

    logout(){

        sessionStorage.removeItem('activeUser')
    }

    _persist(){
        localStorage.users = JSON.stringify(this.users)
    }
    
}

const users = new Users()

