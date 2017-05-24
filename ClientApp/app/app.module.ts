import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from "@angular/platform-browser";
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { NavBarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { IngredientService } from "./components/ingredients/model/shared/ingredient.service";
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ToastrService } from "./components/common/toastr.service";
import { HopsListComponent } from "./components/ingredients/hops-list.component";
import { HopsItemComponent } from "./components/ingredients/hops-item.component";
import { HttpModule } from "@angular/http";
import { appRoutes } from "./routes";


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
        BrowserModule, 
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],
    providers: [ IngredientService, ToastrService ]
})
export class AppModule {
}
