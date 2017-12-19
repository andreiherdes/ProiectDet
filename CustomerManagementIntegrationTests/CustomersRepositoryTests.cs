using Business;
using CustomerManagementIntegrationTests.Base;
using Data.Core.Domain;
using FluentAssertions;
using Microsoft.Extensions.Logging;
using Xunit;

namespace CustomerManagementIntegrationTests
{
    public class CustomersRepositoryTests : BaseIntegrationTest
    {
        private readonly ILoggerFactory _loggerFactory = new LoggerFactory();
        [Fact]
        public void Given_Customers_When_GetCustomersIsCalled_Then_ShouldReturnZeroCustomers()
        {
            RunOnDatabase(context => {
                // ARRANGE 
                var customersRepository = new CustomersRepository(context, _loggerFactory);
               
                // ACT
                var customers = customersRepository.GetCustomersAsync();
                var counter = customers.Result.Count;
                // ASSERT
                counter.Should().Be(0);
            });
        }

        [Fact]
        public void Given_Customers_When_NewCustomerIsAdded_Then_ShouldHaveOneCustomerInDatabase() {
            RunOnDatabase(async context => {
                // ARRANGE 
                var customersRepository = new CustomersRepository(context, _loggerFactory);
                var customer = await customersRepository.InsertCustomerAsync(new Customer
                {
                    Address = "test",
                    City = "Iasi",
                    Email = "test@test.ro",
                    FirstName = "Customer1",
                    LastName = "Customer last name"
                });
                // ACT
                var result = customersRepository.GetCustomerAsync(customer.Id);
                // ASSERT
                result.Should().NotBe(null);
            });
        }
    }
}
