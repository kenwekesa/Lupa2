import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient() 

export interface IDeleteParams {
  id?: string; 
  name?: string;
  email?: string;
  userType?: string;
}

export default async function deleteUsers(params: IDeleteParams) {

  const { id, name, email, userType } = params || {};

  if (id) {
    // If id is passed, delete the user
    await prisma.user.delete({
      where: { id }  
    })
    return
  }

  // Otherwise get users
  let query: any = {};

  if (name) {
    query.name = name;
  }

  if (email) {
    query.email = email;
  }

  if (userType === "clients") {
    query.userType = "clients";
  }

  const users = await prisma.user.findMany({
    where: query
  })

  return users.map(user => ({
    ...user,
    id: user.id.toString() 
  }))

}