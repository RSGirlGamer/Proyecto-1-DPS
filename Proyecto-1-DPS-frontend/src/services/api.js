import axios from "axios"

const todosAPI = axios.create({
    baseURL: "http://localhost:3000/api/"
})

const token = localStorage.getItem("token")

export const login = async (userData) => {
    const response = await todosAPI.post("/usuarios/login", userData)
    return response.data
}

export const registerUser = async (userData) => {
    const response = await axios.post('http://localhost:3000/api/usuarios/registrar', userData);
    return response
};

export const getUsers = async () => {
    const response = await todosAPI.get("/usuarios", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const editPassword = async (item) => {
    const response = await todosAPI.put("/usuarios/password/" + item.id, {contrasena: item.contrasena}, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const editUser = async (item) => {
    const response = await todosAPI.put("/usuarios/user", item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getProjects = async () => {
    const response = await todosAPI.get("/proyectos/", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const getProject = async (id) => {
    const response = await todosAPI.get("/proyectos/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const getMembersProject = async (id) => {
    const response = await todosAPI.get("/proyectos/integrantes/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const addProject = async (item) => {
    const response = await todosAPI.post("/proyectos/", item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getComments = async (id) => {  
    const response = await todosAPI.get("/comentarios/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const addProjectMembers = async (item) => {
    const response = await todosAPI.post("/proyectos/integrantes", item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const addTask = async (item) => {
    const response = await todosAPI.post("/tareas", item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const addComments = async (item) => {
    const response = await todosAPI.post("/comentarios", item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const editProject = async (item) => {
    const response = await todosAPI.put("/proyectos/" + item.id, item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const editTask = async (item) => {
    const response = await todosAPI.put("/tareas/" + item.id, item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const deleteTasks = async (id) => {
    const response = await todosAPI.delete("/tareas/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const deleteProjectMembers = async (item) => {
    const response = await todosAPI.delete("/proyectos/integrantes/" + item.userId + "&" + item.projectId, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getTasksProjects = async (id) => {
    const response = await todosAPI.get("/tareas/project/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}

export const deleteProject = async (id) => {
    const response = await todosAPI.delete("/proyectos/" + id, {
        headers: {
            Authorization: "Bearer " + token
        },
    })
    return response
}

export const deleteUser = async (item) => {
    const response = await todosAPI.delete("/usuarios/" + item.id, {
        headers: {
            Authorization: "Bearer " + token
        },
    })
    return response
}

export const editUserRole = async (item) => {
    const response = await todosAPI.put("/usuarios/update", {
        rol_id: item.rol_id,
        usuario_id: item.id
    }, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getPermissions = async (id) => {
    const response = await todosAPI.get("/permisos/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getPermissionsAuth = async (id) => {
    const response = await todosAPI.get("/permisos/auth/" + id, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data[0]
}

export const editRolePermission = async (item) => {
    const response = await todosAPI.put("/permisos/" + item.rol_id, item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const editRole = async (item) => {
    const response = await todosAPI.put("/roles/" + item.id, item, {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response
}

export const getRoles = async () => {   
    const response = await todosAPI.get("/roles/", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    let data = []
    response.data.forEach(r => {
        let option = {value: r.id, label: r.nombre}
        data.push(option)
    })
    return data
}

export const getRolesDefault = async () => {   
    const response = await todosAPI.get("/roles/", {
        headers: {
            Authorization: "Bearer " + token
        }
    })
    return response.data
}