import { Role } from "@/type";
export interface AddOperator {
  email: string;

  firstName: string;

  lastName: string;

  role: Role;

  password: string;

  adminPassword: string;
}
export interface UpdateOperator
  extends Omit<AddOperator, "role" | "adminPassword"> {
  newPassword: string;
}
export interface UpdateOperatorAsSuperAdmin
  extends Omit<AddOperator, "adminPassword"> {}
