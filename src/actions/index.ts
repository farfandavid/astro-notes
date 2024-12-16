import { ActionError, defineAction } from "astro:actions";
import { db, eq } from "astro:db";
import { z } from "astro:schema";
import { safeNotes } from "../db/config";

export const server = {
    createNote: defineAction({
        input: z.object({
            title: z.string().max(15, "Title should be less than 15 characters"),
            content: z.string().max(100, "Content should be less than 100 characters"),
        }),
        handler: async (input, context) => {
            try {

                await db.insert(safeNotes).values({
                    id: crypto.randomUUID(),
                    title: input.title,
                    content: input.content,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                });
                return 'Note added successfully!';
            } catch (error) {
                return new ActionError({
                    code: "BAD_REQUEST",
                    message: "Bad request",
                })
            }

        },
        accept: "form",
    }),
    readNotes: defineAction({
        handler: async () => {
            const notes = await db.select().from(safeNotes);
            //return new Error('Bad')
            return notes;
        }
    }),
    updateNote: defineAction({
        input: z.object({
            id: z.string(),
            title: z.string().max(15, "Title should be less than 15 characters"),
            content: z.string().max(100, "Content should be less than 100 characters"),
        }),
        handler: async (input) => {
            await db.update(safeNotes).set({
                title: input.title,
                content: input.content,
                updatedAt: new Date(),
            }).where(eq(safeNotes.id, input.id));
            return 'Note updated successfully!';
        },
        accept: "json",
    }),
    deleteNote: defineAction({
        input: z.object({
            id: z.string(),
        }),
        handler: async (input) => {
            await db.delete(safeNotes).where(eq(safeNotes.id, input.id));
            return 'Note deleted successfully!';
        }
    }),
}