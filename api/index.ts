import type { Node } from '../models'

const baseUrl = 'http://localhost:3000/api'

export const getNodes = async (): Promise<Node[] | undefined> => {
  try {
    const res = await fetch(`${baseUrl}/node`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const getNode = async (id: string): Promise<Node | undefined> => {
  try {
    const res = await fetch(`${baseUrl}/node/${id}`)
    const data = await res.json()
    return data
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const postNode = async (node: Node) => {
  try {
    const res = await fetch(`${baseUrl}/node`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(node),
    })
    const data = await res.json()
  } catch (error) {
    console.log(error)
  }
}
