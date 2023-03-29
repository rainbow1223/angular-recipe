import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent{

    isLoginMode: boolean = false; 
    isLoading: boolean = false; 
    error: string = null; 
    
    constructor(private authService: AuthService, private router: Router) {}

    switchLoginMode() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if(!form.valid) {
            return ;
        } else {
            const email = form.value.email;
            const password = form.value.password;
            let authObs: Observable<any>;

            if(this.isLoginMode) {
                //  ... 
                this.isLoading = true; 
                authObs = this.authService.login(email, password)
            } else {
                
                this.isLoading = true; 
                authObs = this.authService.signup(email, password)
            }
            authObs.subscribe(
                resData => {
                console.log(resData);
                this.isLoading = false;
                this.router.navigate(['/recipes'])
                }, 
                errorMessage => {
                console.log(errorMessage)
                this.error = errorMessage
                this.isLoading = false;
            })
        }
    }
}