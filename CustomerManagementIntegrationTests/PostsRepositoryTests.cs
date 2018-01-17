using System;
using Business;
using CustomerManagementIntegrationTests.Base;
using Data.Core.Domain;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Xunit;

namespace CustomerManagementIntegrationTests
{
    public class PostsRepositoryTests : BaseIntegrationTest
    {
        private readonly ILoggerFactory _loggerFactory = new LoggerFactory();
        [Fact]
        public void Given_Posts_When_GetAllIsCalled_Then_ShouldReturnZeroRecord()
        {
            RunOnDatabase(context => {
                // ARRANGE 
                var postsRepository = new PostsRepository(context, _loggerFactory);
               
                // ACT
                var posts = postsRepository.GetPostsAsync();
                var counter = posts.Result.Count;
                // ASSERT
                counter.Should().Be(0);
            });

        }

        [Fact]
        public void Given_Posts_When_NewPostIsAdded_Then_ShouldHaveOnePostInDatabase()
        {
            RunOnDatabase(async context => {
                // ARRANGE 
                var postsRepository = new PostsRepository(context, _loggerFactory);
                var post = await postsRepository.InsertPostAsync(new Post
                {
                    City = "Test city",
                    Country = "Test country",
                    Description = "Description",
                    Domain = "Domain",
                    FirstName = "FirstName",
                    Gender = "Male",
                    Id = 10,
                    PostDate = new DateTime(2010,10,2),
                    LastName = "LastName",
                    UploadedSong = null
                });
                // ACT
                var result = postsRepository.GetPostAsync(post.Id);
                // ASSERT
                result.Should().NotBe(null);
            });
        }
    }
}
