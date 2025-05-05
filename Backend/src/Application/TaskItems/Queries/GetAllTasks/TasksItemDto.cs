using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Entities;

namespace CleanArchitecture.Application.TaskItems.Queries.GetAllTasks;

public class TasksItemDto
{
    public int Id { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime? DueDate { get; set; }
    public string? Status { get; set; }
    public string? State { get; set; }
}
public class TaskItemDto
{
 

    // DTO para una lista de tareas
    public class TaskListDto
    {
        public TaskListDto()
        {
            Items = Array.Empty<TaskItemDto>();
        }

        public IReadOnlyCollection<TaskItemDto> Items { get; init; }

        // Clase interna para el mapeo con AutoMapper
        public class Mapping : Profile
        {
            public Mapping()
            {
                // Mapeo de TaskItem (entidad) a TaskItemDto
                CreateMap<TaskItem, TaskItemDto>();
                // Mapeo de una colección a TaskListDto
                CreateMap<IEnumerable<TaskItem>, TaskListDto>()
                    .ForMember(dest => dest.Items, opt => opt.MapFrom(src => src));
            }
        }
    }
}
