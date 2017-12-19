using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Core.Domain;
using Data.Core.Interfaces;
using Data.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Business
{
    public class CustomersRepository : ICustomersRepository
    {

        private readonly DatabaseService _context;
        private readonly ILogger _logger;

        public CustomersRepository(DatabaseService context, ILoggerFactory loggerFactory) {
          _context = context;
          _logger = loggerFactory.CreateLogger("CustomersRepository");
        }

        public async Task<List<Customer>> GetCustomersAsync()
        {
            return await _context.Customers.OrderBy(c => c.LastName)
                                 .Include(c => c.State).ToListAsync();
        }

        public async Task<PagingResult<Customer>> GetCustomersPageAsync(int skip, int take)
        {
            var totalRecords = await _context.Customers.CountAsync();
            var customers = await _context.Customers
                                 .OrderBy(c => c.LastName)
                                 .Include(c => c.State)
                                 .Include(c => c.Orders)
                                 .Skip(skip)
                                 .Take(take)
                                 .ToListAsync();
            return new PagingResult<Customer>(customers, totalRecords);
        }

        public async Task<Customer> GetCustomerAsync(int id)
        {
            return await _context.Customers
                                 .Include(c => c.State)
                                 .SingleOrDefaultAsync(c => c.Id == id);
        }

        public async Task<Customer> InsertCustomerAsync(Customer customer)
        {
            _context.Add(customer);
            try
            {
              await _context.SaveChangesAsync();
            }
            catch (Exception exp)
            {
               _logger.LogError($"Error in {nameof(InsertCustomerAsync)}: " + exp.Message);
            }

            return customer;
        }

        public async Task<bool> UpdateCustomerAsync(Customer customer)
        {
            //Will update all properties of the Customer
            _context.Customers.Attach(customer);
            _context.Entry(customer).State = EntityState.Modified;
            try
            {
              return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception exp)
            {
               _logger.LogError($"Error in {nameof(UpdateCustomerAsync)}: " + exp.Message);
            }
            return false;
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            //Extra hop to the database but keeps it nice and simple for this demo
            //Including orders since there's a foreign-key constraint and we need
            //to remove the orders in addition to the customer
            var customer = await _context.Customers
                                .Include(c => c.Orders)
                                .SingleOrDefaultAsync(c => c.Id == id);
            _context.Remove(customer);
            try
            {
              return await _context.SaveChangesAsync() > 0;
            }
            catch (Exception exp)
            {
               _logger.LogError($"Error in {nameof(DeleteCustomerAsync)}: " + exp.Message);
            }
            return false;
        }

    }
}