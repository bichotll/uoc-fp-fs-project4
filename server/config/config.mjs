export const typeDefs = `#graphql
type Tarea {
  _id: String
  titulo: String 
  descripcion: String
  fecha_inicio: String
  fecha_fin: String
  estado: Boolean
  columna: String
  panelId: String
  fileName: String
}
type Panel {
  _id: String
  titulo: String
  descripcion: String
  tareas: [Tarea]
}

type Query {
  hello: String

  panel(_id: ID): Panel
  tarea(_id: ID): Tarea

  allPaneles: [Panel]
  allTareas: [Tarea]
}

type Mutation {
  addTarea(
    idPanel: String,
    titulo: String,
    descripcion: String,
    fecha_inicio: String,
    fecha_fin: String,
    estado: Boolean,
    columna: String,
    panelId: String
    fileName: String
  ): Tarea
  updateTarea(
    _id: String,
    idPanel: String,
    titulo: String,
    descripcion: String,
    fecha_inicio: String,
    fecha_fin: String,
    estado: Boolean,
    columna: String,
    panelId: String
  ): Tarea
  moveTarea(
    _id: String,
    columna: String,
  ): Tarea
  deleteTarea(
    _id: String,
  ): Tarea

  addPanel(
    titulo: String,
    descripcion: String,
  ): Panel
  updatePanel(
    _id: String,
    titulo: String,
    descripcion: String,
  ): Panel
  deletePanel(
    _id: String,
  ): Panel
}

type Subscription {
  hello: String,
  tareaMoved: Tarea
}
`

export const mongoDbUrl = 'mongodb+srv://bdAdmin:1234@bduoc.kd8xpcw.mongodb.net/test'