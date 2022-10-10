export default class AppointmentsModel{

    constructor(){

        this.appoitments = localStorage.appoitments ? JSON.parse(localStorage.appoitments) : []
        this.date = new Date()
    }

    newAppointment(user,doctor,diagnosis,prescriptions){

        const date = (`${this.date.getDate()}-${this.date.getMonth()+1}-${this.date.getFullYear()} ${this.date.getHours()}:${this.date.getMinutes()}H`)
        const code = (`${user}:${this.date.getDate()}D-${this.date.getMonth()+1}M-${this.date.getFullYear()}Y ${this.date.getHours()}:${this.date.getMinutes()}H`)
        this.appoitments.push({code,patient:user,date,doctor,diagnosis,prescriptions})
        this._persist()
    }

    removeAppointment(selectedCode){

        this.appoitments = this.appoitments.filter(appointment => appointment.code != selectedCode)
        this._persist()
    }

    getAllAppoitments(){

        return this.appoitments
    }

    _persist(){
        
        localStorage.appoitments = JSON.stringify(this.appoitments)
    }

}