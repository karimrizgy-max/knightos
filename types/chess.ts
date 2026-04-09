export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

export interface ChessPiece {
  type: PieceType;
  color: PieceColor;
}

export interface Square {
  piece: ChessPiece | null;
  square: string;
}

export interface Move {
  from: string;
  to: string;
  piece: PieceType;
  captured?: PieceType;
  promotion?: PieceType;
}

export interface GameState {
  board: Square[][];
  currentPlayer: PieceColor;
  isCheck: boolean;
  isCheckmate: boolean;
  isStalemate: boolean;
  isDraw: boolean;
  fen: string;
  pgn: string;
}