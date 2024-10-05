import axios from "axios"

const todosAPI = axios.create({
    baseURL: "http://localhost:3000/api/"
})

export const login = async () => {
    const response = await todosAPI.post("/usuarios/login");
    return response.data.token
    // await axios.post("http://localhost:3000/api/usuarios/login", {
    //     "correo_electronico": "deborabeatrizrivas@gmail.com",
    //     "contrasena": "EETS2205e"
    // }).then((response) => {
    //     axios.get("http://localhost:3000/api/usuarios/", {
    //         headers: {
    //             Authorization: "Bearer " + response.data.token
    //         }
    //     }).then((res) => setUsers(res.data)).catch((err) => {
    //         console.log(err.response.data)
    //     })
    // })
}

export const getUsers = async () => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.get("/usuarios", {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response.data
}

// const editPassword = async (id) => {
//     const responseToken = await todosAPI.post("/usuarios/login", {
//         "correo_electronico": "deborabeatrizrivas@gmail.com",
//         "contrasena": "EETS2205e"
//     });
//     await todosAPI.put("/usuarios/password/" + id, {}, {
//         headers: {
//             Authorization: "Bearer " + responseToken.data.token
//         }
//     })
// }

export const editUser = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.put("/usuarios/user", item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const getProject = async (id) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.get("/proyectos/" + id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response.data
}

export const getMembersProject = async (id) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.get("/proyectos/integrantes/" + id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response.data
}

export const addProject = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.post("/proyectos/", item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const addProjectMembers = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.post("/proyectos/integrantes", item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const addTask = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    console.log(item)
    const response = await todosAPI.post("/tareas", item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const editProject = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.put("/proyectos/" + item.id, item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const editTask = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.put("/tareas/" + item.id, item, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const deleteTasks = async (id) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.delete("/tareas/" + id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const deleteProjectMembers = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.delete("/proyectos/integrantes/" + item.userId + "&" + item.projectId, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const getTasksProjects = async (id) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.get("/tareas/project/" + id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response.data
}

export const deleteProject = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.delete("/proyectos/" + item.id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        },
    })
    return response
}

export const deleteUser = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.delete("/usuarios/" + item.id, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        },
    })
    return response
}

export const editUserRole = async (item) => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.put("/usuarios/update", {
        rol_id: item.rol_id,
        usuario_id: item.id
    }, {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    return response
}

export const getRoles = async () => {
    const responseToken = await todosAPI.post("/usuarios/login", {
        "correo_electronico": "deborabeatrizrivas@gmail.com",
        "contrasena": "EETS2205e"
    });
    const response = await todosAPI.get("/roles/", {
        headers: {
            Authorization: "Bearer " + responseToken.data.token
        }
    })
    let data = []
    response.data.forEach(r => {
        let option = {value: r.id, label: r.nombre}
        data.push(option)
    })
    return data
}