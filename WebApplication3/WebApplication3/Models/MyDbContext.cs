using Microsoft.EntityFrameworkCore;
using WebApplication3.Models;

public class MyDbContext : DbContext
{
    public MyDbContext(DbContextOptions<MyDbContext> options)
        : base(options)
    {
    }

    public DbSet<Question> Questions { get; set; }
    public DbSet<QuestionOption> QuestionOptions { get; set; }
    public DbSet<FormTemplate> FormTemplates { get; set; }
    public DbSet<FormTemplateQuestions> FormTemplateQuestions { get; set; }
    public DbSet<Form> Forms { get; set; }
    public DbSet<Evaluation> Evaluations { get; set; }
    public DbSet<EvaluationAnswer> EvaluationAnswers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>()
            .HasMany(q => q.QuestionOptions)
            .WithOne(qo => qo.Question)
            .HasForeignKey(qo => qo.QuestionID);

        modelBuilder.Entity<FormTemplate>()
            .HasMany(ft => ft.FormTemplateQuestions)
            .WithOne(ftq => ftq.FormTemplate)
            .HasForeignKey(ftq => ftq.TemplateID);

        modelBuilder.Entity<FormTemplateQuestions>()
            .HasOne(ftq => ftq.Question)
            .WithMany(q => q.FormTemplateQuestions)
            .HasForeignKey(ftq => ftq.QuestionID);

        modelBuilder.Entity<FormTemplate>()
            .HasMany(ft => ft.Forms)
            .WithOne(f => f.FormTemplate)
            .HasForeignKey(f => f.TemplateID);

        modelBuilder.Entity<Form>()
            .HasMany(f => f.Evaluations)
            .WithOne(e => e.Form)
            .HasForeignKey(e => e.FormID);

        modelBuilder.Entity<Evaluation>()
            .HasMany(e => e.EvaluationAnswers)
            .WithOne(ea => ea.Evaluation)
            .HasForeignKey(ea => ea.EvaluationID);
    }
}
