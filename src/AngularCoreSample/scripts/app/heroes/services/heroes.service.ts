import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";

import { Hero } from "../models/hero";

import { Observable } from "rxjs/Observable";
import { ErrorObservable } from "rxjs/observable/ErrorObservable";
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HeroesService {
    constructor(private http: Http) {       
    }

    getHeroes() : Observable<Array<Hero>> {
        return this.http
            .get("/Hero/GetHeroes")
            .map(this.extractHeroesData)
            .catch(this.handleError);
    }

    addHero(hero: Hero): Observable<Hero> {
        const body = JSON.stringify(hero);
        const headers = new Headers({ "Content-Type": "application/json" });
        const options = new RequestOptions({ headers: headers });

        return this.http.post("/Hero/AddHero", body, options)
            .map(this.extractHeroData)
            .catch(this.handleError);
    }

    private extractHeroesData(response: Response): Array<Hero> {
        return response.json() as Array<Hero>;
    }

    private extractHeroData(response: Response): Hero {
        return response.json() as Hero;
    }

    private handleError(error: any): ErrorObservable {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        const errorMessage = error.message ? error.message : "Could not resolve the error message";
        const errorStatus = error.status && error.statusText ? `${error.status} - ${error.statusText}` : "Could not resolve the error status";
        const formattedError = `${errorMessage} - ${errorStatus}`;
        // Log to console
        console.error(formattedError);
        return Observable.throw(formattedError);
    }
}