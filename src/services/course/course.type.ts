import { Options, Level, Semester } from "@/type";
export interface AddCourse {
  title: string;

  courseCode: string;

  option: Options;

  unit: string;

  level: Level;

  semester: Semester;
}
export interface UpdateCourse extends AddCourse {}
