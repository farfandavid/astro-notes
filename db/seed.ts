import { asDrizzleTable } from '@astrojs/db/utils';
import { db } from 'astro:db';
import { Notes } from './config';


const safeNotes = asDrizzleTable('Notes', Notes);
// https://astro.build/db/seed
export default async function seed() {
	// TODO
	await db.insert(safeNotes).values({
		createdAt: new Date(),
		updatedAt: new Date(),
		title: 'Hello, World!',
		content: 'Welcome to Astro!',
	})
}
