using Business;
using Data.Core.Interfaces;
using Microsoft.Extensions.DependencyInjection;

namespace Angular_ASPNETCore_CustomersService
{
    public static class ServicesExtension
    {
        public static void AddRepositories(this IServiceCollection services)
        {
            services.AddScoped<ICustomersRepository, CustomersRepository>();
            services.AddScoped<IStatesRepository, StatesRepository>();
            services.AddScoped<IUserRepository, UsersRepository>();
            services.AddScoped<IPostRepository, PostsRepository>();
        }
    }
}
