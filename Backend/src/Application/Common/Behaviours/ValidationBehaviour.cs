using Microsoft.Extensions.Logging; // Asegúrate de agregar esta línea
using ValidationException = CleanArchitecture.Application.Common.Exceptions.ValidationException;

namespace CleanArchitecture.Application.Common.Behaviours;

public class ValidationBehaviour<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse>
     where TRequest : notnull
{
    private readonly IEnumerable<IValidator<TRequest>> _validators;
    private readonly ILogger<ValidationBehaviour<TRequest, TResponse>> _logger; // Agregar logger

    public ValidationBehaviour(
        IEnumerable<IValidator<TRequest>> validators,
        ILogger<ValidationBehaviour<TRequest, TResponse>> logger) // Inyectar logger
    {
        _validators = validators;
        _logger = logger;
    }

    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (_validators.Any())
        {
            var context = new ValidationContext<TRequest>(request);
            var validationResults = await Task.WhenAll(
                _validators.Select(v =>
                    v.ValidateAsync(context, cancellationToken)));

            var failures = validationResults
                .Where(r => r.Errors.Any())
                .SelectMany(r => r.Errors)
                .ToList();

            if (failures.Any())
            {
                // Agregar logging detallado de los errores de validación
                _logger.LogError("Validation failures detected in {RequestType}:", typeof(TRequest).Name);
                foreach (var failure in failures)
                {
                    _logger.LogError("Property: {Property}, Error: {Error}",
                        failure.PropertyName,
                        failure.ErrorMessage);
                }

                // También puedes imprimir los valores de las propiedades para debugging
                _logger.LogError("Request data: {RequestData}",
                    System.Text.Json.JsonSerializer.Serialize(request));

                throw new ValidationException(failures);
            }
        }
        return await next();
    }
}
