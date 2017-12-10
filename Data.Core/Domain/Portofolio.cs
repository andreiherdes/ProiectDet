using System;
using System.Collections.Generic;

namespace Data.Core.Domain
{
    public class Portofolio
    {
        public Guid Id { get; set; }
        public List<Song> Songs;
    }
}