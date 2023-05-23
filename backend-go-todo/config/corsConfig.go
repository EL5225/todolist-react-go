package config

import (
	"strings"

	"github.com/gofiber/fiber/v2"
)

var (
	AllowOrigins = "http://localhost:3000"
	AllowMethods = strings.Join([]string{
		fiber.MethodGet,
		fiber.MethodPost,
		fiber.MethodHead,
		fiber.MethodPut,
		fiber.MethodDelete,
		fiber.MethodPatch,
	}, ",")
	AllowHeaders     = ""
	AllowCredentials = false
	ExposeHeaders    = ""
	MaxAge           = 0
)
