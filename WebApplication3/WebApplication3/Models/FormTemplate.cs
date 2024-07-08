using System;
using System.Collections.Generic;
using WebApplication3.Models;

public class FormTemplate
{
    public int ID { get; set; }
    public string Name { get; set; }
    public string FormTypeName { get; set; }
    public int CreatedUserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public int UpdatedUserId { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public ICollection<FormTemplateQuestions> FormTemplateQuestions { get; set; }
    public ICollection<Form> Forms { get; set; }
}


