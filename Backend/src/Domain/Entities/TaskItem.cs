using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CleanArchitecture.Domain.Entities;

[Table("tasks")]
public class TaskItem : BaseAuditableEntity
{
    [Required]
    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public DateTime? DueDate { get; set; }

    [Required]
    public string Status { get; set; } = "Pending";

    public string? State { get; set; }

}
