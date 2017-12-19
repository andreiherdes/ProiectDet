using System.Net;

namespace Data.Core.Dtos
{
    public class ErrorMessage
    {
        public string Message;

        public HttpStatusCode StatusCode;
    }
}
