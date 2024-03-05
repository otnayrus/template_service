package repository

const (
	createUserQuery = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
	updateUserQuery = `UPDATE users SET name = ?, email = ?, password = ?, updated_at = NOW() WHERE id = ?`
	deleteUserQuery = `DELETE FROM users WHERE id = ?`

	getUserByEmailQuery = `SELECT id, name, email, password FROM users WHERE email = ?`
	getUserByIDQuery    = `SELECT id, name, email, password FROM users WHERE id = ?`
)

const (
	createUserRoleQuery = `INSERT INTO users_roles (user_id, role_id) VALUES (?, ?)`

	getRoleIdByNameQuery = `SELECT id FROM roles WHERE name = ?`
	getUserRoleQuery     = `SELECT EXISTS (
		SELECT 1
		FROM users_roles
		WHERE user_id = ? AND role_id = ?
	)`
	getUserRolesQuery = `SELECT r.name
		FROM users_roles ur
		INNER JOIN roles r ON r.id = ur.role_id
		WHERE ur.user_id = ?	
	`
)
