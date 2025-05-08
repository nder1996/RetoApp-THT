using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Mensajería;
namespace CleanArchitecture.Application.TaskItems.Commands.CreateTask;

public class CreateTaskItemCommandHandler : IRequestHandler<CreateTaskItemCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly GenericPublisher _publisher;


    public CreateTaskItemCommandHandler(IApplicationDbContext context, GenericPublisher publisher) // Inject IPublisher
    {
        _context = context;
        _publisher = publisher; // Assign the injected publisher
    }

    public async Task<int> Handle(CreateTaskItemCommand request, CancellationToken cancellationToken)
    {
        var entity = new TaskItem
        {
            Title = request.Title ?? string.Empty,
            Description = request.Description,
            Status = request.Status ?? string.Empty,
            State = request.State ?? string.Empty,
            DueDate = request.DueDate,
        };

        _context.TaskItems.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        try
        {
            var stringMessage = new StringMessage
            {
                Content = request.Title // O cualquier contenido relevante
            };

            await _publisher.PublishMessage(stringMessage);
        }
        catch (Exception ex)
        {
            // Log el error pero no interrumpas la creación de la tarea
            Console.WriteLine($"Error al publicar mensaje: {ex.Message}");
        }

        return entity.Id;
    }
}
