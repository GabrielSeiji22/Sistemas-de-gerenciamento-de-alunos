const students = [];

export function validateStudent(student = {}) {
  const errors = {};
  const name = String(student.name ?? '').trim();
  const course = String(student.course ?? '').trim();
  const email = String(student.email ?? '').trim();
  const age = Number(student.age);

  if (!name || name.length < 2) {
    errors.name = 'Nome deve ter pelo menos 2 caracteres.';
  }

  if (!course) {
    errors.course = 'Curso é obrigatório.';
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'E-mail inválido.';
  }

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    errors.age = 'Idade deve estar entre 1 e 120 anos.';
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
  };
}

export function listStudents() {
  return [...students];
}

export function addStudent(student) {
  const validation = validateStudent(student);

  if (!validation.ok) {
    return {
      ok: false,
      errors: validation.errors,
    };
  }

  const newStudent = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    name: String(student.name).trim(),
    email: String(student.email).trim(),
    course: String(student.course).trim(),
    age: Number(student.age),
  };

  students.push(newStudent);

  return {
    ok: true,
    student: newStudent,
    students: listStudents(),
  };
}
