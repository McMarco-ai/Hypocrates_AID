import AppointmentsModel from '../models/appointments.js'

export default class AdminAppointments{

    constructor(){

        this.appointmentsModel = new AppointmentsModel()
        this.pAppointmentsTable = document.querySelector('#pAppointmentsTable')
        this.appointments = this.appointmentsModel.getAllAppoitments()

        this.bindAppointmentsTable()
    }

    bindAppointmentsTable(){

        let result = ''

        if (this.appointments.length != 0){

            result = `<table class="table" id="appointmentsTable"> <thead><tr><th>Patient</th><th>Date</th><th>Doctor</th><th>Diagnosis</th><th>Prescriptions</th></tr></thead>`
        
                this.appointments.forEach(appointment =>{

                    result +=   ` 
                                <tr>
                                    <td>${appointment.patient}</td>
                                    <td>${appointment.date}</td>
                                    <td>${appointment.doctor}</td>
                                    <td>${appointment.diagnosis}</td>
                                    <td>${appointment.prescriptions}</td>
                                    <td><button id="${appointment.code}" class="btn btn-danger">REMOVE</button></td>
                                </tr>
                                `

                })

            result += `</table>`
            this.pAppointmentsTable.innerHTML = result
        }

        else{

            this.pAppointmentsTable.innerHTML = "There are no Appointments"
        }

        this.bindRemoveAppointment()
    }

    bindRemoveAppointment(){

        for (const removeButton of document.getElementsByClassName('btn btn-danger')) {

            removeButton.addEventListener('click', event => {
                this.appointmentsModel.removeAppointment(event.target.id)
                window.location.replace('../html/adminAppointments.html');
            })
            
        }
    }
}

new AdminAppointments()