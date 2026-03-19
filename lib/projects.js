export const DEFAULT_PROJECT_BACKGROUND = '#F7F7F7';

const HEX_COLOR_PATTERN = /^#(?:[0-9a-fA-F]{3}){1,2}$/;

export function slugifyCategory(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getProjectCategories(project = {}) {
  const explicitCategories = Array.isArray(project.categories)
    ? project.categories.map((category) => category?.trim()).filter(Boolean)
    : [];

  if (explicitCategories.length) {
    return explicitCategories;
  }

  return (project.job_type || '')
    .split(',')
    .map((category) => category.trim())
    .filter(Boolean);
}

export function getProjectBackgroundColor(project = {}) {
  return HEX_COLOR_PATTERN.test(project.backgroundColor || '')
    ? project.backgroundColor
    : DEFAULT_PROJECT_BACKGROUND;
}

export function getAllProjectCategorySlugs(projects = []) {
  return [...new Set(
    projects.flatMap((project) => getProjectCategories(project).map((category) => slugifyCategory(category))).filter(Boolean)
  )];
}

export function getCategoryLabel(projects = [], categorySlug = '') {
  const match = projects
    .flatMap((project) => getProjectCategories(project))
    .find((category) => slugifyCategory(category) === categorySlug);

  if (match) {
    return match;
  }

  return categorySlug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function filterProjectsByCategory(projects = [], categorySlug = '') {
  return projects.filter((project) =>
    getProjectCategories(project).some((category) => slugifyCategory(category) === categorySlug)
  );
}
