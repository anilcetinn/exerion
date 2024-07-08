using System;
using System.Collections.Generic;

public class Form
{
    public int TemplateID { get; set; }
    public int ID { get; set; }
    public string Name { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
    public int PeriodYear { get; set; }
    public string PeriodMonth { get; set; }
    public bool IsPublished { get; set; }
    public string Status { get; set; }
    public int CreatedUserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public int UpdatedUserId { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public FormTemplate FormTemplate { get; set; }
    public ICollection<Evaluation> Evaluations { get; set; }
}
