import { redirect } from '@sveltejs/kit';
import { docs } from '../../lib/docs';

export const load = () => {
	const first = docs.find((d) => d.slug === 'getting-started') ?? docs[0];
	throw redirect(302, `/docs/${first.slug}`);
};
