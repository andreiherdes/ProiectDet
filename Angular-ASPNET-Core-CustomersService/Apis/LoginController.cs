using System.Net;
using System.Threading.Tasks;
using Data.Core.Dtos;
using Data.Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Angular_ASPNETCore_CustomersService.Apis
{
    [Produces("application/json")]
    [Route("api/login")]
    public class LoginController : Controller
    {
        private IUserRepository _userRepository;

        public LoginController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] UserLoginDto user)
        {
            var u = await _userRepository.GetUserByEmail(user.Email);
            if (u == null)
            {
                return NotFound(new ErrorMessage
                {
                    StatusCode = HttpStatusCode.NotFound,
                    Message = "No user with the given email was found in the database"
                });
            }

            if (u.Password != user.Password)
            {
                return Ok(new ErrorMessage
                {
                    StatusCode = HttpStatusCode.Forbidden,
                    Message = "Invalid password"
                });
            }

            Response.Cookies.Append("ana are mere", "indeed she has", new CookieOptions
            {
                HttpOnly = true
            });
            return Ok(u);
        }
    }
}