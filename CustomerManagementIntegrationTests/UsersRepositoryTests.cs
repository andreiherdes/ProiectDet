using Business;
using CustomerManagementIntegrationTests.Base;
using Data.Core.Domain;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Xunit;

namespace CustomerManagementIntegrationTests
{
    public class UsersRepositoryTests : BaseIntegrationTest
    {
        private readonly ILoggerFactory _loggerFactory = new LoggerFactory();
        [Fact]
        public void Given_Users_When_GetUsersIsCalled_Then_ShouldReturnZeroUsers()
        {
            RunOnDatabase(context => {
                // ARRANGE 
                var usersRepository = new UsersRepository(context, _loggerFactory);
               
                // ACT
                var users = usersRepository.GetUsersAsync();
                var counter = users.Result.Count;
                // ASSERT
                counter.Should().Be(0);
            });
        }

        [Fact]
        public void Given_Users_When_NewUserIsAdded_Then_ShouldHaveOneUserInDatabase() {
            RunOnDatabase(async context => {
                // ARRANGE 
                var usersRepository = new UsersRepository(context, _loggerFactory);
                var user = await usersRepository.InsertUserAsync(new User
                {
                    DisplayName = "test",
                    Email = "test@test.ro",
                    Id = 10,
                    Password = "password",
                    Post = null,
                    UserName = "username"
                });
                // ACT
                var result = usersRepository.GetUserByEmail(user.Email);
                // ASSERT
                result.Should().NotBe(null);
            });
        }
    }
}
