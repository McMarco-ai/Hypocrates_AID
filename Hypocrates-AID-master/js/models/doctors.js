export default class Doctors{

    constructor() {

        this.doctors = localStorage.doctors ? JSON.parse(localStorage.doctors) : []
    }

    getAllDoctors(){

        return this.doctors
    }

    createDoctor(doctorName,age,expertise,lat,lng){

        if(!this.doctors.some(doctor => doctor.name == doctorName)){

        this.doctors.push({name:doctorName,age,expertise,lat,lng,appointments:0,rating:0})
        this._persist()
        }

        else{

            alert("Medic already exists!")
        }
    }

    removeDoctor(doctorName){

        this.doctors = this.doctors.filter(doctor => doctor.name != doctorName)
        this._persist()
    }

    _persist(){
        localStorage.doctors = JSON.stringify(this.doctors)
    }
    
    setDoctorRating(doctorName,patientRating){

        const selectedDoctor = this.doctors.find(doctor => doctor.name == doctorName)

        let total

        if(selectedDoctor.appointments == 0)
        {   
            total = 0
        }
        else
        {
            total = selectedDoctor.rating * selectedDoctor.appointments
        }

        total += +patientRating

        selectedDoctor.rating = Math.round((total / ++selectedDoctor.appointments) * 10) / 10

        this._persist()
    }
}

const myDoctors = new Doctors()