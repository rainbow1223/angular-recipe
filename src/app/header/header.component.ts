import { Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy{
    
    isAuthenticated: boolean = false;
    userSub: Subscription; 

    constructor(private recipeService: RecipeService, 
        private dataStorageSl: DataStorageService,
        private authService: AuthService){}

    ngOnInit() {
        this.userSub = this.authService.user.subscribe(
            user => {
               this.isAuthenticated = !!user;
               console.log(!user);
               console.log(!!user); 
            }
        )
    }
    onSaveData(){
        this.dataStorageSl.StoreRecipes()
    }
    onFetchData(){
        this.dataStorageSl.fetchRecipes().subscribe()
    }
    onLogout() {
        this.authService.logout()
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}