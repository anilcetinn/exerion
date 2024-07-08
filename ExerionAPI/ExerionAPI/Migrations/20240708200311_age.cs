using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExerionAPI.Migrations
{
    /// <inheritdoc />
    public partial class age : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Age",
                table: "Users",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Age",
                table: "Users");
        }
    }
}
