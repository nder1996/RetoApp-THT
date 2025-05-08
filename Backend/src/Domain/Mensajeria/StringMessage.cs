using System;
using System.Text;
using System.Threading.Tasks;


namespace CleanArchitecture.Infrastructure.Mensajería;

public class StringMessage
{
    public string? Content { get; set; }

     // Empty constructor for serialization
    public StringMessage() { }
    
    public StringMessage(string content)
    {
        Content = content;
    }
}
