using System;
using System.Collections.Generic;

namespace Data.Core.Domain
{
    public class Musician
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Guid Id { get; set; }
        public string Email { get; set; }
        public List<Post> AppliedPosts { get; set; }
        public List<Task> Tasks { get; set; }
        public Portofolio MusiciansPortofolio { get; set; }
    }
}
