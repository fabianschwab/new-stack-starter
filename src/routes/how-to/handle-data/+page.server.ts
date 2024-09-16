import type { PageServerLoad } from './$types';
import { Kudos } from '$lib/server/schema';
import { db } from '$lib/server/database';
export const load: PageServerLoad = async () => {

	const kudos = await db.select().from(Kudos);

	return {  kudos };
};

