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

    public GetAllTasksQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<TasksItemDto>> Handle(GetAllTasksQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult(_context.TaskItems
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
            .ToList());
    }


}
