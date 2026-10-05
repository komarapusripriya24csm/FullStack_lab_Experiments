import { useEffect, useState } from "react";

const API = "http://localhost:3001/students";

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.status === 204 ? null : response.json();
}

export default function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");
  const [error, setError] = useState("");

  async function loadStudents() {
    try {
      setStudents(await request(API));
      setError("");
    } catch (err) {
      setError(`${err.message}. Is JSON Server running on port 3001?`);
    }
  }

  useEffect(() => {
    loadStudents();
  }, []);

  async function addStudent(event) {
    event.preventDefault();
    if (!name.trim() || !course.trim()) return;

    try {
      await request(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), course: course.trim() })
      });
      setName("");
      setCourse("");
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function replaceStudent(student) {
    const updated = {
      name: `${student.name} Updated`,
      course: student.course
    };
    try {
      await request(`${API}/${student.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated)
      });
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function patchCourse(student) {
    const updatedCourse = student.course === "React" ? "Node.js" : "React";
    try {
      await request(`${API}/${student.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ course: updatedCourse })
      });
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  async function deleteStudent(id) {
    try {
      await request(`${API}/${id}`, { method: "DELETE" });
      await loadStudents();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <main>
      <h1>Students</h1>
      <p>JSON Server API: GET, POST, PUT, PATCH, DELETE</p>
      <form onSubmit={addStudent}>
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Student name"
          aria-label="Student name"
          required
        />
        <input
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          placeholder="Course"
          aria-label="Course"
          required
        />
        <button type="submit">POST Add student</button>
      </form>

      {error && <p role="alert">{error}</p>}
      <button type="button" onClick={loadStudents}>GET Refresh list</button>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            <strong>{student.name}</strong> · {student.course}{" "}
            <button type="button" onClick={() => replaceStudent(student)}>
              PUT Replace
            </button>{" "}
            <button type="button" onClick={() => patchCourse(student)}>
              PATCH Course
            </button>{" "}
            <button type="button" onClick={() => deleteStudent(student.id)}>
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}