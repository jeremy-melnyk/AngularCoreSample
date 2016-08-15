
namespace AngularCoreSample.Services
{
    using System.Collections.Generic;

    using Models;

    public interface IHeroesService
    {
        List<Hero> Heroes { get; }

        void AddHero(Hero hero);
    }
}
