using System.Web.Http;
using System.Web.Http.Cors;

namespace MapApp
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Конфигурация и службы веб-API
           // config.EnableCors(new EnableCorsAttribute("http://localhost::4200", headers: "*", methods: "*"));

            // Маршруты веб-API
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Filters.Add(new AuthorizeAttribute());
        }
    }
}
