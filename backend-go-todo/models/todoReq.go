package models

type TodoReq struct {
	Name     string `json:"name" form:"name" validate:"required"`
	Note     string `json:"note" form:"note"`
	Complete bool   `json:"complete" form:"complete"`
}
type TodoUpdateReq struct {
	Name     string `json:"name" form:"name" validate:"required"`
	Note     string `json:"note" form:"note"`
	Complete bool   `json:"complete" form:"complete"`
}
