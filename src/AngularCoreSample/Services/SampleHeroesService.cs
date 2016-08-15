
namespace AngularCoreSample.Services
{
    using System;
    using System.Collections.Generic;

    using Microsoft.Extensions.Configuration;

    using Models;

    using Newtonsoft.Json;

    public class SampleHeroesService : IHeroesService
    {
        public SampleHeroesService(IConfiguration configuration)
        {
            this.Heroes = new List<Hero>();

            // Get list of hero names from inject configuration.
            var heroNames = JsonConvert.DeserializeObject<List<string>>(configuration["HeroNames"]);

            // Initialize the list of heroes.
            foreach (var heroName in heroNames)
            {
                var hero = new Hero(heroName);
                this.Heroes.Add(hero);
            }
        }

        public List<Hero> Heroes { get; }

        public void AddHero(Hero hero)
        {
            if (hero == null)
            {
                throw new ArgumentNullException(nameof(hero));
            }

            this.Heroes.Add(hero);
        }
    }
}
