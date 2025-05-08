using CleanArchitecture.Infrastructure.Data;
using CleanArchitecture.Infrastructure.Mensajería;
using MassTransit;
using Microsoft.Extensions.Extension;
using RabbitMQ.Client;
using StackExchange.Redis;
using MassTransit.Serialization;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddKeyVaultIfConfigured(builder.Configuration);

builder.Services.AddApplicationServices();
builder.Services.AddInfrastructureServices(builder.Configuration);
builder.Services.AddWebServices();


// Despus de AddWebServices()
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("http://localhost:8080", "http://[::1]:8080")
            .AllowAnyHeader()
            .AllowAnyMethod());
});


// Configuración de Redis
var redisConnectionString = builder.Configuration.GetConnectionString("Redis") ?? "localhost:6379";
builder.Services.AddSingleton<IConnectionMultiplexer>(sp =>
    ConnectionMultiplexer.Connect(redisConnectionString));

builder.Services.AddMassTransit(config =>
{
    config.AddConsumer<TaskConsumer>();
    config.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        cfg.ReceiveEndpoint("Task", e =>
        {
            e.ConfigureConsumer<TaskConsumer>(context);
            e.PrefetchCount = 16;
            e.UseMessageRetry(r => r.Interval(3, 1000));
        });
    });
});




//builder.Services.AddSingleton<RabbitMqService>();
builder.Services.AddSingleton<TaskConsumer>();
builder.Services.AddSingleton<GenericPublisher>();




var app = builder.Build();
//var taskConsumer = app.Services.GetRequiredService<TaskConsumer>();
//taskConsumer.StartConsuming();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    await app.InitialiseDatabaseAsync();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHealthChecks("/health");
app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseSwaggerUi(settings =>
{
    settings.Path = "/api";
    settings.DocumentPath = "/api/specification.json";
});

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");

app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.UseExceptionHandler(options => { });

#if (UseApiOnly)
app.Map("/", () => Results.Redirect("/api"));
#endif

app.MapEndpoints();

var redis = app.Services.GetRequiredService<IConnectionMultiplexer>();
var db = redis.GetDatabase();
try
{
    db.StringSet("test", "working");
    var result = db.StringGet("test");
    Console.WriteLine($"Redis test: {result}");
}
catch (Exception ex)
{
    Console.WriteLine($"Redis error: {ex.Message}");
}



app.Run();

public partial class Program { }
