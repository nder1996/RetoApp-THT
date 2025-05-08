using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using Microsoft.Extensions.Logging;

namespace CleanArchitecture.Application.TaskItems.Queries.GetAllTasks;
public class GetAllTasksQueryHandler : IRequestHandler<GetAllTasksQuery, List<TasksItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICacheService_1 _cacheService;
    private readonly ILogger<GetAllTasksQueryHandler> _logger;

    public GetAllTasksQueryHandler(IApplicationDbContext context, ICacheService_1 cacheService, ILogger<GetAllTasksQueryHandler> logger)
    {
        _context = context;
        _cacheService = cacheService;
        _logger = logger;
    }

    public async Task<List<TasksItemDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
    {
        string cacheKey = "AllActiveTasks";

        try
        {
            _logger.LogInformation("Iniciando el manejo de la consulta para obtener todas las tareas activas.");

            // Obtener o crear los datos en caché
            var tasks = await _cacheService.GetOrCreateAsync(
                key: cacheKey,
                factory: async () =>
                {
                    _logger.LogInformation("No se encontraron datos en caché. Consultando la base de datos.");

                    // Consultar la base de datos solo si no hay datos en caché
                    var dbTasks = await _context.TaskItems
                        .Where(task => task.State == "A")
                        .Select(task => new TasksItemDto
                        {
                            Id = task.Id,
                            Title = task.Title,
                            Description = task.Description,
                            DueDate = task.DueDate,
                            Status = task.Status,
                            State = task.State
                        })
                        .ToListAsync(cancellationToken);

                    if (dbTasks == null || !dbTasks.Any())
                    {
                        _logger.LogWarning("No se encontraron tareas activas en la base de datos.");
                        return new List<TasksItemDto>();
                    }

                    _logger.LogInformation("Se encontraron {Count} tareas activas en la base de datos.", dbTasks.Count);
                    return dbTasks;
                },
                expiration: TimeSpan.FromMinutes(1) // Tiempo de expiración del caché
            );

           // _logger.LogInformation("Se obtuvieron {Count} tareas activas desde el caché o la base de datos.", tasks.Count);
            return tasks;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ocurrió un error al manejar la consulta para obtener todas las tareas activas.");
            throw;
        }
    }
}






