export interface AddResult {
  score: string;

  student: string;

  course: string;

  session: string;
}
export interface UpdateResult extends Omit<AddResult, "course" | "student"> {}
