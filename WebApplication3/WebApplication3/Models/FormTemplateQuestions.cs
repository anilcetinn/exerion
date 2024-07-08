namespace WebApplication3.Models
{
    public class FormTemplateQuestions
    {
        public int ID { get; set; }
        public int TemplateID { get; set; }
        public int QuestionID { get; set; }
        public byte CreatedUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public byte UpdatedUserId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public FormTemplate? FormTemplate { get; set; }
        public Question? Question { get; set; }
    }
}