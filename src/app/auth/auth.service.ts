import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Subject, throwError } from "rxjs";
import { tap } from 'rxjs/operators'
import { User } from "./user.model";


export interface AuthResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService{

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient){}

    signup(email: string, password: string) {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyC9jzZnnSe7ehRv9i9vIbrHUR-QxWj7PMk',
            {
              email: email,
              password: password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localId,
                    resData.idToken,
                    +resData.expiresIn
                )
               }),
            
            catchError(this.handleError),
          
          );
      }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC9jzZnnSe7ehRv9i9vIbrHUR-QxWj7PMk', 
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            tap(resData => {
                this.handleAuthentication(
                  resData.email,
                  resData.localId,
                  resData.idToken,
                  +resData.expiresIn
                );
              }),
            catchError(this.handleError)
        )
    }

    private handleError(errorRes: HttpErrorResponse){
        // console.log(errorRes)
        let errorMessage = "Unknown Error Occured"
        if(!errorRes.error || !errorRes.error.error) {
            return errorMessage
        }
        switch(errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = "This email exist"
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email does not exist"
                break;
            case 'INVALID_PASSWORD':
                errorMessage = "Password is Invalid"
                break;
            case 'USER_DISABLED':
                errorMessage = "This user account has been disabled by an administrator"
                break;

        }
        return throwError(errorMessage)
    }

    private handleAuthentication(
        email: string,
        userId: string,
        token: string,
        expiresIn: number
      ) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
      }
}