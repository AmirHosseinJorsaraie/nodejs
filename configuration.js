const Permisions = [{PermisionName:'Create Posts'},{PermisionName:'Watch Posts'},{PermisionName:'Delete Posts'}]
const Roles = [{RoleName: 'Admin',RolePermisions:[1,2,3]},{RoleName: 'RegularUser',RolePermisions:[2]}]
const Users = [{username: 'Amir',password:'admin',Roles:[1]},{username: 'user',password:'123',Roles:[2]}]

module.exports = {Permisions,Roles,Users}