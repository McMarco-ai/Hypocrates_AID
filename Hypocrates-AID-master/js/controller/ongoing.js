import AppointmentsModel from '../models/appointments.js'
import Users from '../models/users.js'
import Doctors from '../models/doctors.js'

export default class OngoingController{

    constructor(){

        this.appointmentsModel = new AppointmentsModel()
        this.usersModel = new Users()
        this.doctors = new Doctors()

        this.diagnosisInput = document.querySelector('#diagnosisInput')
        this.prescriptionInput = document.querySelector('#prescriptionInput')
        this.inputRating = document.querySelector('#inputRating')
        this.activeDoctor

        this.getActiveUserObject = (this.usersModel.getAllUsers().find(user => user.username == sessionStorage.activeUser))

        this.finishAppointment()
    }

    finishAppointment(){

        document.getElementById('appoitmentForm').addEventListener('submit',event=>{

            event.preventDefault()

            this.getActiveUserObject.status = "notActive"

            const user = this.getActiveUserObject
            const doctor = this.getActiveUserObject.ongoingDoctor
            const diagnosis = this.diagnosisInput.value
            const prescription = this.prescriptionInput.value
            const rating = this.inputRating.value
            
            this.getActiveUserObject.ongoingDoctor =""

            this.usersModel._persist()

            this.appointmentsModel.newAppointment(user.username,doctor,diagnosis,prescription)

            this.doctors.setDoctorRating(doctor,rating)

            window.location.replace('../html/home.html');
        })
    }
}

new OngoingController()