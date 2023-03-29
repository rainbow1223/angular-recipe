import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{
    isLoginMode: boolean = false; 
    isLoading: boolean = false; 
    error: string = null; 

    constructor(private authService: AuthService) {}

    switchLoginMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return ;
        } else {
            if(this.isLoginMode) {
                //  ... 
            } else {
                
                const email = form.value.email;
                const password = form.value.password;
                this.isLoading = true; 
                
                this.authService.signup(email, password).subscribe(resData => {
                    console.log(resData);
                    this.isLoading = false;
                }, error => {
                    console.log(error)
                    this.error = "Error Occured" 
                    this.isLoading = false;
                })
            }
        }

    }
}