using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_CustomersService.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}