export interface Node {
  _id: string;
  name: string;
  type: 'folder' | 'opening';
  parent?: string;
  children: Node[];
  pgn?: string;
  description?: string;
}