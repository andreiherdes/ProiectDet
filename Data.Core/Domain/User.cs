﻿namespace Data.Core.Domain
{
    public class User
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public string DisplayName { get; set; }

        public Post Post { get; set; }
    }
}