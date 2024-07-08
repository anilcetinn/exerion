using System;
using System.Collections.Generic;

public class QuestionOption
{
    public int ID { get; set; }
    public int QuestionID { get; set; }
    public string OptionText { get; set; }
    public string OptionCode { get; set; }
    public string OptionValue { get; set; }
    public int CreatedUserId { get; set; }
    public DateTime CreatedDate { get; set; }
    public int UpdatedUserId { get; set; }
    public DateTime UpdatedDate { get; set; }
    public bool IsDeleted { get; set; }
    public Question Question { get; set; }
}