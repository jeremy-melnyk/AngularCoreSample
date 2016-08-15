import { Component } from "@angular/core";

@Component({
    moduleId: module.id,
    selector: "home",
    templateUrl: "home.component.html",
    styleUrls: ["home.component.css"]
})
export class HomeComponent {
    private baseImagePath: string;
    banner1: string;
    banner2: string;
    banner3: string;
    banner4: string;

    constructor() {
        this.baseImagePath = "./images/";

        this.banner1 =  this.baseImagePath + "banner1.svg";
        this.banner2 = this.baseImagePath + "banner2.svg";
        this.banner3 = this.baseImagePath + "banner3.svg";
        this.banner4 = this.baseImagePath + "banner4.svg";
    }
}