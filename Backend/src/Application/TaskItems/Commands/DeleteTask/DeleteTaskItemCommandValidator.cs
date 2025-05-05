using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.TaskItems.Commands.CreateTask;

namespace CleanArchitecture.Application.TaskItems.Commands.DeleteTask;
public class DeleteTaskItemCommandValidator : AbstractValidator<CreateTaskItemCommand>
{
    public DeleteTaskItemCommandValidator()
    {
        RuleFor(t => t.Id)
            .NotEmpty().WithMessage("El ID de la tarea es obligatorio")
            .GreaterThan(0).WithMessage("El ID de la tarea debe ser mayor que 0");
    }
}
