using System;
using System.Collections.Generic;
using WebApplication3.Models;

public class Evaluation
{
    public int ID { get; set; }
    public int FormID { get; set; }
    public byte EvaluatorID { get; set; }
    public byte EvaluatedID { get; set; }
    public string Status { get; set; }
    public byte CreatedUserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public byte UpdatedUserId { get; set; }
    public DateTime UpdatedDate { get; set; }   
    public bool IsDeleted { get; set; }
    public Form Form { get; set; }
    public ICollection<EvaluationAnswer> EvaluationAnswers { get; set; }
}


