
namespace AngularCoreSample.Models
{
    using Newtonsoft.Json;

    public class Hero
    {
        private static uint idCount;

        public Hero()
        {
            this.Id = 0;
            this.Name = null;
        }

        public Hero(string name)
        {
            this.Id = idCount++;
            this.Name = name;
        }

        [JsonProperty("id")]
        public uint Id { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }
    }
}
