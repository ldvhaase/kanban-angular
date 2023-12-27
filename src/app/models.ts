export interface Column {
  name: string
  tasks: string[]
}

export interface Board {
  name: string
  columns: Column[]
}
