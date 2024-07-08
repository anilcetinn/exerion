using System.Collections.Generic;

namespace ExerionAPI.Models
{
    public class ProgramData
    {
        public string UserEmail { get; set; }
        public List<ExerciseData> Exercises { get; set; }
    }

    public class ExerciseData
    {
        public string ExerciseName { get; set; }
        public string GifUrl { get; set; }
        public string BodyPart { get; set; } // Body part bilgisi
        public int Sets { get; set; }
        
        public int Reps { get; set; }
    }
}
