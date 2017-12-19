using Business;
using CustomerManagementIntegrationTests.Base;
using FluentAssertions;
using Xunit;

namespace CustomerManagementIntegrationTests
{
    public class StatesRepositoryTests : BaseIntegrationTest
    {
        [Fact]
        public void Given_States_When_GetAllIsCalled_Then_ShouldReturnZeroRecord()
        {
            RunOnDatabase(context => {
                // ARRANGE 
                var statesRepository = new StatesRepository(context);
               
                // ACT
                var states = statesRepository.GetStatesAsync();
                var counter = states.Result.Count;
                // ASSERT
                counter.Should().Be(0);
            });

        }
    }
}
