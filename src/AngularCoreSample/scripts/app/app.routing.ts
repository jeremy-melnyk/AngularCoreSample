import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/components/home.component";
import { HeroesComponent } from "./heroes/components/heroes.component";

const appRoutes: Routes  = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent },
    { path: "heroes", component: HeroesComponent }
];

export const appRoutingProviders: any[] = [

];

export const routing = RouterModule.forRoot(appRoutes);
