using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExerionAPI.Migrations
{
    /// <inheritdoc />
    public partial class setsupdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Reps",
                table: "Programs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Sets",
                table: "Programs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Reps",
                table: "Programs");

            migrationBuilder.DropColumn(
                name: "Sets",
                table: "Programs");
        }
    }
}
