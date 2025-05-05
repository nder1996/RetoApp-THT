using CleanArchitecture.Application.Common.Models;
using CleanArchitecture.Application.TaskItems.Commands.CreateTask;
using CleanArchitecture.Application.TaskItems.Commands.DeleteTask;
using CleanArchitecture.Application.TaskItems.Commands.UpdateTask;
using CleanArchitecture.Application.TaskItems.Queries.GetAllTasks;
using CleanArchitecture.Application.TodoItems.Commands.CreateTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.DeleteTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.UpdateTodoItem;
using CleanArchitecture.Application.TodoItems.Commands.UpdateTodoItemDetail;
using CleanArchitecture.Application.TodoItems.Queries.GetTodoItemsWithPagination;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CleanArchitecture.Web.Endpoints;

[ApiController]
[Route("api/[controller]")]  // Esto generará la ruta "api/TaskItem"
public class TaskItem : ControllerBase
{
    private readonly ISender _sender;

    public TaskItem(ISender sender)
    {
        _sender = sender;
    }

    [HttpGet]
    public Task<List<TasksItemDto>> GetTodoItems(ISender sender)
    {
        return sender.Send(new GetAllTasksQuery());
    }

    [HttpPost]
    public async Task<ActionResult<int>> CreateTodoItem(CreateTaskItemCommand command)
    {
        try
        {
            var result = await _sender.Send(command);
            return result;
        }
        catch (Exception ex)
        {
            // Opcional: loguear la excepción
            return StatusCode(500, $"Error interno: {ex.Message}");
        }
    }



    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateTodoItem(int id, UpdateTaskItemCommand command)
    {
        if (id != command.Id) return BadRequest();
        await _sender.Send(command);
        return NoContent();
    }

   /* [HttpPut("UpdateDetail/{id}")]
    public async Task<IActionResult> UpdateTodoItemDetail(int id, UpdateTodoItemDetailCommand command)
    {
        if (id != command.Id) return BadRequest();
        await _sender.Send(command);
        return NoContent();
    }
   */

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodoItem(int id)
    {
        await _sender.Send(new DeleteTaskItemCommand(id));
        return NoContent();
    }

}
