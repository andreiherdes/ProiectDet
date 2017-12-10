using System;

namespace Data.Core.Domain
{
    public class Task
    {
        public Guid Id { get; set; }
        public Musician SelectedMusician { get; set; }
        public Bussines IssuedByBussines { get; set; }
        public DateTime StarDate { get; set; }
        public DateTime DueDate { get; set; }
        public Song Song { get; set; }
    }
}