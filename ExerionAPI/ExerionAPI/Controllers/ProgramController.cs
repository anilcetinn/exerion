using ExerionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;

namespace ExerionAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProgramController : ControllerBase
    {
        private readonly ExerionDbContext _dbContext;
        private readonly ILogger<ProgramController> _logger;

        public ProgramController(ExerionDbContext dbContext, ILogger<ProgramController> logger)
        {
            _dbContext = dbContext;
            _logger = logger;
        }

        [HttpGet("userPrograms/{userEmail}")]
        public IActionResult GetUserPrograms(string userEmail)
        {
            try
            {
                _logger.LogInformation($"GetUserPrograms called for user email: {userEmail}");

                var userPrograms = _dbContext.Programs.Where(p => p.UserEmail == userEmail).ToList();
                _logger.LogInformation($"User programs retrieved successfully for user email: {userEmail}");
                return Ok(userPrograms);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving user programs for user email: {userEmail}. Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost("register")]
        public IActionResult Register(ProgramData programData)
        {
            try
            {
                _logger.LogInformation($"Register method called for user email: {programData.UserEmail}");

                if (programData == null || string.IsNullOrEmpty(programData.UserEmail) || programData.Exercises == null || programData.Exercises.Count == 0)
                {
                    _logger.LogWarning($"Invalid program data received for user email: {programData.UserEmail}");
                    return BadRequest("Invalid program data.");
                }

                string userEmail = programData.UserEmail;

                // Remove existing exercises for the user
                var existingExercises = _dbContext.Programs.Where(ep => ep.UserEmail == userEmail).ToList();
                if (existingExercises.Any())
                {
                    _dbContext.Programs.RemoveRange(existingExercises);
                    _dbContext.SaveChanges();
                    _logger.LogInformation($"Existing exercises for user email '{userEmail}' have been deleted.");
                }

                // Add new exercises
                foreach (var exerciseData in programData.Exercises)
                {
                    ExerciseProgram exerciseProgram = new ExerciseProgram
                    {
                        ExerciseName = exerciseData.ExerciseName,
                        GifUrl = exerciseData.GifUrl,
                        UserEmail = userEmail,
                        BodyPart = exerciseData.BodyPart,
                        Sets = exerciseData.Sets,
                        Reps = exerciseData.Reps
                    };

                    _dbContext.Programs.Add(exerciseProgram);
                }

                _dbContext.SaveChanges();
                _logger.LogInformation($"Programs saved successfully for user email: {userEmail}");

                return Ok(new { message = "Programs saved successfully!" });
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error registering programs for user email: {programData.UserEmail}. Error: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
