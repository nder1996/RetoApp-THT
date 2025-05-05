using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;

namespace CleanArchitecture.Application.TaskItems.Commands.CreateTask;

public class CreateTaskItemCommandHandler : IRequestHandler<CreateTaskItemCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTaskItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
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
            //Created = DateTime.UtcNow,
            //LastModified = DateTime.UtcNow,
            //CreatedBy = "anderson.arevalo@tht"
        };

        _context.TaskItems.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
} 
