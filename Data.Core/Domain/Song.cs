namespace Data.Core.Domain
{
    public class Song
    {
        public int Id { get; set; }
        public int PostId { get; set; }

        public byte[] Content { get; set; }
        public string Name { get; set; }

        public Post Post { get; set; }
    }
}