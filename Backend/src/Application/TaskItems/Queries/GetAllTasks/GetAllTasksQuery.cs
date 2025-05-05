using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.TaskItems.Queries.GetTaskById;

namespace CleanArchitecture.Application.TaskItems.Queries.GetAllTasks;
public record GetAllTasksQuery : IRequest<List<TasksItemDto>>;
