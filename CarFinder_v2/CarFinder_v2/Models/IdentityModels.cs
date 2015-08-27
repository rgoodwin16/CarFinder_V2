using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Collections.Generic;
using System.Data.SqlClient;

namespace CarFinder_v2.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }
                
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<Car> Cars { get; set; }

        public async Task<List<string>> GetYears()
        {
            return await Database.SqlQuery<string>("GetYears").ToListAsync();
        }

        public async Task<List<string>> GetMakes(string year)
        {
            var yearParam = new SqlParameter("@year", year);

            return await Database.SqlQuery<string>("GetMakes @year", yearParam).ToListAsync();
        }

        public async Task<List<string>> GetModels(string year, string make)
        {
            var yearParam = new SqlParameter("@year", year);
            var makeParam = new SqlParameter("@make", make);

            return await Database.SqlQuery<string>("GetModels @year, @make", yearParam, makeParam).ToListAsync();
        }

        public async Task<List<string>> GetTrims(string year, string make, string model)
        {
            var yearParam = new SqlParameter("@year", year);
            var makeParam = new SqlParameter("@make", make);
            var modelParam = new SqlParameter("@model", model);

            return await Database.SqlQuery<string>("GetTrims @year, @make, @model", yearParam, makeParam,modelParam).ToListAsync();
        }

        public async Task<List<Car>> GetCars(string year, string make, string model, string trim, string filter, bool? paging, int? page, int? perPage)
        {

            
            
            var yearParam = new SqlParameter("@year", year);
            var makeParam = new SqlParameter("@make", make);
            var modelParam = new SqlParameter("@model", model);
            var trimParam = new SqlParameter("@trim", trim);
            var filterParam = new SqlParameter("@filter", filter ?? "");
            


            var sqlCommand = "GetCars @year, @make, @model, @trim, @filter";

            if (paging != null && paging.Value == true)
            {
                var PagingParam = new SqlParameter("@paging", paging);
                sqlCommand += ", @paging";
                var pageParam = new SqlParameter("@page", page);
                sqlCommand += ", @page";
            
                var perPageParam = new SqlParameter("@perPage", perPage);
                sqlCommand += ", @perPage";
                return await Database.SqlQuery<Car>(sqlCommand, yearParam, makeParam, modelParam, trimParam, filterParam, PagingParam, pageParam, perPageParam).ToListAsync();

            }
            return await Database.SqlQuery<Car>(sqlCommand, yearParam, makeParam, modelParam, trimParam, filterParam).ToListAsync();

        }
    }
}