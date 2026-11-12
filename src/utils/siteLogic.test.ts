import test from 'node:test';
import assert from 'node:assert/strict';
import { parseRouteFromHash, getPageTitle, validateContactForm, getPostBySlug } from './siteLogic';

test('parseRouteFromHash handles default, empty, and paths correctly', () => {
  assert.equal(parseRouteFromHash(''), 'home');
  assert.equal(parseRouteFromHash('#/'), 'home');
  assert.equal(parseRouteFromHash('#home'), 'home');
  assert.equal(parseRouteFromHash('#about'), 'about');
  assert.equal(parseRouteFromHash('#/about/'), 'about');
  assert.equal(parseRouteFromHash('#blog'), 'blog');
  assert.equal(parseRouteFromHash('#contact'), 'contact');
  assert.equal(parseRouteFromHash('#sketchbook-journey'), 'sketchbook-journey');
  assert.equal(parseRouteFromHash('#statforge-aiml'), 'statforge-aiml');
  assert.equal(parseRouteFromHash('#unknown-random-route'), 'home');
});

test('getPageTitle matches Chyavan Rohan document titles', () => {
  assert.equal(getPageTitle('home'), 'Home - Chyavan Rohan');
  assert.equal(getPageTitle('about'), 'About - Chyavan Rohan');
  assert.equal(getPageTitle('blog'), 'Showcase - Chyavan Rohan');
  assert.equal(getPageTitle('contact'), 'Contact - Chyavan Rohan');
  assert.equal(getPageTitle('sketchbook-journey'), 'My Sketchbook Journey - Chyavan Rohan');
  assert.equal(getPageTitle('statforge-aiml'), 'StatForge & AIML Lab - Chyavan Rohan');
});

test('validateContactForm checks required fields and email format', () => {
  const emptyRes = validateContactForm({ name: '', email: '', message: '' });
  assert.equal(emptyRes.isValid, false);
  assert.equal(emptyRes.errors.name, 'This field is required.');
  assert.equal(emptyRes.errors.email, 'This field is required.');

  const invalidEmailRes = validateContactForm({ name: 'Chyavan', email: 'not-an-email', message: 'Hello' });
  assert.equal(invalidEmailRes.isValid, false);
  assert.equal(invalidEmailRes.errors.email, 'Please enter a valid email address.');

  const validRes = validateContactForm({ name: 'Chyavan', email: 'chyavanrohan@gmail.com', message: 'Hi there!' });
  assert.equal(validRes.isValid, true);
  assert.deepEqual(validRes.errors, {});
});

test('getPostBySlug retrieves existing post and returns null for invalid slug', () => {
  const post1 = getPostBySlug('sketchbook-journey');
  assert.ok(post1);
  assert.equal(post1?.title, 'My Sketchbook Journey & Drawing Studies');

  const post2 = getPostBySlug('statforge-aiml');
  assert.ok(post2);
  assert.equal(post2?.title, 'Python Codes & AIML Lab: University Projects');

  const invalid = getPostBySlug('non-existent');
  assert.equal(invalid, null);
});
