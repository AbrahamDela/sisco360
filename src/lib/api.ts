import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export async function getPostSlugs() {
  const postsDirectory = path.join(contentDirectory, 'posts');
  if (!fs.existsSync(postsDirectory)) return [];
  return fs.readdirSync(postsDirectory);
}

export async function getPostBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(contentDirectory, 'posts', `${realSlug}.md`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Convert markdown to HTML if requested
  let contentHtml = '';
  if (fields.includes('content')) {
    const processedContent = await remark().use(html).process(content);
    contentHtml = processedContent.toString();
  }


  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug;
    }
    if (field === 'content') {
      items[field] = contentHtml;
    }
    if (typeof data[field] !== 'undefined') {
      items[field] = data[field];
    }
  });

  return items;
}

export async function getAllPosts(fields: string[] = []): Promise<any[]> {
  const slugs = await getPostSlugs();
  const posts = await Promise.all(slugs.map((slug) => getPostBySlug(slug, fields)));
  // sort posts by date in descending order
  // @ts-ignore
  return posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}

// Products
export async function getAllProducts(): Promise<any[]> {
  const productsDirectory = path.join(contentDirectory, 'products');
  if (!fs.existsSync(productsDirectory)) return [];

  const filenames = fs.readdirSync(productsDirectory);

  const products = filenames.map((filename) => {
    const filePath = path.join(productsDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return {
      slug,
      ...data
    };
  });

  return products;
}

export async function getProductBySlug(slug: string): Promise<any> {
  const fullPath = path.join(contentDirectory, 'products', `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    slug,
    contentHtml,
    ...data
  };
}

// Packages
export async function getAllPackages(): Promise<any[]> {
  const packagesDirectory = path.join(contentDirectory, 'packages');
  if (!fs.existsSync(packagesDirectory)) return [];

  const filenames = fs.readdirSync(packagesDirectory);

  const packages = filenames.map((filename) => {
    const filePath = path.join(packagesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const slug = filename.replace(/\.md$/, '');
    return {
      slug,
      content, // Start with raw content
      ...data
    };
  });

  return packages;
}

// Page Content (Home, etc)
export async function getPageContent(pageName: string): Promise<any> {
  const fullPath = path.join(contentDirectory, 'pages', `${pageName}.md`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    ...data,
    contentHtml
  };
}

// Contact Settings
export async function getContactSettings(): Promise<any> {
  const fullPath = path.join(contentDirectory, 'settings', 'contact.json');
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(fileContents);
}
