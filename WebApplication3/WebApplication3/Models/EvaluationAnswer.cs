using System;
using System.Collections.Generic;
using WebApplication3.Models;

namespace WebApplication3.Models
{
    public class EvaluationAnswer
    {
        public int ID { get; set; }
        public int EvaluationID { get; set; }
        public string Answer { get; set; }
        public int CreatedUserId { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UpdatedUserId { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool IsDeleted { get; set; }
        public Evaluation Evaluation { get; set; }
    }
}
