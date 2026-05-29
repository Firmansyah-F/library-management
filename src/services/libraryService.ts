import { prisma } from "../lib/prisma";

export const getBooks = async () => {
  return prisma.book.findMany();
};

export const getMembers = async () => {
  return prisma.member.findMany({
    include: {
      borrowedBooks: {
        include: {
          book: true,
        },
      },
    },
  });
};

export const borrowBook = async (memberCode: string, bookCode: string) => {
  return prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({
      where: { code: memberCode },
      include: { borrowedBooks: true },
    });

    const book = await tx.book.findUnique({
      where: { code: bookCode },
    });

    if (!member || !book) {
      throw { status: 404, message: "Member or Book not found" };
    }

    if (member.borrowedBooks.length >= 2) {
      throw { status: 400, message: "Cannot borrow more than 2 books" };
    }

    if (book.stock <= 0) {
      throw { status: 400, message: "Book not available" };
    }

    await tx.borrowedBook.create({
      data: {
        memberId: member.id,
        bookId: book.id,
      },
    });

    await tx.book.update({
      where: { id: book.id },
      data: { stock: book.stock - 1 },
    });

    return { memberCode, bookCode };
  });
};

export const returnBook = async (memberCode: string, bookCode: string) => {
  return prisma.$transaction(async (tx) => {
    const member = await tx.member.findUnique({
      where: { code: memberCode },
    });

    const book = await tx.book.findUnique({
      where: { code: bookCode },
    });

    if (!member || !book) {
      throw { status: 404, message: "Member or Book not found" };
    }

    const borrowed = await tx.borrowedBook.findFirst({
      where: {
        memberId: member.id,
        bookId: book.id,
      },
    });

    if (!borrowed) {
      throw { status: 400, message: "Book not borrowed" };
    }

    const now = new Date();
    const diffDays =
      (now.getTime() - borrowed.borrowDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays > 7) {
      await tx.member.update({
        where: { id: member.id },
        data: {
          penaltyUntil: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
        },
      });
    }

    await tx.borrowedBook.delete({
      where: { id: borrowed.id },
    });

    await tx.book.update({
      where: { id: book.id },
      data: { stock: book.stock + 1 },
    });

    return { memberCode, bookCode };
  });
};
