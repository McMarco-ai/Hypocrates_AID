import Users from '../models/users.js'

export default class HomeView{

    constructor(){

        this.usersModel = new Users()

        this.activeUser = sessionStorage.activeUser
        this.getActiveUserObject = (this.usersModel.getAllUsers().find(user => user.username == this.activeUser))
        this.pNavbar = document.querySelector('#pNavbar')

        this.checkLogin()
    
        this.loginButton = document.querySelector('#loginButton')
        this.logoutButton = document.querySelector('#logoutButton')
        this.schedulingButton = document.querySelector('#schedulingButton')
        this.profileButton = document.querySelector('#profileButton')
        this.adminButton = document.querySelector('#adminButton')
        this.leaderboardButton = document.querySelector('#leaderboardButton')

        this.checkStatus()
        this.logout()
    }
    
        checkLogin(){

            let result
    
            if(this.usersModel.isLogedIn() && this.getActiveUserObject.type == "admin"){
                result = `
                            <ul class="nav" id="navbar">

                            <img src="../img/smallLogoWhite.png" id="logo" onclick="location.href='home.html'">

                            <div class="box" id="logoutButton"> <a href="../html/home.html"> Logout </a> </div>

                            <div class="box" id="leaderboardButton"><a href="leaderboard.html">  LeaderBoard </a> </div>

                            <div class="box" id="adminButton"> <a href="../html/adminDoctors.html"> Admin </a> </div>
                            
                            </ul>
                        `

                this.pNavbar.innerHTML = result
            }
            else if (this.usersModel.isLogedIn() && this.getActiveUserObject.type != "admin"){

                result = `
                            <ul class="nav" id="navbar">

                            <img src="../img/smallLogoWhite.png" id="logo" onclick="location.href='home.html'">

                            <div class="box" id="logoutButton"> <a href="../html/home.html"> Logout </a> </div>

                            <div class="box" id="profileButton"> <a href="../html/profile.html"> Profile </a> </div>

                            <div class="box" id="schedulingButton"> <a href="scheduling.html"> Scheduling </a></div>

                            <div class="box" id="leaderboardButton"><a href="leaderboard.html">  LeaderBoard </a> </div>
                            
                            </ul>
                        `

                this.pNavbar.innerHTML = result
            } 
            else{
    
                result = `
                            <ul class="nav" id="navbar">

                            <img src="../img/smallLogoWhite.png" id="logo" onclick="location.href='home.html'">
                            
                            <div class="box" id="loginButton"> <a href="login.html"> Login </a></div>
                            
                            </ul>
                        `

                this.pNavbar.innerHTML = result
            }
        }

        checkStatus(){

            if (this.usersModel.isLogedIn() && this.getActiveUserObject.status == "active"){

                window.location.replace('../html/ongoing.html');
            }
        }

        logout(){

            this.logoutButton.addEventListener("click",event=>{
                this.usersModel.logout();
            })
        }
    
}
new HomeView()