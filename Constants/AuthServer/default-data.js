const PERMISIONS = Object.freeze(
    [
        { PermisionName: 'Create Posts' },
        { PermisionName: 'Watch Posts' },
        { PermisionName: 'Delete Posts' }
    ]
)

const ROLES = Object.freeze(
    [
        { RoleName: 'Admin', RolePermisions: [1, 2, 3] },
        { RoleName: 'RegularUser', RolePermisions: [2] }
    ]
)

const USERS = Object.freeze(
    [
        { username: 'Amir@gmail.com', password: 'admin', Roles: [1] },
        { username: 'user@gmail.com', password: '123', Roles: [2] }
    ]
)


export default { PERMISIONS, ROLES, USERS }