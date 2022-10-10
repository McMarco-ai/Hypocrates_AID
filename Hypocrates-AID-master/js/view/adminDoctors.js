import Doctors from '../models/doctors.js'

export default class AdminDoctors{

    constructor(){

        this.doctorsModel = new Doctors()
        this.pDoctorsTable = document.querySelector('#pDoctorsTable')
        this.createDoctorForm = document.querySelector('#createDoctorForm')
        this.newDoctorName = document.querySelector('#newDoctorName')
        this.newDoctorAge = document.querySelector('#newDoctorAge')
        this.newDoctorLatitude = document.querySelector('#newDoctorLatitude')
        this.newDoctorLongitude = document.querySelector('#newDoctorLongitude')
        this.newDoctorExpertise = document.querySelector('#newDoctorExpertise')
        this.doctors = this.doctorsModel.getAllDoctors()

        this.bindDoctorsTable()
        this.bindCreateDoctor()
    }

    bindDoctorsTable(){

        let result = ''

        if (this.doctors.length != 0)
        {
            result = `<table class="table" id="doctorsTable"> <thead><tr><th>Name</th><th>Age</th><th>Expertise</th><th>Location</th><th>Appointments</th><th>Rating</th><th>Remove</th></tr></thead>`
        
                this.doctors.forEach(doctor =>{

                    result +=   ` 
                                <tr>
                                    <td>${doctor.name}</td>
                                    <td>${doctor.age}</td>
                                    <td>${doctor.expertise}</td>
                                    <td>${doctor.lat},${doctor.lng}</td>
                                    <td>${doctor.appointments}</td>
                                    <td>${doctor.rating}</td>
                                    <td><button id="${doctor.name}" class="btn btn-danger">REMOVE</button></td>
                                </tr>
                                `

                })

            result += `</table>`
            this.pDoctorsTable.innerHTML = result
        }
        else
        {
            this.pDoctorsTable.innerHTML = "There are no Medics"
        }

        this.bindRemoveDoctor()
    }

    bindRemoveDoctor(){

        for (const removeButton of document.getElementsByClassName('btn btn-danger')) {

            removeButton.addEventListener('click', event => {
                this.doctorsModel.removeDoctor(event.target.id)
                window.location.replace('../html/adminDoctors.html');
            })
        }
    }
    
    bindCreateDoctor(){

        this.createDoctorForm.addEventListener('submit',event =>{

            event.preventDefault()
            const doctorName = this.newDoctorName.value
            const doctorAge = this.newDoctorAge.value
            const doctorExpertise = this.newDoctorExpertise.value
            const doctorLatitude = +(this.newDoctorLatitude.value)
            const doctorLongitude = +(this.newDoctorLongitude.value)

            this.doctorsModel.createDoctor(doctorName, doctorAge, doctorExpertise, doctorLatitude, doctorLongitude)
            window.location.replace('../html/adminDoctors.html');
        })
    }

}

new AdminDoctors()