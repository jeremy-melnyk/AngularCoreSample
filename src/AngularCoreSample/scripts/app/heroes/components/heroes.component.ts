import { Component, OnInit } from "@angular/core";

import { Hero } from "../models/hero";
import { HeroesService } from "../services/heroes.service";

@Component({
    moduleId: module.id,
    selector: "heroes",
    templateUrl: "heroes.component.html",
    styleUrls: ["heroes.component.css"]
})
export class HeroesComponent implements OnInit {
    title: string;
    heroes: Array<Hero>;
    heroName: string;
    selectedHero: Hero;
    error: any;

    constructor(private heroesService: HeroesService) {
        this.title = "Tour Of Heroes";
        this.heroName = "Type new hero name here.";
    }

    ngOnInit(): void {
        this.getHeroes();
    }

    onSelect(hero: Hero) {
        this.selectedHero = hero;
    }

    private addHero(): void {
        if (this.heroName && this.heroName !== "") {
            const hero = new Hero(this.heroName);
            this.heroesService
                .addHero(hero)
                .subscribe(newHero => this.heroes.push(newHero), error => this.error = error);   
        }
    }

    private getHeroes(): void {
        this.heroesService
            .getHeroes()
            .subscribe(heroes => this.heroes = heroes, error => this.error = error);
    }
}