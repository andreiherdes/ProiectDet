using System;

namespace Data.Core.Domain
{
    public class Song
    {
        public Guid Id { get; set; }
        public Genre genre { get; set; }
    }
}