using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Net;
using Newtonsoft.Json;

namespace aspnetcore_brew.Controllers
{
    [Route("api/[controller]")]
    public class IngredientController : Controller
    {


        [HttpGet("[action]")]
        public object Hops()
        {
            var json = System.IO.File.ReadAllText(@"Data\hops.json");

            object jsonObject = JsonConvert.DeserializeObject(json);
            return jsonObject;
        }


        public class Hop
        {
            public int Id { get; set; }
            public string Type { get; set; }
            public string HSI { get; set; }
            public string AlphaAcid { get; set; }
            public string BetaAcid { get; set; }
            public string Description { get; set; }
            public string UseIn { get; set; }
            public string Name { get; set; }
            public string CountryOfOrigin { get; set; }

        }
    }
}
