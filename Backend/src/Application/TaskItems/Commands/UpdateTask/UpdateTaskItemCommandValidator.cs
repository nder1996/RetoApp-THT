using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Application.TaskItems.Commands.CreateTask;

namespace CleanArchitecture.Application.TaskItems.Commands.UpdateTask;
public class UpdateTaskItemCommandValidator : AbstractValidator<UpdateTaskItemCommand>
{
    public UpdateTaskItemCommandValidator()
    {
        RuleFor(t => t.Title)
           .NotEmpty().WithMessage("El título es obligatorio")
           .MaximumLength(100).WithMessage("El título no puede exceder los 100 caracteres");

        RuleFor(t => t.Description)
            .MaximumLength(500).WithMessage("La descripción no puede exceder los 500 caracteres");

        RuleFor(t => t.Status)
            .NotEmpty().WithMessage("El estado de la tarea es obligatorio")
            .Matches("^(PENDIENTE|EN PROGRESO|COMPLETADO)$").WithMessage("El estado solo puede ser 'PENDIENTE', 'EN PROGRESO' o 'COMPLETADO'");

        RuleFor(t => t.State)
            .NotEmpty()
            .Length(1).WithMessage("El estado debe ser exactamente 1 carácter")
            .Matches("^[AI]$").WithMessage("El estado solo puede ser 'A' o 'I'");

        RuleFor(t => t.DueDate)
            .NotEmpty().WithMessage("La fecha de vencimiento es obligatoria");
    }
}
