using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.TaskItems.Queries.GetAllTasks;
public class GetAllTasksQueryHandler : IRequestHandler<GetAllTasksQuery, List<TasksItemDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly ICacheService _cacheService;

    public GetAllTasksQueryHandler(IApplicationDbContext context, ICacheService cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }

    public async Task<List<TasksItemDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
    {
        string cacheKey = "AllActiveTasks";

        return await _cacheService.GetOrCreateAsync(cacheKey, async () =>
         await _context.TaskItems
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
             .ToListAsync(cancellationToken));
    }


    }
