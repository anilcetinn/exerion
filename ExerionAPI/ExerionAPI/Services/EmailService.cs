using MailKit.Net.Smtp;
using MimeKit;


public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public void SendEmail(string toEmail, string subject, string body)
    {
        var emailMessage = new MimeMessage();
        emailMessage.From.Add(new MailboxAddress("Exerion", _configuration["EmailSettings:FromEmail"]));
        emailMessage.To.Add(new MailboxAddress("", toEmail));
        emailMessage.Subject = subject;
        emailMessage.Body = new TextPart("plain") { Text = body };

        using (var client = new SmtpClient())
        {
            client.Connect("smtp.gmail.com", 587, false);
            client.Authenticate(_configuration["EmailSettings:FromEmail"], _configuration["EmailSettings:AppPassword"]);
            client.Send(emailMessage);
            client.Disconnect(true);
        }
    }
}
