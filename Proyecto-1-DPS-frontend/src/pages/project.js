import { Badge, Button, Card, Col, Container, Form, FormGroup, InputGroup, Modal, Pagination, Row, Spinner, Table, Toast, ToastContainer } from "react-bootstrap";
import NavbarCustom from "../components/navbar";
import { addComments, addProjectMembers, addTask, deleteProjectMembers, deleteTasks, editProject, editTask, getComments, getMembersProject, getPermissionsAuth, getProject, getTasksProjects, getUsers } from "../services/api";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import DatePickerCustom from "../components/datepicker";
import SelectCustom from "../components/select";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../services/auth_provider";
import { jwtDecode } from "jwt-decode";

function ProjectEdit() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const { projectID } = useParams()
    const itemsPerPage = 5;

    // consultas para obtener datos iniciales del proyecto y sus tareas 
    const { data: initialProject, isLoading, isSuccess } = useQuery(["projects", {id: projectID}], () => getProject(projectID))
    const { data: members, isLoadingMembers, isSuccessMembers } = useQuery(["members", {id: projectID}], () => getMembersProject(projectID))
    const { data: users, isLoadingUser, isSuccessUsers } = useQuery('users', getUsers)
    const { data: tasks, isLoadingTask, isSuccessTasks } = useQuery(["tasks", {id: projectID}], () => getTasksProjects(projectID))
    const { data: comments, isLoadingComments, isSuccessComments} = useQuery(["comments", {id: projectID}], () => getComments(projectID))

    const [project, setProject] = useState({id: projectID})
    const [toast, setToast] = useState({show: false});
    const [member, setMember] = useState({})
    const [task, setTask] = useState({})
    const [comment, setComment] = useState('')
    const [usersFilter, setUsersFilter] = useState([])
    const [showMemberDialog, setShowMemberDialog] = useState(false);
    const [showDeleteMember, setShowDeleteMember] = useState(false);
    const [showTaskDialog, setShowTaskDialog] = useState(false);
    const [showDeleteTask, setShowDeleteTask] = useState(false);
    const [currentPageMembers, setCurrentPageMembers] = useState(0);
    const [currentPageTasks, setCurrentPageTasks] = useState(0);

    
    const offsetMembers = currentPageMembers * itemsPerPage;
    const offsetTasks = currentPageTasks * itemsPerPage;
    // Token de autenticacion del usuario 
    const auth = useAuth();
    const user = jwtDecode(auth?.token)
    const {data: permission} = useQuery(["rolesAuth", {user_id: user.id}], () => getPermissionsAuth(user.id), {
        enabled: user != null
    })
    // Mutaciones para las operaciones del proyecto
    const editMutation = useMutation(editProject, {
        onSuccess: () => {
            queryClient.setQueryData(['projects', { id: projectID }], {...initialProject, ...project})
            setToast({type: 'success', header: 'Modificado', show: true, message: 'Se ha modificado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const saveTaskMutation = useMutation(addTask, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks")
            setToast({type: 'success', header: 'Agregado', show: true, message: 'Se ha agregado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const editTaskMutation = useMutation(editTask, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks")
            setToast({type: 'success', header: 'Agregado', show: true, message: 'Se ha agregado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const deleteTaskMutation = useMutation(deleteTasks, {
        onSuccess: () => {
            queryClient.invalidateQueries("tasks")
            if(currentPageTasks > 0 && tasks.length > 5) {
                setCurrentPageTasks(0)
            }
            setToast({type: 'success', header: 'Eliminado', show: true, message: 'Se ha eliminado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const saveMembersMutation = useMutation(addProjectMembers, {
        onSuccess: () => {
            queryClient.invalidateQueries("members")
            setToast({type: 'success', header: 'Agregado', show: true, message: 'Se ha agregado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const deleteMembersMutation = useMutation(deleteProjectMembers, {
        onSuccess: () => {
            queryClient.invalidateQueries("members")
            if(currentPageMembers > 0 && members.length > 5) {
                setCurrentPageMembers(0)
            }
            setToast({type: 'success', header: 'Eliminado', show: true, message: 'Se ha eliminado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    const saveCommentsMutation = useMutation(addComments, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
            setComment('')
            setToast({type: 'success', header: 'Agregado', show: true, message: 'Se ha agregado correctamente'})
        },
        onError: (e) => {
            setToast({type: 'danger', header: 'Error', show: true, message: e})
        }
    })

    // Ciera los dialogos de miembros y tareas
    const closeDialogs = () => {
        setShowMemberDialog(false)
        setShowDeleteMember(false)
        setShowTaskDialog(false)
        setShowDeleteTask(false)
        setMember({})
        setTask({})
    }

    // Muestra el dialogo paa agregar un miembro
    const showMember = () => {
        setUsersFilter(users?.filter(e => !members.find(r => r.user_id === e.id)))
        setShowMemberDialog(true)
    }

    const backToTable = () => {
        queryClient.invalidateQueries("projects")
        navigate('/projects')
    }

    const showTask = (task) => {
        if(task) {
            setTask(task)
        }
        setUsersFilter(users?.filter(e => members.find(r => r.user_id === e.id)))
        setShowTaskDialog(true)
    }

    const showMemberDeleteDialog = (e) => {
        setShowDeleteMember(true)
        setMember(e)
    }

    const showTaskDeleteDialog = (e) => {
        setShowDeleteTask(true)
        setTask(e)
    }

    // Guarda un miembro en el proyecto 
    const saveMember = () => {
        const memberProject = {userId: member.id, projectId: projectID}
        saveMembersMutation.mutate(memberProject)
        closeDialogs()
    }

    const deleteMember = () => {
        const memberProject = {userId: member.id, projectId: projectID}
        deleteMembersMutation.mutate(memberProject)
        closeDialogs()
    }

    const saveTask = () => {
        if(task?.id) {
            editTaskMutation.mutate(task)
        } else {
            saveTaskMutation.mutate({...task, proyecto_id: projectID, fecha_vencimiento: task.fecha_vencimiento || new Date()})
        }
        closeDialogs()
    }

    const addComment = () => {
        saveCommentsMutation.mutate({comment: comment, userId: user.id, projectID: projectID})
    }

    const deleteTask = () => {
        deleteTaskMutation.mutate(task.id)
        closeDialogs()
    }

    // Muestra las tarreas y paginacion 
    const nextPageMembers = () => {
        setCurrentPageMembers(prev => prev + 1)
    }
    const prevPageMembers = () => {
        setCurrentPageMembers(prev => prev - 1)
    }

    const nextPageTask = () => {
        setCurrentPageTasks(prev => prev + 1)
    }
    const prevPageTask = () => {
        setCurrentPageTasks(prev => prev - 1)
    }

    const itemPages = (list, currentPage, setCurrentPage) => {
        const paginator = []
        for(let i = 0; i < Math.ceil(list?.length / itemsPerPage); i++) {
            paginator.push(<Pagination.Item key={i} onClick={() => setCurrentPage(i)} active={i === currentPage}>{i + 1}</Pagination.Item>)  
        }
        return paginator
    }

    const capitalize = (str) => {
        return str?.charAt(0).toUpperCase() + str?.slice(1);
    }

    if(isLoading || isLoadingUser || isLoadingMembers || isLoadingTask || isLoadingComments) {
        return (
            <Container style={{marginTop: "20%"}}>
                <Row className="align-items-center">
                    <Col className="col-6"></Col>
                    <Col className="align-self-center">
                        <Spinner animation="border" variant="glaucous" />
                    </Col>
                </Row>
            </Container>
        )
    }

    if((isSuccess || isSuccessMembers || isSuccessUsers || isSuccessTasks || isSuccessComments)) {
        return(
            <> 
                <NavbarCustom></NavbarCustom>
                <Container fluid className="mb-3">
                    <Row>
                        <Col>
                            <h1 className="py-3 text-black">Editar Proyecto</h1>
                        </Col>
                        <Col className="col-auto py-4">
                            <Button variant="glaucous" onClick={backToTable}>Regresar</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card bg="white">
                                <Card.Header className="text-bg-glaucous">General</Card.Header>
                                <Card.Body className="bg-transparent">
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlid="form.ControlNameProject">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control type="text" defaultValue={initialProject?.nombre} value={project?.nombre} onChange={e => setProject({...project, nombre: e.target.value})} placeholder="Tarea DWF" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <FormGroup controlid="form.ControlStatus">
                                                <Form.Label>Estado</Form.Label>
                                                <SelectCustom options={[{value: "activo", label: "Activo"}, {value: "Inactivo", label: "Inactivo"}, {value: "Finalizado", label: "Finalizado"}]} value={{value: project?.estado || initialProject.estado, label: capitalize(project?.estado) || capitalize(initialProject?.estado)}} onChange={e => setProject({...project, estado: e.value})}/>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <DatePickerCustom label={"Fecha de Inicio"} dateFormat={"dd/MM/yyyy"} dateValue={project?.fecha_inicio || initialProject?.fecha_inicio} onChange={(e) => setProject({...project, fecha_inicio: e})}/>
                                        </Col>
                                        <Col>
                                            <DatePickerCustom label={"Fecha Final"} dateFormat={"dd/MM/yyyy"} dateValue={project?.fecha_fin || initialProject?.fecha_fin} onChange={(e) => setProject({...project, fecha_fin: e})}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <DatePickerCustom disabled startDate={initialProject?.creado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"} label={"Creado en"} dateValue={initialProject.creado_en}/>
                                        </Col>
                                        <Col>
                                            <DatePickerCustom disabled startDate={project?.actualizado_en || initialProject?.actualizado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"}label={"Actualizado en"} dateValue={initialProject.actualizado_en}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlid="form.ControlFullName">
                                                <Form.Label>Descripción</Form.Label>
                                                <Form.Control as="textarea" type="text" defaultValue={initialProject?.descripcion}  value={project?.descripcion} onChange={e => setProject({...project, descripcion: e.target.value})} placeholder="Crear BD en PostreSQL con las tablas principales" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    {permission?.puede_editar_proyectos === 1 ? (
                                        <Row className="mt-5 justify-content-end">
                                            <Col className="col-auto">
                                                <Button onClick={() => setProject({nombre: initialProject?.nombre, descripcion: initialProject?.descripcion})} active variant="secondary">Cancelar</Button>
                                            </Col>
                                            <Col className="col-auto">
                                                <Button active onClick={() => editMutation.mutate(project)} variant="glaucous">Guardar</Button>
                                            </Col>
                                        </Row>
                                        
                                    ) : <></>}
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="white">
                                <Card.Header className="text-bg-purpureus">Integrantes</Card.Header>
                                <Card.Body className="bg-transparent">
                                    {permission?.puede_editar_proyectos === 1 ? (
                                        <Row className="justify-content-end">
                                            <Col className="col-auto mb-3">
                                                <Button active onClick={showMember} variant="glaucous">Añadir</Button>
                                            </Col>
                                        </Row>
                                    ) : <></>}
                                    <Row>
                                        <Col>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Rol</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {users?.map((e, i) => {
                                                        if(members?.find(r => r.user_id === e.id)) {
                                                            if(i >= offsetMembers && i < offsetMembers + itemsPerPage) {
                                                                const colors = ["rust", "turquoise", "dark-spring-green", "purpureus", "glaucous"]
                                                                 return (
                                                                    <tr key={e.id}>
                                                                        <td>{e.nombre_completo}</td>
                                                                        <td>
                                                                            <Badge bg={colors[e.rol_id - 1]}>{e.user_role}</Badge>
                                                                        </td>
                                                                        <td>
                                                                            {permission?.puede_editar_proyectos === 1 ? (
                                                                                <Container>
                                                                                    <Row>
                                                                                        <Col className="col-auto">
                                                                                            <Button onClick={() => showMemberDeleteDialog(e)} active variant="danger">
                                                                                                <i className="bi bi-trash"></i>
                                                                                            </Button>
                                                                                        </Col>
                                                                                    </Row>
                                                                                </Container>
                                                                            ) : <></>}
                                                                            
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            }
                                                        }
                                                        return null;
                                                    })}
                                                </tbody>
                                            </Table>
                                            <Pagination className="d-flex justify-content-center pagination-purpureus">
                                                <Pagination.Prev onClick={prevPageMembers} disabled={currentPageMembers === 0}/>
                                                {itemPages(members, currentPageMembers, setCurrentPageMembers)}
                                                <Pagination.Next onClick={nextPageMembers} disabled={currentPageMembers + 1 === Math.ceil(members?.length / itemsPerPage)}/>
                                            </Pagination>    
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col className="col-8">
                            <Card bg="white">
                                <Card.Header className="text-bg-dark-spring-green">Tareas</Card.Header>
                                <Card.Body className="bg-transparent">
                                    {permission?.puede_agregar_tareas === 1 ? (
                                        <Row className="justify-content-end">
                                            <Col className="col-auto mb-3">
                                                <Button active onClick={() => showTask()} variant="glaucous">Añadir</Button>
                                            </Col>
                                        </Row>
                                    ) : <></>}
                                    <Row>
                                        <Col>
                                            <Table striped bordered hover>
                                                <thead>
                                                    <tr>
                                                        <th>Título</th>
                                                        <th>Asignado a</th>
                                                        <th>Estado</th>
                                                        <th>Fecha de Vencimiento</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {tasks?.map((e, i) => {
                                                        if(i >= offsetTasks && i < offsetTasks + itemsPerPage) {
                                                            const colors = ["rust", "turquoise", "dark-spring-green", "purpureus", "glaucous"]
                                                            var status;
                                                            switch(e.estado) {
                                                                case 'Pendiente':
                                                                    status = 0
                                                                    break;
                                                                case 'En Progreso':
                                                                    status = 4
                                                                    break;
                                                                case 'Completa':
                                                                    status = 2
                                                                    break;
                                                                default:
                                                                    console.log("No existe la prioridad");
                                                            }
                                                            let lastDate = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(new Date(e.fecha_vencimiento))
                                                             return (
                                                                <tr key={e.id}>
                                                                    <td>{e.titulo}</td>
                                                                    <td>{users?.find(u => u.id === e.asignado_a).nombre_completo}</td>
                                                                    <td>
                                                                        <Badge bg={colors[status]}>{e.estado}</Badge>
                                                                    </td>
                                                                    <td>
                                                                        {lastDate}
                                                                    </td>
                                                                    <td>
                                                                    
                                                                        <Container>
                                                                            <Row>
                                                                                {permission?.puede_editar_tareas === 1 ? (
                                                                                    <Col className="col-6">
                                                                                        <Button onClick={() => showTask(e)} active variant="glaucous">
                                                                                            <i className="bi bi-pencil"></i>
                                                                                        </Button>
                                                                                    </Col>
                                                                                ) : <></>}
                                                                                {permission?.puede_eliminar_tareas === 1 ? (
                                                                                    <Col className="col-6">
                                                                                        <Button onClick={() => showTaskDeleteDialog(e)} active variant="danger">
                                                                                            <i className="bi bi-trash"></i>
                                                                                        </Button>
                                                                                    </Col>
                                                                                ) : <></>}
                                                                            </Row>
                                                                        </Container>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }
                                                        return null;
                                                    })}
                                                </tbody>
                                            </Table>
                                            <Pagination className="d-flex justify-content-center pagination-dark-spring-green">
                                                <Pagination.Prev onClick={prevPageTask} disabled={currentPageTasks === 0}/>
                                                {itemPages(tasks, currentPageTasks, setCurrentPageTasks)}
                                                <Pagination.Next onClick={nextPageTask} disabled={currentPageTasks + 1 === Math.ceil(tasks?.length / itemsPerPage)}/>
                                            </Pagination>    
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card bg="white">
                                <Card.Header className="text-bg-turquoise">Comentarios</Card.Header>
                                <Card.Body className="bg-transparent overflow-auto" style={{height: '420px', transform: "translate(0, 0)"}}>
                                    {comments ? comments.map((e, i) => (
                                        <Card key={e.id} className={i > 0 ? "mt-3" : ""}>
                                            <Card.Body>
                                                <Card.Subtitle className="mb-2 text-muted">{users?.find(u => u.id === e.id_user).nombre_usuario}</Card.Subtitle>
                                                <Card.Text>
                                                    {e.comment}
                                                </Card.Text>
                                                <Card.Text className="text-end">
                                                    <small className="text-muted">{new Intl.DateTimeFormat('en-US', {month: 'short',day: 'numeric', hour: '2-digit', minute: '2-digit'}).format(new Date(e.created_at))}</small>
                                                </Card.Text>
                                            </Card.Body>
                                        </Card>
                                    )) : <>
                                        <h2 className="text-center">Has el primer comentario!</h2>
                                    </>}
                                </Card.Body>
                                <Card.Footer>
                                    <Row>
                                        <Col>
                                            <InputGroup className="mb-3" controlid="form.ControlComment">
                                                <Form.Control as="textarea" type="text" value={comment} onChange={e => setComment(e.target.value)} placeholder="Añade un Comentario" />
                                                <Button variant="glaucous" onClick={addComment}>
                                                    Enviar
                                                </Button>
                                            </InputGroup>
                                        </Col>
                                    </Row>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Modal centered show={showMemberDialog} onHide={closeDialogs}>
                    <Modal.Header closeButton>
                        <Modal.Title>Agregar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlUser">
                                        <Form.Label>Usuario</Form.Label>
                                        <SelectCustom options={usersFilter?.map(e => ({value: e.id, label: e.nombre_completo}))} value={{value: member.id, label: member.nombre_completo}} onChange={(e) => setMember(users?.find(u => u.id === e.value))}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="glaucous" onClick={saveMember}>
                            Guardar
                        </Button>
                        <Button active variant="secondary" onClick={closeDialogs}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal centered show={showDeleteMember} onHide={closeDialogs}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <p>¿Deseas Eliminar este Miembro?</p>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button active variant="danger" onClick={deleteMember}>
                            Eliminar
                        </Button>
                        <Button active variant="secondary" onClick={closeDialogs}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal centered show={showTaskDialog} onHide={closeDialogs}>
                    <Modal.Header closeButton>
                        <Modal.Title>{!task.id ? 'Agregar' : 'Editar'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlTitle">
                                        <Form.Label>Título</Form.Label>
                                        <Form.Control type="text" value={task?.titulo || ''} onChange={e => setTask({...task, titulo: e.target.value})} placeholder="Creación de los CRUD" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlDescriptionTask">
                                        <Form.Label>Descripción</Form.Label>
                                        <Form.Control as="textarea" type="text" value={task?.descripcion || ''} onChange={e => setTask({...task, descripcion: e.target.value})} placeholder="Crear CRUDS para implementar servicios" />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlSignedTo">
                                        <Form.Label>Asignado a</Form.Label>
                                        <SelectCustom options={usersFilter?.map(e => ({value: e.id, label: e.nombre_completo}))} value={{value: task?.asignado_a, label: users?.find(u => u.id === task?.asignado_a)?.nombre_completo}} onChange={(e) => setTask({...task, asignado_a: users?.find(u => u.id === e.value).id})}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group className="mb-3" controlid="form.ControlPriority">
                                        <Form.Label>Prioridad</Form.Label>
                                        <SelectCustom options={[{value: "Baja", label: "Baja"}, {value: "Media", label: "Media"}, {value: "Alta", label: "Alta"}]} value={{value: task.prioridad, label: task.prioridad}} onChange={(e) => setTask({...task, prioridad: e.value})}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                {!task.id ? '' : <>
                                    <Col>
                                        <Form.Group className="mb-3" controlid="form.ControlStatus">
                                            <Form.Label>Estado</Form.Label>
                                            <SelectCustom options={[{value: "Pendiente", label: "Pendiente"}, {value: "En Progreso", label: "En Progreso"}, {value: "Completa", label: "Completa"}]} value={{value: task.estado, label: task.estado}} onChange={(e) => setTask({...task, estado: e.value})}/>
                                        </Form.Group>
                                    </Col>
                                </>}
                                <Col>
                                    <DatePickerCustom label={"Fecha de Vencimiento"} dateFormat={"dd/MM/yyyy"} dateValue={task?.fecha_vencimiento} onChange={(e) => setTask({...task, fecha_vencimiento: e})}/>
                                </Col>
                            </Row>                        
                            {!task.id ? '' : <>
                                <Row>
                                    <Col>
                                        <DatePickerCustom disabled startDate={task?.creado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"} label={"Creado en"} dateValue={task?.creado_en}/>
                                    </Col>
                                    <Col>
                                        <DatePickerCustom disabled startDate={task?.actualizado_en} dateFormat={"dd/MM/yyyy h:mm:ss aa"} label={"Actualizado en"} dateValue={task?.actualizado_en}/>
                                    </Col>
                                </Row>
                            </>}
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="glaucous" onClick={saveTask}>
                            {!task.id ? 'Guardar': 'Actualizar'}
                        </Button>
                        <Button active variant="secondary" onClick={closeDialogs}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Modal centered show={showDeleteTask} onHide={closeDialogs}>
                    <Modal.Header closeButton>
                        <Modal.Title>Eliminar</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Row>
                                <Col>
                                    <p>¿Deseas Eliminar esta Tarea?</p>
                                </Col>
                            </Row>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button active variant="danger" onClick={deleteTask}>
                            Eliminar
                        </Button>
                        <Button active variant="secondary" onClick={closeDialogs}>
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
                <ToastContainer
                    className="p-3"
                    position="top-center"
                    style={{ zIndex: 1 }}
                >
                    <Toast onClose={() => setToast({...toast, show: false})} bg={toast.type} show={toast.show} delay={5000} autohide>
                        <Toast.Header closeButton={false}>
                            <strong className="me-auto">{toast.header}</strong>
                        </Toast.Header>
                        <Toast.Body className="text-center">{toast.message}</Toast.Body>
                    </Toast>
                </ToastContainer>
            </>    
        )
    }
    
}

export default ProjectEdit;