package routes

import (
	"github.com/RianIhsan/backend-go-todo/controllers"
	"github.com/gofiber/fiber/v2"
)

func allRoutes(app *fiber.App) {
	App := app.Group("/api")

	todo := App.Group("/todos")
	todo.Post("/create", controllers.CreateTodo)
	todo.Get("/get", controllers.GetAllTodo)
	todo.Get("/get/:id", controllers.GetTodoById)
	todo.Patch("/update/:id", controllers.UpdateTodoById)
	todo.Delete("/delete/:id", controllers.DeleteTodoById)
}
