using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using MediatR;
using System.ComponentModel.DataAnnotations;

namespace CleanArchitecture.Application.TaskItems.Commands.CreateTask;

public record CreateTaskItemCommand : IRequest<int>
{
    [Required]
    public string Title { get; init; } = string.Empty;
    
    [Required]
    public string Description { get; init; } = string.Empty;
    
    [Required]
    public string Status { get; init; } = string.Empty;
    
    [Required]
    public string State { get; init; } = string.Empty;
    
    [Required]
    public DateTime DueDate { get; init; }
}

public class CreateTaskItemCommandHandler : IRequestHandler<CreateTaskItemCommand, int>
{
    private readonly IApplicationDbContext _context;
    private readonly ICurrentUserService _currentUserService;

    public CreateTaskItemCommandHandler(
        IApplicationDbContext context,
        ICurrentUserService currentUserService)
    {
        _context = context;
        _currentUserService = currentUserService;
    }

    public async Task<int> Handle(CreateTaskItemCommand request, CancellationToken cancellationToken)
    {
        try
        {
            if (request.DueDate < DateTime.UtcNow)
            {
                throw new ValidationException("Due date cannot be in the past");
            }

            var taskItem = new TaskItem
            {
                Title = request.Title,
                Description = request.Description,
                DueDate = request.DueDate,
                Status = request.Status,
                State = request.State,
                Created = DateTime.UtcNow,
                CreatedBy = _currentUserService.UserId ?? "system"
            };

            await _context.TaskItems.AddAsync(taskItem, cancellationToken);
            await _context.SaveChangesAsync(cancellationToken);

            return taskItem.Id;
        }
        catch (Exception ex)
        {
            // Log the exception here
            throw new ApplicationException("Error creating task item", ex);
        }
    }
} 