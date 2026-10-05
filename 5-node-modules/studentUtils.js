export function getAverageScore(students) {
  if (students.length === 0) return 0;
  const total = students.reduce((sum, student) => sum + student.score, 0);
  return total / students.length;
}

export function getTopStudent(students) {
  if (students.length === 0) return null;
  return students.reduce((topStudent, student) =>
    student.score > topStudent.score ? student : topStudent
  );
}