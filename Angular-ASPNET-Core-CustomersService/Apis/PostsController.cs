using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Angular_ASPNETCore_CustomersService.Infrastructure;
using Angular_ASPNETCore_CustomersService.Models;
using Data.Core.Domain;
using Data.Core.Dtos;
using Data.Core.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Angular_ASPNETCore_CustomersService.Apis
{
    [Produces("application/json")]
    [Route("api/posts")]
    public class PostsController : Controller
    {
        readonly IPostRepository _postRepository;
        readonly ILogger _logger;

        public PostsController(IPostRepository postsRepo, ILoggerFactory loggerFactory)
        {
            _postRepository = postsRepo;
            _logger = loggerFactory.CreateLogger(nameof(PostsController));
        }

        // GET api/posts
        [HttpGet]
        [NoCache]
        [ProducesResponseType(typeof(List<Post>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> Posts()
        {
            try
            {
                var posts = await _postRepository.GetPostsAsync();
                return Ok(posts);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

        // POST api/posts
        [HttpPost]
        [ProducesResponseType(typeof(ApiResponse), 201)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> CreateNewPost([FromBody]Post post)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse { Status = false, ModelState = ModelState });
            }

            try
            {
                var newPost = await _postRepository.InsertPostAsync(post);
                if (newPost == null)
                {
                    return BadRequest(new ErrorMessage()
                    {
                        StatusCode = HttpStatusCode.Conflict,
                        Message = "Object already exists in the database"
                    });
                }
                //return CreatedAtRoute("GetUserRoute", new { id = newUser.Id },
                //    new ApiResponse { Status = true, User = newUser });
                return Ok(newPost);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}