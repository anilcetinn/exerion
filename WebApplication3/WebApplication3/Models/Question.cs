using System;
using System.Collections.Generic;
using WebApplication3.Models;

public class Question
{
    public int ID { get; set; }
    public string QuestionText { get; set; }
    public string QuestionTypeName { get; set; }
    public string QuestionDisplayName { get; set; }
    public string EvaluationScopeName { get; set; }
    public bool IsCommentVisible { get; set; }
    public bool IsCommentRequired { get; set; }
    public byte CreatedUserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public byte UpdatedUserId { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public ICollection<QuestionOption>? QuestionOptions { get; set; }
    public ICollection<FormTemplateQuestions>? FormTemplateQuestions { get; set; }
}


