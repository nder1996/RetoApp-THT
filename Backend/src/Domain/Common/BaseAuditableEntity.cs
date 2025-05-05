namespace CleanArchitecture.Domain.Common;

public abstract class BaseAuditableEntity : BaseEntity
{
    public virtual DateTimeOffset? Created { get; set; }

    public string? CreatedBy { get; set; }

    public virtual DateTimeOffset? LastModified { get; set; }

    public string? LastModifiedBy { get; set; }
}
