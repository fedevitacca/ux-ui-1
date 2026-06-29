import { test, expect } from '@playwright/test';

// Flujo principal: registro/login en el Locker y creacion de un apunte.
// AJUSTAR los selectores (placeholder, roles, textos de boton) a lo que
// realmente renderiza tu pagina /locker.

test('el Locker exige sesion y permite crear un apunte', async ({ page }) => {
  const email = `test_${Date.now()}@bucks.test`;
  const password = 'Password123!';

  await page.goto('/locker');

  // Registro
  await page.getByRole('button', { name: /registr/i }).click();
  await page.getByPlaceholder(/email/i).fill(email);
  await page.getByPlaceholder(/contrase/i).fill(password);
  await page.getByRole('button', { name: /crear cuenta|registrar/i }).click();

  // Una vez dentro, deberia verse el formulario de apuntes
  await expect(page.getByRole('button', { name: /agregar|guardar|nuevo apunte/i })).toBeVisible();

  // Crear apunte
  const nota = 'Apunte de prueba E2E';
  await page.getByPlaceholder(/apunte|nota|escrib/i).fill(nota);
  await page.getByRole('button', { name: /agregar|guardar|nuevo apunte/i }).click();

  // El apunte aparece en la lista
  await expect(page.getByText(nota)).toBeVisible();
});
