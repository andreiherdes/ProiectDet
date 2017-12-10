using System;
using System.Collections.Generic;

namespace Data.Core.Domain
{
    public class Bussines
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; }
        public string Description { get; set; }
        public string Email { get; set; }
        public List<Post> IssuedPosts { get; set; }
        public List<Task> IssuedTasks { get; set; }

    }
}