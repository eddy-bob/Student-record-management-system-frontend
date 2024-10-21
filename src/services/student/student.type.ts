import { Gender, Options } from "@/type";
export interface AddStudent {
  regNumber: string;

  firstName: string;

  lastName: string;

  middleName?: string;

  admissionSet: string;

  option?: Options;

  gender: Gender;
}
export interface UpdateStudent extends AddStudent {}
