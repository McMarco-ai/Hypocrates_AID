import Users from '../models/users.js'
import AppointmentsModel from '../models/appointments.js'

export default class ProfileController{

    constructor(){

        this.modelUsers = new Users()
        this.appointmentsModel = new AppointmentsModel()

        this.appointments = this.appointmentsModel.getAllAppoitments()
        this.activeUser = sessionStorage.activeUser
        this.getActiveUserObject = (this.modelUsers.getAllUsers().find(user => user.username == this.activeUser))
        this.pAppointmentsTable = document.querySelector("#pAppointmentsTable")

        this.setAppointmentsTable()
    }

    
    setAppointmentsTable(){

        let result = ''

        const myAppointments = this.appointments.filter(appointment=> appointment.user != this.activeUser)

        if (myAppointments.length != 0){

            result = `<table class="table" id="appointmentsTable"> <thead><tr><th>Date</th><th>Doctor</th><th>Diagnosis</th><th>Prescriptions</th></tr></thead>`
        
                this.appointments.forEach(appointment =>{

                    result +=   ` 
                                <tr>
                                    <td>${appointment.date}</td>
                                    <td>${appointment.doctor}</td>
                                    <td>${appointment.diagnosis}</td>
                                    <td>${appointment.prescriptions}</td>
                                </tr>
                                `

                })

            result += `</table>`
            this.pAppointmentsTable.innerHTML = result
        }

        else{

            this.pAppointmentsTable.innerHTML = "You have no Appointments"
        }
    }

    
    changeUserName(newUserName){

        this.getActiveUserObject.username = newUserName
        this.modelUsers._persist()
        this.modelUsers.logout()
        this.modelUsers.loginUser(newUserName)
    }

    changeUserAge(newUserAge){

        this.getActiveUserObject.age = newUserAge
        this.modelUsers._persist()
    }

    changeUserAdress(newUserAdress){

        this.getActiveUserObject.adress = newUserAdress
        this.modelUsers._persist()
    }

    changeUserPassword(activeUserPassword , newUserPassword){

        if (this.getActiveUserObject.password == activeUserPassword)
        {
            this.getActiveUserObject.password = newUserPassword
        }
        else
        {
            alert("Incorrect Password")
        }
        this.modelUsers._persist()
    }

}