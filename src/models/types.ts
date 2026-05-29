export interface BorrowedBook {
  code: string;
  borrowDate: Date;
}

export interface Member {
  code: string;
  name: string;
  borrowed: BorrowedBook[];
  penaltyUntil: Date | null;
}
