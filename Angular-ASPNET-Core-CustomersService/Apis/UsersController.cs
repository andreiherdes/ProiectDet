using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Infrastructure;
using Angular_ASPNETCore_CustomersService.Models;
using Data.Core.Dtos;
using Data.Core.Domain;
using Data.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_CustomersService.Apis
{
    [Route("api/users")]
    public class UsersController : Controller
    {
        readonly IUserRepository _userRepository;
        readonly ILogger _logger;

        public UsersController(IUserRepository usersRepo, ILoggerFactory loggerFactory)
        {
            _userRepository = usersRepo;
            _logger = loggerFactory.CreateLogger(nameof(UsersController));
        }

        // GET api/users
        [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<User>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Users()
        {
            try
            {
                var users = await _userRepository.GetUsersAsync();
                return Ok(users);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/customers
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateNewUser([FromBody]User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newUser = await _userRepository.InsertUserAsync(user);
                if (newUser == null)
                {
                    return BadRequest(new ErrorMessage()
                    {
                        StatusCode = HttpStatusCode.Conflict,
                        Message = "Object already exists in the database"
                    });
                }
                //return CreatedAtRoute("GetUserRoute", new { id = newUser.Id },
                //    new ApiResponse { Status = true, User = newUser });
                return Ok(newUser);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}