package config

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

var (
	AllowOrigins = "http://localhost:5173"
	AllowMethods = strings.Join([]string{
		fiber.MethodGet,
		fiber.MethodPost,
		fiber.MethodHead,
		fiber.MethodPut,
		fiber.MethodDelete,
		fiber.MethodPatch,
	}, ",")
	AllowHeaders     = "Origin, Content-Type, Accept, Authorization"
	AllowCredentials = true
	ExposeHeaders    = ""
	MaxAge           = 0
)
