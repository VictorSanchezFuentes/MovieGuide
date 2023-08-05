using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using MoviesApi.DTO;

namespace MoviesApi.Filters
{
    public class ParseBadRequest : IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext context)
        {
            var result = context.Result as IStatusCodeActionResult;
            if (result != null)
            {
                return;
            }

            var statusCode = result.StatusCode; 
            if(statusCode == 400)
            {
                var response = new List<string>();
                var badResquestObjectResult = context.Result as BadRequestObjectResult;
                if(badResquestObjectResult.Value is string)
                {
                    response.Add(badResquestObjectResult.Value.ToString());
                }

                else if (badResquestObjectResult.Value is IEnumerable<IdentityError> errors)
                {
                    foreach (var error in errors)
                    {
                        response.Add(error.Description);
                    }
                }

                else if (badResquestObjectResult.Value is ErrorDTO)
                {
                        var errorDTO = (ErrorDTO)badResquestObjectResult.Value;
                    
                        response.Add(errorDTO.Description);
                    
                }

                else
                {
                    foreach (var key in context.ModelState.Keys)
                    {
                        foreach (var error in context.ModelState[key].Errors)
                        {
                            response.Add($"{key}: {error.ErrorMessage}");
                        }
                    }
                }

                context.Result = new BadRequestObjectResult(response);
            }
        }

        public void OnActionExecuting(ActionExecutingContext context)
        {
            
        }
    }
}
