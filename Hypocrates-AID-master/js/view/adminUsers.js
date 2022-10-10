import Users from '../models/users.js'

export default class AdminUsers{

    constructor(){

        this.usersModel = new Users()
        this.pUsersTable = document.querySelector('#pUsersTable')

        this.bindUsersTable()
    }
    
    bindUsersTable(){

        let result = ''

        const allUsers = this.usersModel.users.filter(user => user.username != "Admin" && user.username != "admin")

        if (allUsers.length != 0){

            result = `<table class="table" id="usersTable"> <thead><tr><th>Name</th><th>Age</th><th>Adress</th><th>Remove</th></tr></thead>`
        
                allUsers.forEach(user =>{

                    result +=   ` 
                                <tr>
                                    <td>${user.username}</td>
                                    <td>${user.age}</td>
                                    <td>${user.adress}</td>
                                    <td><button id="${user.username}" class="btn btn-danger">REMOVE</button></td>
                                </tr>
                                `

                })

            result += `</table>`
            this.pUsersTable.innerHTML = result
        }

        else{

            this.pUsersTable.innerHTML = "There are no Medics"
        }

        this.bindRemoveUser()
    }

    bindRemoveUser(){

        for (const removeButton of document.getElementsByClassName('btn btn-danger')) {

            removeButton.addEventListener('click', event => {
                this.usersModel.removeUser(event.target.id)
                window.location.replace('../html/adminUsers.html');
            })
        }
    }
}

new AdminUsers()