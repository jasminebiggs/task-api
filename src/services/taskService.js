import { PrismaClient } from '../generated/prisma/client/index.js';
const prisma = new PrismaClient();

export async function getAllTasks(filters = {}, limit) {
  return prisma.task.findMany({
    where: filters,
    take: limit || undefined,
  });
}

export async function createTask(data) {
  return prisma.task.create({ data });
}

export async function getTaskById(id) {
  return prisma.task.findUnique({ where: { id } });
}

export async function updateTask(id, data) {
  return prisma.task.update({
    where: { id },
    data,
  });
}

export async function deleteTask(id) {
  try {
    await prisma.task.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}
