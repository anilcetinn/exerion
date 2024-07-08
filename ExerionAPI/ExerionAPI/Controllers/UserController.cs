using ExerionAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using MimeKit;

[Route("api/[controller]")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly ExerionDbContext _dbContext;
    private readonly string _tokenSecret = "yourSecretKey"; // Replace with your secure key
    private readonly EmailService _emailService;

    public UserController(ExerionDbContext dbContext, EmailService emailService)
    {
        _dbContext = dbContext;
        _emailService = emailService;
    }

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        // Email validation
        if (!IsValidEmail(user.Email))
        {
            return BadRequest("Invalid email format.");
        }

        // Check if user already exists in database
        var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
        if (existingUser != null)
        {
            if (existingUser.IsVerified)
            {
                return Conflict("User with this email already exists and is verified.");
            }
            else
            {
                // Send verification code again for unverified users
                _emailService.SendEmail(existingUser.Email, "Verification Code", $"Your verification code is: {existingUser.VerificationCode}");
                return Conflict("User with this email already exists but is not verified. Verification code sent again.");
            }
        }

        // Hash user's password
        user.Password = HashPassword(user.Password);

        // Save user to database
        _dbContext.Users.Add(user);
        _dbContext.SaveChanges();

        // Generate a JWT token for the user
        var token = GenerateToken(user);

        // Return response with user information and token
        return Ok(new { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName, Token = token });
    }

    [HttpPost("sendVerificationCode")]
    public IActionResult SendVerificationCode([FromBody] string email)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var verificationCode = new Random().Next(100000, 999999).ToString();
        user.VerificationCode = verificationCode; // Geçici bir doğrulama kodu ataması
        _dbContext.SaveChanges();

        _emailService.SendEmail(user.Email, "Verification Code", $"Your verification code is: {verificationCode}");

        return Ok("Verification code sent.");
    }



    [HttpPost("verifyCode")]
    public IActionResult VerifyCode([FromBody] VerifyCodeModel model)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == model.Email && u.VerificationCode == model.Code);
        if (user == null)
        {
            return BadRequest("Invalid verification code.");
        }

        user.IsVerified = true;
        user.VerificationCode = null;
        _dbContext.SaveChanges();

        var token = GenerateToken(user);
        return Ok(new { Token = token });
    }

    [HttpGet("getUserInfo")]
    public IActionResult GetUserInfo()
    {
        // Retrieve email from user's token
        var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
        if (userEmail == null)
        {
            return Unauthorized("User not authenticated.");
        }

        // Find user in database
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == userEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Return user information in JSON format
        return Ok(user);
    }

    [HttpGet("checkEmail/{email}")]
    public async Task<IActionResult> CheckEmail(string email)
    {
        var user = await _dbContext.Users.FirstOrDefaultAsync(u => u.Email == email);
        if (user != null)
        {
            // Email exists
            return Ok(new { exists = true, isVerified = user.IsVerified });
        }
        else
        {
            // Email does not exist
            return Ok(new { exists = false });
        }
    }


    [HttpPost("checkPassword")]
    public IActionResult CheckPassword(UserLoginModel model)
    {
        // Find user in database
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == model.Email);
        if (user == null)
        {
            // If user does not exist, it means the email is incorrect
            return BadRequest("Invalid email or password.");
        }

        // Hash password entered by user and compare with hashed password in database
        if (HashPassword(model.Password) != user.Password)
        {
            return BadRequest("Invalid password.");
        }

        // If there are no errors, login is successful
        return Ok("Login successful!");
    }

    [HttpGet("getUserByEmail/{email}")]
    public IActionResult GetUserByEmail(string email)
    {
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Return user information in JSON format
        return Ok(user);
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        // If logout operation is to be performed on the backend, you can invalidate the token by adding it to a blacklist.
        // For example, the token can be added to a list and invalidated.
        // For a simple logout operation here, a successful response is returned.

        return Ok("Logout successful.");
    }

    [HttpPost("login")]
    public IActionResult Login(UserLoginModel model)
    {
        // Find user in database
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == model.Email);
        if (user == null)
        {
            return BadRequest("Invalid email or password.");
        }

        // Check if the user is verified
        if (!user.IsVerified)
        {
            return BadRequest("User email is not verified.");
        }

        // Hash password entered by user and compare with hashed password in database
        if (HashPassword(model.Password) != user.Password)
        {
            return BadRequest("Invalid email or password.");
        }

        // Generate a JWT token for the user
        var token = GenerateToken(user);

        // Return response with user information and token
        return Ok(new { Email = user.Email, FirstName = user.FirstName, LastName = user.LastName, Token = token });
    }

    [HttpGet("getUserWeightAndHeight/{email}")]
    public IActionResult GetUserWeightAndHeight(string email)
    {
        // Find user in database by email
        var user = _dbContext.Users.FirstOrDefault(u => u.Email == email);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        // Return user's weight and height in JSON format
        return Ok(new { user.Weight, user.Height });
    }

    // Email format validation
    private bool IsValidEmail(string email)
    {
        var regex = new System.Text.RegularExpressions.Regex(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$");
        return regex.IsMatch(email);
    }

    // Generate a JWT token for the user
    private string GenerateToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        // Generate a key with a size of 128 bits
        var key = Encoding.ASCII.GetBytes(_tokenSecret.PadRight(256 / 8, '\0'));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, user.Email),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName)
            }),
            Expires = DateTime.UtcNow.AddDays(7), // Token expiration (e.g., 7 days)
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    public class VerifyCodeModel
    {
        public string Email { get; set; }
        public string Code { get; set; }
    }

    // Password hashing operation
    private string HashPassword(string password)
    {
        using (var sha256 = SHA256.Create())
        {
            MimeMessage mimeMessage = new MimeMessage();
            var hashedBytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));

            // Return hashed password as base64 string
            return Convert.ToBase64String(hashedBytes);
        }
    }
}
