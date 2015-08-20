using CarFinder_v2.Models;
using System;
using System.Collections.Generic;
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

        [Route("GetYears")]
        public async Task<List<string>> GetYears() 
        {
            return await db.GetYears();
        }

        [Route("GetMakes")]
        public async Task<List<string>> GetMakes(int year)
        {
            return await db.GetMakes(year);
        }

        [Route("GetModels")]
        public async Task<List<string>> GetModels(int year, string make)
        {
            return await db.GetModels(year, make);
        }

        [Route("GetCars")]
        public async Task<List<Car>> GetCars(int year, string make, string model, string trim, string filter = null, bool paging = false, int? page = null, int? perPage = null)
        {
            return await db.GetCars(year, make, model, trim, filter, paging, page, perPage);
        }
    }
}
