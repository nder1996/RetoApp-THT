using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CleanArchitecture.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace CleanArchitecture.Infrastructure.Data.Configurations;
public class TaskItemConfiguration : IEntityTypeConfiguration<TaskItem>
{
    void IEntityTypeConfiguration<TaskItem>.Configure(EntityTypeBuilder<TaskItem> builder)
    {
        // Configuraciones básicas
        builder.Property(t => t.Id)
            .HasColumnName("Id");

        builder.Property(t => t.Title)
            .HasMaxLength(200)
            .IsRequired()
            .HasColumnName("Title");

        builder.Property(t => t.Description)
            .HasMaxLength(500)
            .HasColumnName("Description");

        // Configuración de Status (es string, no enum)
        builder.Property(t => t.Status)
            .HasMaxLength(50)
            .IsRequired()
            .HasDefaultValue("Pending")
            .HasColumnName("Status");

        // Estado adicional
        builder.Property(t => t.State)
            .HasMaxLength(100)
            .HasColumnName("State");

        // Fechas
        builder.Property(t => t.DueDate)
            .HasColumnName("DueDate")
            .HasColumnType("timestamp with time zone");

        // Configuración de propiedades DateTimeOffset
        builder.Property(t => t.Created)
            .HasColumnName("CreateAt")
            .HasColumnType("timestamp with time zone");
         

        builder.Property(t => t.LastModified)
            .HasColumnName("LastModified")
            .HasColumnType("timestamp with time zone")
                .IsRequired(false);

        // Propiedades de auditoría
        builder.Property(t => t.CreatedBy)
            .HasMaxLength(100)
            .HasColumnName("CreatedBy")
            .IsRequired(false);

        builder.Property(t => t.LastModifiedBy)
            .HasMaxLength(100)
            .HasColumnName("LastModifiedBy")
            .IsRequired(false);

        // Índices para mejorar rendimiento
        builder.HasIndex(t => t.Status);
        builder.HasIndex(t => t.DueDate);
        builder.HasIndex(t => t.Title);
    }
}
