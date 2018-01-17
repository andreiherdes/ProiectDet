using System;

namespace Data.Core.Domain
{
    public class Post
    {
        public int Id { get; set; }

        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string City { get; set; }
        public string Country { get; set; }
        public string Gender { get; set; }

        public string Domain { get; set; }
        public string Description { get; set; }
        public DateTime PostDate { get; set; }
        public Song UploadedSong { get; set; }

        public User User { get; set; }
    }
}