using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Application.TaskItems.Queries.GetTaskById;
public class TaskItemDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Status { get; set; }
    public string? State { get; set; }
}
