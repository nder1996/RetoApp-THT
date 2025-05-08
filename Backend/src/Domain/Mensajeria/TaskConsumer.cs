using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;

namespace CleanArchitecture.Infrastructure.Mensajería;
public class TaskConsumer : IConsumer<StringMessage>
{
    public Task Consume(ConsumeContext<StringMessage> context)
    {
        var message = context.Message;
        Console.WriteLine($"Mensaje recibido: {message.Content}");
        return Task.CompletedTask;
    }
}


