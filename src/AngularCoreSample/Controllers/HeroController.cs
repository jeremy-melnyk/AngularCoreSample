
namespace AngularCoreSample.Controllers
{
    using System.Text;

    using Microsoft.AspNetCore.Mvc;

    using Models;

    using Newtonsoft.Json;

    using Services;

    public class HeroController : Controller
    {
        private const string ContentType = "application/json";

        public HeroController(IHeroesService heroesService)
        {
            this.HeroesService = heroesService;
        }

        public IHeroesService HeroesService { get; set; }

        [HttpGet]
        public IActionResult GetHeroes()
        {
            // Retrieve the list of heroes
            var heroes = this.HeroesService.Heroes;
            var body = JsonConvert.SerializeObject(heroes);
            return this.Content(body, ContentType, Encoding.UTF8);
        }

        [HttpPost]
        public IActionResult AddHero([FromBody] Hero hero)
        {
            if (!this.ModelState.IsValid)
            {
                return this.BadRequest();
            }

            // Add the new hero to the existing list of heroes
            var newHero = new Hero(hero.Name);
            this.HeroesService.Heroes.Add(newHero);

            // Return the added hero
            var body = JsonConvert.SerializeObject(newHero);
            return this.Content(body, ContentType, Encoding.UTF8);
        }
    }
}
