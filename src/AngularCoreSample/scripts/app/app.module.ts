import { BrowserModule } from "@angular/platform-browser";
import { NgModule }      from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { routing, appRoutingProviders  } from "./app.routing";

import { AppComponent }  from "./app.component";
import { HomeComponent } from "./home/components/home.component";
import { HeroesComponent } from "./heroes/components/heroes.component";

import { HeroesService } from "./heroes/services/heroes.service";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        routing
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        HeroesComponent
    ],
    providers: [
        HeroesService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }