import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { IngredientService } from "./components/ingredients/shared/ingredient.service";
import { ToastrService } from "./components/common/toastr.service";
import { HopsListComponent } from "./components/ingredients/hops-list.component";
import { HopsItemComponent } from "./components/ingredients/hops-item.component";
import { HttpModule } from "@angular/http";

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        NavBarComponent,
        CounterComponent,
        FetchDataComponent,
        HopsListComponent,
        HopsItemComponent,
        HomeComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: 'hops', component: HopsListComponent },
            { path: '**', redirectTo: 'home' }
        ]),
        HttpModule
    ],
    providers: [ IngredientService, ToastrService ]
})
export class AppModule {
}
