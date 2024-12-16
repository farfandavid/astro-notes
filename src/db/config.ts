import { asDrizzleTable } from '@astrojs/db/utils';
import { Notes } from '../../db/config';

export const safeNotes = asDrizzleTable('Notes', Notes);