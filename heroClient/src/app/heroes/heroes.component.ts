import { Component,OnInit  } from '@angular/core';
import { Hero } from './../models/hero';
import { HeroService } from './../services/hero.service';
import { Router} from '@angular/router';


@Component({
  selector: 'my-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: [ './heroes.component.css' ]
})

export class HeroesComponent implements OnInit {

  heroes: Hero[];
  selectedHero: Hero;
  errorMessage: any;

  isActive = true;
  // injecting a Service
  constructor(private heroService: HeroService, private router: Router) { }

  ngOnInit(): void {
    this.getHeroes();
  }


  getHeroes(): void {
    // this.heroService.getHeroes().then(heroesRet => this.heroes=heroesRet);
  this.heroService.getHeroes().subscribe(
                      heroes => this.heroes = heroes,
                      error =>  this.errorMessage = <any>error);
}

gotoDetail(): void {
  // sending Route params - this requires using an array  with path followed by Route Param
  this.router.navigate(['/detail', this.selectedHero.id]);
}

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  add(name: string, $event): void {
    console.log($event);
  name = name.trim();
  if (!name) { return; }
  this.heroService.create(name)
    .subscribe(hero => {
      console.log(hero);
      this.heroes.push(hero);
      this.selectedHero = null;
    });
}

delete(hero: Hero): void {
  this.heroService
      .delete(hero.id)
      .subscribe(() => {
        this.heroes = this.heroes.filter(h => h !== hero);
        if (this.selectedHero === hero) { this.selectedHero = null; }
      });
}


}
