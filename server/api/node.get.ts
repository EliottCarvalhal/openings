import Node from '../models/node'

export default defineEventHandler(async event => {
  const roots = await Node.find({ parent: null }).populate('children')
  return roots
})
