using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.TaskItems.Commands.UpdateTask;
public class UpdateTaskItemCommand : IRequest<int>
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public string? Status { get; set; }
    public string? State { get; set; }
    // public DateTime CreatedAt { get; set; }
    //public DateTime UpdatedAt { get; set; }
    public DateTime DueDate { get; set; }
}
