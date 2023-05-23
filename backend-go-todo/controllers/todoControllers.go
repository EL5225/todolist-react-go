package controllers

import (
	"github.com/RianIhsan/backend-go-todo/database"
	"github.com/RianIhsan/backend-go-todo/models"
	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func CreateTodo(c *fiber.Ctx) error {
	todoReq := new(models.TodoReq)

	if err := c.BodyParser(todoReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	//validation
	validate := validator.New()
	if err := validate.Struct(todoReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Data tidak Valid!",
			"error":   err.Error(),
		})
	}

	todo := models.Todo{}
	todo.Name = todoReq.Name
	todo.Complete = todoReq.Complete
	if todoReq.Note != "" {
		todo.Note = &todoReq.Note
	}

	if err := database.DB.Create(&todo).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal server Error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data berhasil dibuat!",
		"data":    todo,
	})

}

func GetAllTodo(c *fiber.Ctx) error {
	todos := []models.Todo{}

	if err := database.DB.Find(&todos).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Data tersedia",
		"data":    todos,
	})

}

func GetTodoById(c *fiber.Ctx) error {
	todoId := c.Params("id")
	todo := models.Todo{}

	if err := database.DB.First(&todo, "id = ?", todoId).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Todo tidak ada!",
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Todo ditemukan",
		"data":    todo,
	})
}

func UpdateTodoById(c *fiber.Ctx) error {
	todoUpdateReq := new(models.TodoUpdateReq)

	if err := c.BodyParser(todoUpdateReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	//validation
	validate := validator.New()
	if err := validate.Struct(todoUpdateReq); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Data tidak Valid!",
			"error":   err.Error(),
		})
	}

	todoId := c.Params("id")
	todo := models.Todo{}

	if err := database.DB.First(&todo, "id = ?", todoId).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Todo tidak ada!",
		})
	}

	todo.Name = todoUpdateReq.Name
	todo.Note = &todoUpdateReq.Note
	todo.Complete = todoUpdateReq.Complete

	if err := database.DB.Save(todo).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal server error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Todo Berhasil diupdate",
		"data":    todo,
	})
}

func DeleteTodoById(c *fiber.Ctx) error {
	todoId := c.Params("id")
	todo := models.Todo{}

	if err := database.DB.First(&todo, "id = ?", todoId).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "Todo tidak ada!",
		})
	}

	if err := database.DB.Delete(&todo).Error; err != nil {
		c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"message": "Internal Server Error",
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"messaage": "Todo berhasil dihapus",
	})
}
