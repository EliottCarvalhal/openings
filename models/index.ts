export interface Node {
  name: string;
  type: 'folder' | 'opening';
  parent?: Node;
  children: Node[];
  pgn?: string;
  description?: string;
}