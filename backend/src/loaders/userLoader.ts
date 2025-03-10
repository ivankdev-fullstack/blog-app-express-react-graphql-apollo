import { User } from ".prisma/client";
import DataLoader from "dataloader";
import { prisma } from "../server";

const batchUsers = async (ids: readonly number[]): Promise<User[]> => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids as number[],
      },
    },
  });

  const userMap: { [key: number]: User } = {};
  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

export const userLoader = new DataLoader<number, User>(batchUsers);
