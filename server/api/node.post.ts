import Node from '../models/node'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  // Validate required fields
  const { name, type, parent, pgn, description, children } = body
  if (!name || !type) {
    throw createError({ statusCode: 400, message: 'Name and type are required' })
  }

  // Create the new node
  const newNode = await Node.create({
    name,
    type,
    parent: parent || null, // Null if it's a root node
    children: children,
    pgn: type === 'opening' ? pgn : undefined,
    description: type === 'opening' ? description : undefined,
  })

  // If there's a parent, add this node to the parent's children
  if (parent) {
    await Node.findByIdAndUpdate(parent, { $push: { children: newNode._id } }).populate('children')
  }

  return newNode
})
