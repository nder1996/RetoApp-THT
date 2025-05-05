using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.TaskItems.Queries.GetTaskById;
public record GetTaskByIdQuery : IRequest<TaskItemDto>
{
    public int Id { get; init; }
    public GetTaskByIdQuery(int id)
    {
        Id = id;
    }
}

