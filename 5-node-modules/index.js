import os from "node:os";
import path from "node:path";
import dns from "node:dns";
import students from "./students.js";
import { getAverageScore, getTopStudent } from "./studentUtils.js";

console.log("Student scores:");
for (const student of students) {
  console.log(`${student.name}: ${student.score}`);
}

console.log(`Average score: ${getAverageScore(students).toFixed(1)}`);
const topStudent = getTopStudent(students);
console.log(`Top student: ${topStudent ? topStudent.name : "No students"}`);

console.log(`Operating system: ${os.platform()} (${os.arch()})`);
console.log(`Path example: ${path.join("students", "data.json")}`);

dns.lookup("localhost", (error, address, family) => {
  if (error) {
    console.error(`DNS lookup failed: ${error.message}`);
    return;
  }

  console.log(`DNS lookup for localhost: ${address} (IPv${family})`);
});