import Doctors from '../models/doctors.js'
import Users from '../models/users.js'

export default class SchedulingController{

    constructor(){

        this.doctorsModel = new Doctors()
        this.usersModel = new Users()

        this.doctors = this.doctorsModel.getAllDoctors()
        this.activeUser = sessionStorage.activeUser
        this.getActiveUserObject = (this.usersModel.getAllUsers().find(user => user.username == this.activeUser))

        this.myMap
        this.activeDoctor
        this.durationArrival
        this.docFilter = ""
        this.doctorMarkers = []

        this.pSelectedDoctor = document.querySelector('#pSelectedDoctor')
        this.schedulingContainer = document.querySelector('#schedulingContainer')
        this.confirmAppointmentForm = document.querySelector('#confirmAppointmentForm')
        this.pDoctorFilters = document.querySelector('#pDoctorFilters')

        this.schedulingContainer.style.visibility="hidden"
        this.userLat
        this.userLng

        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();

        this.confirmAppoitment()
        this.filterDoctors()
    }

    setUserLocation(lat,lng){
        this.userLat = lat
        this.userLng = lng

    }


    setDocMarkers(map){

        this.myMap = map

            this.doctors.forEach(doctor =>{
            
                const marker = new google.maps.Marker({
    
                    position: {lat: doctor.lat, lng: doctor.lng} ,
                    map: map,
                    title: doctor.name,
                    icon: ('../img/medicMarkerIcon.png')
                })

                this.doctorMarkers.push({marker,doctor})
            })

        this.displayDocMarkers()

    }

    setFilteredDocMarkers(){

        const filteredDoctors = this.doctors.filter(doctor => doctor.expertise == this.docFilter)

            filteredDoctors.forEach(doctor=>{

                const marker = new google.maps.Marker({
            
                    position: {lat: doctor.lat, lng: doctor.lng} ,
                    map: this.myMap,
                    title: doctor.name,
                    icon: ('../img/medicMarkerIcon.png')
                })

                this.doctorMarkers.push({marker,doctor})
            })

        this.displayDocMarkers()
    }

    displayDocMarkers(){

        this.doctorMarkers.forEach(object =>{

            object.marker.setMap(this.myMap)
            object.marker.addListener("click",() => this.getRoute(object.doctor))
        })
    }

    getRoute(doctor){

        const request = {
            origin: {lat: doctor.lat, lng: doctor.lng},
            destination: {lat: this.userLat , lng: this.userLng},
            travelMode: google.maps.TravelMode['DRIVING']
        }

        this.directionsRenderer.setMap(this.myMap);
        
        this.directionsService.route(request,
            (result, status) => {
                if (status == 'OK') {
    
                    this.directionsRenderer.setDirections(result);
                    const directionsData = result.routes[0].legs[0]; // Get data about the mapped route
                    if (directionsData) {
                        this.selectDoctor(doctor,directionsData.distance.text,directionsData.duration.text)
                    }
                }
    
            })
    }

    listenerRadioSelect(){

        for (const radiobutton of document.getElementsByName('doctorFilterRadio')) {

            radiobutton.addEventListener('click', event => {
                this.doctorMarkers.forEach(object =>{

                    object.marker.setMap(null)
                })
                this.doctorMarkers = []
                this.docFilter = event.target.id
                this.directionsRenderer.setMap(null);
                this.schedulingContainer.style.visibility = "hidden"
                this.setFilteredDocMarkers()
            })
        }
    }


    filterDoctors(){

        let radioFilters = `<form>`
        let expertises = []

        this.doctors.forEach(doctor=>{

            if (!expertises.some(existingExpertise => existingExpertise == doctor.expertise)){
                expertises.push(doctor.expertise)
            }
        })

        expertises.forEach(expertise =>{

            radioFilters += `<input type="radio" name="doctorFilterRadio" id="${expertise}" value="${expertise}">
                             <label for="${expertise}"> ${expertise} </label>
                            `

        })

        radioFilters += `</form>`

        this.pDoctorFilters.innerHTML = radioFilters

        this.listenerRadioSelect()

    }

    
    setFilterValue(expertise){

        this.docFilter = expertise
    }

    selectDoctor(doctor,distance,duration){
        const table = `
            <table class="table" id="doctorTable">
            <thead>
            <tr><th>Name</th><th>Age</th><th>Expertise</th><th>Rating</th><th>Distance</th><th>ETA</th></tr>
            <thead>
            <tr>
                <td>${doctor.name}</td>
                <td>${doctor.age}</td>
                <td>${doctor.expertise}</td>
                <td>${doctor.rating}</td>
                <td>${distance}</td>
                <td>${duration}</td>
            </tr>
            </table>
        `
        this.activeDoctor = doctor
        this.durationArrival = duration
        this.schedulingContainer.style.visibility="visible"
        this.pSelectedDoctor.innerHTML = table
    }

    confirmAppoitment(){

        this.confirmAppointmentForm.addEventListener('submit', event=>{

            event.preventDefault()

            this.getActiveUserObject.status = "active"
            this.getActiveUserObject.ongoingDoctor = this.activeDoctor.name
            this.usersModel._persist()
            window.location.replace('../html/ongoing.html');
            
        })
    }
}

new SchedulingController

