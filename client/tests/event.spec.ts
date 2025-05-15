import { test, expect } from '@playwright/test';

// Timestamp use to generate title
function getTimestamp() {
  const now = new Date();
  return now.toISOString().replace('T', ' ').substring(0, 19);
}

function getDate() {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return tomorrow.toLocaleDateString('fr-FR'); // Ex: "15/05/2025"
}

// Function to format date to ISO
function formatDateForInput(date: string) {
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`; // Format "YYYY-MM-DD"
}

function getStartTime() {
  const now = new Date();
  return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }); // Ex: "10:30"
}

function getEndTime() {
  const now = new Date();
  now.setHours(now.getHours() + 1);
  return now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', hour12: false }); // Ex: "11:30"
}

// Delete special characters from the date
function cleanTime(time: string) {
  return time.replace(/[^0-9]/g, '');
}

// All const use in the test
const timestamp = getTimestamp();
const eventTitle = `Événement de test - ${timestamp}`;
const eventTitleModify = `Événement modifié de test - ${timestamp}`;
const eventTitleSubscribe = `Inscription à événement - ${timestamp}`;
const eventDescription = `Description de test - ${timestamp}`;
const eventDescriptionSubscribe = `Description de test pour l'inscription - ${timestamp}`;
const eventDate = getDate();
const startTime = getStartTime();
const endTime = getEndTime();

// -- BEGIN OF THE TEST --
test('Create an event', async ({ page }) => {
  // Login step
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('jane@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  // Add new event
  await page.getByText('+ Ajouter un évènement').click();
  // Fields of the event
  await page.locator('#textInput-title').fill(eventTitle);
  await page.getByText('+ Ajouter une étiquette').click();
  await page.locator('#services').selectOption('1');
  await page.getByRole('button', { name: 'Valider', exact: true }).click();
  // Fill date with format ISO (YYYY-MM-DD) required by input[type="date"]
  const dateInput = page.locator('input[name="date"]');
  await dateInput.fill(formatDateForInput(eventDate));
  const startTimeInput = page.locator('input[name="startTime"]');
  await startTimeInput.click();
  await startTimeInput.pressSequentially(cleanTime(startTime));
  const endTimeInput = page.locator('input[name="endTime"]');
  await endTimeInput.click();
  await endTimeInput.pressSequentially(cleanTime(endTime));
  await page.locator('#textInput-description').fill(eventDescription);
  await page.locator('input[name="price"]').fill('35');
  await page.locator('input[name="groupMaxSize"]').fill('7');
  await page.locator('input[name="postal_code"]').fill('33000');
  await page.locator('input[name="city"]').fill('Bordeaux');
  // Confirm creation of the event after the modal dialog open
  await page.getByRole('button', { name: "Créer l'évènement" }).click();
  await page.getByRole('button', { name: "Confirmer la création" }).click();
  // Toast alert to confirm the creation
  await expect(page.locator('.Toastify__toast')).toHaveText(/L'évènement a été créé avec succès/);
});

// Modify an event
test('Modify an event', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('jane@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  // Searching the test event in the Planning view
  await page.locator('.fc-event').filter({ hasText: 'Événement de test' }).first().click();
  await page.getByRole('button', { name: "Modifier l'événement" }).click();
  // Replace text to generate modifications
  await page.locator('#textInput-title').fill(eventTitleModify);
  // Confirm modification of the event after the modal dialog open
  await page.getByRole('button', { name: "Mettre à jour l'évènement" }).click();
  await page.getByRole('button', { name: "Confirmer la mise à jour" }).click();
  // Toast alert to confirm the modification
  await expect(page.locator('.Toastify__toast')).toHaveText(/L'évènement a été mis à jour avec succès/);
});

// Subscribe to an event
test('Subscribe my dog to an event', async ({ page }) => {
  // Creation of new event for testing the subscribe
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('jane@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByText('+ Ajouter un évènement').click();
  // Fields of the event
  await page.locator('#textInput-title').fill(eventTitleSubscribe);
  await page.getByText('+ Ajouter une étiquette').click();
  await page.locator('#services').selectOption('1');
  await page.getByRole('button', { name: 'Valider', exact: true }).click();
  const dateInput = page.locator('input[name="date"]');
  await dateInput.fill(formatDateForInput(eventDate));
  const startTimeInput = page.locator('input[name="startTime"]');
  await startTimeInput.click();
  await startTimeInput.pressSequentially(cleanTime(startTime));
  const endTimeInput = page.locator('input[name="endTime"]');
  await endTimeInput.click();
  await endTimeInput.pressSequentially(cleanTime(endTime));
  await page.locator('#textInput-description').fill(eventDescriptionSubscribe);
  await page.locator('input[name="price"]').fill('35');
  await page.locator('input[name="groupMaxSize"]').fill('7');
  await page.locator('input[name="postal_code"]').fill('33000');
  await page.locator('input[name="city"]').fill('Bordeaux');
  // Creation confirmation of the event 
  await page.getByRole('button', { name: "Créer l'évènement" }).click();
  await page.getByRole('button', { name: "Confirmer la création" }).click();
  // Toast alert to confirm the event creation
  await expect(page.locator('.Toastify__toast')).toHaveText(/L'évènement a été créé avec succès/);
  // Logout and login with the user owner John
  await page.locator('.dashSideBar__logout').first().click();
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('john@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  // Search the event
  await page.locator('ul.dashSideBar__list > li:nth-child(2)').click();
  await page.waitForLoadState('networkidle');
  await page.locator("#search-input").fill("Inscription à événement");
  await page.keyboard.press("Enter");
  await page.locator('.searchResultItem__event > .searchResultItem__event--title').filter({ hasText: 'Inscription à événement' }).first().click()
  // Subscribe to the event after the modal dialog open
  await page.getByRole('button', { name: "S'inscrire à l'événement" }).click();
  await page.locator('dialog:has-text("Avec quel chien souhaitez-vous participer à cet événement ?") select#selected').selectOption('Kobe');
  await page.getByRole('button', { name: "Confirmer l'inscription" }).click();
  // Toast alert to confirm the subscribe
  await expect(page.locator('.Toastify__toast')).toHaveText(/Inscription réussie à cet événement/);
});

// Unsubscribe of the previous event
test('Unsubscribe my dog to an event', async ({ page }) => {
  // Need to create the event on the previous test before continue
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('john@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  await page.locator('.fc-event').filter({ hasText: 'Inscription à événement' }).first().click();
  await page.getByRole('button', { name: "Se désinscrire de l'événement" }).click();
  await page.locator('dialog:has-text("Avec quel chien souhaitez-vous vous désinscrire de cet événement ?") select#selected').selectOption('Kobe');
  await page.getByRole('button', { name: "Confirmer la désinscription" }).click();
  await expect(page.locator('.Toastify__toast')).toHaveText(/Votre désinscription a été prise en compte/);
});

// Delete an event
test('Delete an event', async ({ page }) => {
  await page.goto('http://localhost:4200/login');
  await page.locator('#textInput-email').fill('jane@example.com');
  await page.locator('#textInput-password').fill('C@niche22');
  await page.getByRole('button', { name: 'Me connecter' }).click();
  await page.waitForLoadState('networkidle');
  // Searching the test event in the Planning view
  await page.locator('.fc-event').filter({ hasText: 'Événement modifié de test' }).first().click();
  await page.getByRole('button', { name: "Supprimer l'événement" }).click();
  // Confirmation delete of the event after the modal dialog open
  await expect(page.locator('.modal__prompt')).toContainText('Êtes-vous sûr de vouloir supprimer cet événement ?');
  await page.locator('.modal__btn--confirm').filter({ hasText: "Supprimer l'événement" }).click();
  // Toast alert to confirm the delete
  await expect(page.locator('.Toastify__toast')).toHaveText(/L'événement a été supprimé avec succès/);
});

// -- END OF THE TEST --
