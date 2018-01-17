using Data.Core.Domain;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Angular_ASPNETCore_CustomersService.Models
{
    public class ApiResponse
    {
        public bool Status { get; set; }
        public Customer Customer { get; set; }
        public User User { get; set; }
        public ModelStateDictionary ModelState { get; set; }
    }
}
