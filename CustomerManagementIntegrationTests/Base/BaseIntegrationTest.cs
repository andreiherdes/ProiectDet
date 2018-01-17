using System;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Xunit;

[assembly: CollectionBehavior(DisableTestParallelization = true)]
namespace CustomerManagementIntegrationTests.Base {
    public class BaseIntegrationTest :IDisposable {
        private IConfiguration _configuration;

        protected virtual bool UseSqlServer => bool.Parse(_configuration["UseSqlServer"]);


        public BaseIntegrationTest() {
            InitializeConfiguration();
            DestroyDatabase();
            CreateDatabase();
        }

        public void RunOnDatabase(Action<DatabaseService> databaseAction) {
            if(UseSqlServer) {
                RunOnSqlServer(databaseAction);
            } else {
                RunOnMemory(databaseAction);
            }
        }

        private void RunOnSqlServer(Action<DatabaseService> databaseAction) {
            var options = new DbContextOptionsBuilder<DatabaseService>()
                    .UseSqlite(_configuration.GetConnectionString("Customers"))
                    .Options;

            using(var context = new DatabaseService(options)) {
                databaseAction(context);
            }
        }

        private void RunOnMemory(Action<DatabaseService> databaseAction) {
            var options = new DbContextOptionsBuilder<DatabaseService>()
                    .UseInMemoryDatabase("Payments")
                    .Options;

            using(var context = new DatabaseService(options)) {
                databaseAction(context);
            }
        }

        private void InitializeConfiguration() {
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json").Build();
        }

        private void CreateDatabase() {
            RunOnDatabase(context => context.Database.EnsureCreated());
        }

        private void DestroyDatabase() {
            RunOnDatabase(context => context.Database.EnsureDeleted());
        }

        public void Dispose() {
            DestroyDatabase();
        }
    }
}
