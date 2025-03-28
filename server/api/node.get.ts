import Node from '../models/node'
export default defineEventHandler(async event => {
  // Use a recursive population strategy
  const roots = await Node.find({ parent: null }).populate({
    path: 'children',
    populate: {
      path: 'children', // This will populate children of children
      // You can continue this pattern for deeper nesting if needed
    }
  })
  return roots
})