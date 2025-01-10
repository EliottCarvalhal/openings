import Node from '../../models/node'

export default defineEventHandler(async event => {
  const params = event.context.params
  if (!params) throw createError({ statusCode: 400, message: 'Node ID is required' })

  const node = await Node.findById(params.id).populate('children') // Populate children
  if (!node) {
    throw createError({ statusCode: 404, message: 'Node not found' })
  }
  return node
})
