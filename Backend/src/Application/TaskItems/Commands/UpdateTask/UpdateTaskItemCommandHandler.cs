using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;



using System.Threading.Tasks;
using System.Xml;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Application.TaskItems.Commands.CreateTask;
using CleanArchitecture.Domain.Entities;
using Newtonsoft.Json;

namespace CleanArchitecture.Application.TaskItems.Commands.UpdateTask;

public class UpdateTaskItemCommandHandler : IRequestHandler<UpdateTaskItemCommand,int>
{
    private readonly IApplicationDbContext _context;
    public UpdateTaskItemCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(UpdateTaskItemCommand request, CancellationToken cancellationToken)
    {
       // Console.WriteLine("entity : " + JsonConvert.SerializeObject(request, Newtonsoft.Json.Formatting.Indented));

        var entity = await _context.TaskItems
            .FindAsync(new object[] { request.Id }, cancellationToken);
;

        if (entity == null)
        {
            throw new NotFoundException(nameof(TaskItem), request.Title ?? string.Empty);
        }

        entity.Title = request.Title ?? string.Empty;
        entity.Description = request.Description;
        entity.DueDate = request.DueDate;
        entity.Status = request.Status ?? string.Empty;
        entity.State = request.State;

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
