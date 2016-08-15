import { Component } from "@angular/core";

import "bootstrap/bootstrap";
import "jquery/jquery";

@Component({
    moduleId: module.id,
    selector: "app",
    templateUrl: "app.component.html",
    styleUrls: ["app.component.css"]
})
export class AppComponent {
    appTitle: string;
    footerTitle: string;

    constructor() {
        this.appTitle = "AngularCoreSample";
        this.footerTitle = `2016 - ${this.appTitle}`;
    }
}