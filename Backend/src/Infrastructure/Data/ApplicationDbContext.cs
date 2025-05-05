using System.Reflection;
using System.Threading;
using System.Threading.Tasks;
using CleanArchitecture.Application.Common.Interfaces;
using CleanArchitecture.Domain.Entities;
using CleanArchitecture.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace CleanArchitecture.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<TaskItem> TaskItems => Set<TaskItem>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);
        builder.Entity<TodoList>().ToTable("TodoLists");
        builder.Entity<TodoItem>().ToTable("TodoItems");
        builder.Entity<TaskItem>().ToTable("tasks");

        // Configurar el uso de PostgreSQL
        foreach (var entity in builder.Model.GetEntityTypes())
        {
            // Reemplazar nvarchar por text
            var properties = entity.GetProperties()
                .Where(p => p.ClrType == typeof(string));

            foreach (var property in properties)
            {
                property.SetColumnType("text");
            }
        }

        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        return await base.SaveChangesAsync(cancellationToken);
    }
}
