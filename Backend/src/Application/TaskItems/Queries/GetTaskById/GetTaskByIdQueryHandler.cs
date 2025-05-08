using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;

namespace CleanArchitecture.Application.TaskItems.Queries.GetTaskById;
internal class GetTaskByIdQueryHandler : IRequestHandler<GetTaskByIdQuery, TaskItemDto>
{

    private readonly IApplicationDbContext _context;
    private readonly ICacheService_1 _cacheService;

    public GetTaskByIdQueryHandler(IApplicationDbContext context, ICacheService_1 cacheService)
    {
        _context = context;
        _cacheService = cacheService;
    }


    public async Task<TaskItemDto> Handle(GetTaskByIdQuery request, CancellationToken cancellationToken)
    {
        string cacheKey = $"TaskItem_{request.Id}";

        return await _cacheService.GetOrCreateAsync(cacheKey, async () =>
        {
            var task = await _context.TaskItems
                .Where(t => t.Id == request.Id && t.State == "A")
                .FirstOrDefaultAsync(cancellationToken);

            if (task == null)
            {
                throw new KeyNotFoundException($"Task with ID {request.Id} not found.");
            }

            return new TaskItemDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                Status = task.Status,
                State = task.State
            };
        });
    }
}
