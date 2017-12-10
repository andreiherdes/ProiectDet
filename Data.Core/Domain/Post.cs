using System;
using System.Collections.Generic;

namespace Data.Core.Domain
{
    public class Post
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public Genre WantedGenre { get; set; }
        public Bussines IssuedByBussines { get; set; }
        public List<Musician> MusiciansWhoApplied { get; set; }
        public DateTime IssuedDate { get; set; }
        public DateTime ExpirationDate { get; set; }
        public bool IsActive { get; set; }
    }
}