using Bing;
using CarFinder_v2.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CarFinder_v2.Controllers
{
    [RoutePrefix("api/cars")]
    public class CarsController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public class Options 
        {
            public string year { get; set; }
            public string make { get; set; }
            public string model { get; set; }
            public string trim { get; set; }
            public string filter { get; set; }
            public bool paging { get; set; }
            public int? page { get; set; }
            public int? perPage { get; set; }
        }


        [HttpPost]
        [Route("GetYears")]
        public async Task<List<string>> GetYears() 
        {
            var years = await db.GetYears();
            return years;
        }

        [HttpPost]
        [Route("GetMakes")]
        public async Task<List<string>> GetMakes(Options options)
        {
            return await db.GetMakes(options.year);
        }

        [HttpPost]
        [Route("GetModels")]
        public async Task<List<string>> GetModels(Options options)
        {
            return await db.GetModels(options.year, options.make);
        }

        [HttpPost]
        [Route("GetTrims")]
        public async Task<List<string>> GetTrims(Options options)
        {
            return await db.GetTrims(options.year, options.make, options.model);
        }

        [HttpPost]
        [Route("GetCars")]
        public async Task<List<Car>> GetCars(Options options)
        {
            return await db.GetCars(options.year, options.make, options.model, options.trim, options.filter, options.paging, options.page, options.perPage);
        }

        [HttpGet, HttpPost, Route("getCar")]
        public async Task<IHttpActionResult> getCar([FromBody]int Id)
        {
            var car = db.Cars.Find(Id);
            dynamic recalls = "";
            var image = "";

            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri("http://www.nhtsa.gov/");
                try
                {
                    var response = await client.GetAsync("webapi/api/Recalls/vehicle/modelyear/" + car.model_year + "/make/" + car.make + "/model/" + car.model_name + "?format=json");
                    recalls = JsonConvert.DeserializeObject( await response.Content.ReadAsStringAsync());
                }
                catch (Exception e)
                {
                    return InternalServerError(e);
                }
            }

            var images = new BingSearchContainer(new Uri("https://api.datamarket.azure.com/Bing/search/"));
            images.Credentials = new NetworkCredential("accountKey",
                ConfigurationManager.AppSettings["bing"]);
            var marketData = images.Composite(
                "image",
                car.model_year + " " + car.make + " " + car.model_name + " " + car.model_trim,
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                 "Size:Large+Aspect:Wide",
                null,
                null,
                null,
                null,
                null
                ).Execute();

            //image = marketData.FirstOrDefault().Image.FirstOrDefault().MediaUrl;

            var t = marketData.FirstOrDefault();
            var x = t != null ? t.Image.FirstOrDefault() : null;
            var q = x != null ? x.MediaUrl : null;

            return Ok(new { car, image = q, recalls });
        }
    }
}
