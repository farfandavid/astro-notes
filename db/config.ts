import { column, defineDb, defineTable } from 'astro:db';

export const Notes = defineTable({
  columns: {
    id: column.text({
      primaryKey: true,
      unique: true,
      default: crypto.randomUUID(),
    }),
    title: column.text(),
    content: column.text(),
    createdAt: column.date({
      optional: true,
    }),
    updatedAt: column.date({
      optional: true,
    }),
  }
})

// https://astro.build/db/config
export default defineDb({
  tables: {
    Notes
  }
});
