import test from 'node:test';
import assert from 'node:assert/strict';

import { validateStudent } from './studentService.js';

test('valida nome, email, idade e curso corretamente', () => {
  assert.deepEqual(validateStudent({
    name: 'Maria Silva',
    email: 'maria@email.com',
    course: 'ADS',
    age: 21,
  }), { ok: true, errors: {} });

  const result = validateStudent({
    name: 'A',
    email: 'email-invalido',
    course: '',
    age: 0,
  });

  assert.equal(result.ok, false);
  assert.match(result.errors.name, /pelo menos 2/i);
  assert.match(result.errors.email, /inválido|válido/i);
  assert.match(result.errors.course, /obrigatório/i);
  assert.match(result.errors.age, /entre 1 e 120/i);
});
