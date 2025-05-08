using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MassTransit;

namespace CleanArchitecture.Infrastructure.Mensajería;
public class GenericPublisher
{
    private readonly IBus _bus;

    public GenericPublisher(IBus bus)
    {
        _bus = bus;
    }

    public async Task PublishMessage<T>(T message) where T : class
    {
        if (message is StringMessage stringMessage && string.IsNullOrEmpty(stringMessage.Content))
        {
            throw new ArgumentException("El contenido del mensaje no puede estar vacío.");
        }

        Console.WriteLine($"Publicando mensaje tipo: {typeof(T).Name}");
        Console.WriteLine($"Contenido: {System.Text.Json.JsonSerializer.Serialize(message)}");
        await _bus.Publish(message);
    }
}
