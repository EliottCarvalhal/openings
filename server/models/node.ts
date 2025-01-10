import mongoose from 'mongoose';

const nodeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['folder', 'opening'],
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Node', // Self-referencing
    default: null, // Root nodes have no parent
  },
  children: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Node', // Self-referencing
    },
  ],
  // For opening nodes only
  pgn: {
    type: String,
    required: function (this: any) {
      return this.type === 'opening';
    },
  },
  description: {
    type: String,
    default: '',
  },
});

const Node = mongoose.model('Node', nodeSchema);

export default Node;