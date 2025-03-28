import Node from '../models/node'

export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { name, type, parent, pgn, description, children } = body
  if (!name || !type) {
    throw createError({ statusCode: 400, message: 'Name and type are required' })
  }
  // Create the new node
  const newNode = await Node.create({
    name,
    type,
    parent: parent || null,
    children: children || [],
    pgn: type === 'opening' ? pgn : undefined,
    description: type === 'opening' ? description : undefined,
  })

  // Update the parent if specified
  if (parent) {
    await Node.findByIdAndUpdate(parent, {
      $push: { children: newNode._id },
    })
  }

  // Return the complete node with populated fields if needed
  return newNode.toObject()
})
