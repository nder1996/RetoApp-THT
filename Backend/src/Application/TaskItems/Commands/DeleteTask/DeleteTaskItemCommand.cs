using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.TaskItems.Commands.DeleteTask;
public class DeleteTaskItemCommand : IRequest<bool>
{
    public int Id { get; set; }

    public DeleteTaskItemCommand(int id)
    {
        Id = id;
    }
}
