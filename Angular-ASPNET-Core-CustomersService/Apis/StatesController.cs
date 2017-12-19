using Angular_ASPNETCore_CustomersService.Infrastructure;
using Angular_ASPNETCore_CustomersService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Data.Core.Domain;
using Data.Core.Interfaces;

namespace Angular_ASPNETCore_CustomersService.Apis {
    [Route("api/states")]
    public class StatesController : Controller
    {
        readonly IStatesRepository _statesRepository;
        readonly ILogger _logger;

        public StatesController(IStatesRepository statesRepository, ILoggerFactory loggerFactory) {
            _statesRepository = statesRepository;
            _logger = loggerFactory.CreateLogger(nameof(StatesController));
        }

        [HttpGet("")]
        [NoCache]
        [ProducesResponseType(typeof(List<State>), 200)]
        [ProducesResponseType(typeof(ApiResponse), 400)]
        public async Task<ActionResult> States() {
            try
            {
                var states = await _statesRepository.GetStatesAsync();
                return Ok(states);
            }
            catch (Exception exp)
            {
                _logger.LogError(exp.Message);
                return BadRequest(new ApiResponse { Status = false });
            }
        }

    }
}
