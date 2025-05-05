using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace CleanArchitecture.Application.TaskItems.Commands.DeleteTask;

public record DeleteTaskItemDetailCommand : IRequest<bool>
{
    public int? Id { get; init; }
}

public class DeleteTaskItemCommandHandler : IRequestHandler<DeleteTaskItemCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public DeleteTaskItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteTaskItemCommand request, CancellationToken cancellationToken)
    {
        var id = request.Id;
        Console.WriteLine("id delete "+id);


        // Buscar la entidad en el DbSet correcto
        var entity = await _context.TaskItems
            .FindAsync(new object[] { id }, cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException("Task", $"No se encontró la tarea con ID {id}");
        }

        // Marcar como inactivo en lugar de eliminar físicamente
        entity.State = "I"; // Cambiar el estado a "I" (inactivo)
        entity.LastModified = DateTime.UtcNow; // Actualizar la fecha de modificación

        // Guardar los cambios
        await _context.SaveChangesAsync(cancellationToken);

        // Devolver true para indicar que la operación fue exitosa
        return true;
    }
}




