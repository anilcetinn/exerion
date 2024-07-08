namespace ExerionAPI.Models
{
    public class ExerciseProgram
    {
        public int Id { get; set; }
        public string ExerciseName { get; set; }
        public string GifUrl { get; set; }
        public string UserEmail { get; set; }
        public string BodyPart { get; set; } // Body part bilgisi

        public int Sets { get; set; }
        public int Reps { get; set; }
    }
}
