using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.DeleteTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.UpdateTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.UpdateTodoItemDetail;
using CleanArchitecture.Application.TodoItems.Queries.GetTodoItemsWithPagination;

namespace CleanArchitecture.Web.Endpoints;

public class TodoItems : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(GetTodoItemsWithPaginationV2)
            .MapPost(CreateTodoItemV2)
            .MapPut(UpdateTodoItem2, "{id}")
            .MapPut(UpdateTodoItemDetail2, "UpdateDetail/{id}")
            .MapDelete(DeleteTodoItem2, "{id}");
    }

    public Task<PaginatedList<TodoItemBriefDto>> GetTodoItemsWithPaginationV2(ISender sender, [AsParameters] GetTodoItemsWithPaginationQuery query)
    {
        return sender.Send(query);
    }

    public Task<int> CreateTodoItemV2(ISender sender, CreateTodoItemCommand command)
    {
        return sender.Send(command);
    }

    public async Task<IResult> UpdateTodoItem2(ISender sender, int id, UpdateTodoItemCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> UpdateTodoItemDetail2(ISender sender, int id, UpdateTodoItemDetailCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> DeleteTodoItem2(ISender sender, int id)
    {
        await sender.Send(new DeleteTodoItemCommand(id));
        return Results.NoContent();
    }
}
