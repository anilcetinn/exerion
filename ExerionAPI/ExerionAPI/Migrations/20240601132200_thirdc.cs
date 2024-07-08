using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExerionAPI.Migrations
{
    /// <inheritdoc />
    public partial class thirdc : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "Programs");

            migrationBuilder.RenameColumn(
                name: "UserEmail",
                table: "Programs",
                newName: "ExerciseName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ExerciseName",
                table: "Programs",
                newName: "Name");

            migrationBuilder.AddColumn<string>(
                name: "UserEmail",
                table: "Programs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

    }
}
