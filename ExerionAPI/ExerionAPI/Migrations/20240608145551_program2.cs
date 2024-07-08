using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExerionAPI.Migrations
{
    /// <inheritdoc />
    public partial class program2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BodyPart",
                table: "Programs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BodyPart",
                table: "Programs");
        }
    }
}
