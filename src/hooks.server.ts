import type { Handle } from '@sveltejs/kit';
import { sequence } from '@sveltejs/kit/hooks';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '$env/static/private';

if (!GOOGLE_CLIENT_ID) {
	throw new Error('Missing GOOGLE_CLIENT_ID in .env');
}

if (!GOOGLE_CLIENT_SECRET) {
	throw new Error('Missing GOOGLE_CLIENT_SECRET in .env');
}

// TODO: move this to a shared file
const prisma = new PrismaClient();

const handleAuth = SvelteKitAuth({
	// @ts-ignore
	adapter: PrismaAdapter(prisma),
	providers: [
		// @ts-ignore
		Google({
			clientId: GOOGLE_CLIENT_ID,
			clientSecret: GOOGLE_CLIENT_SECRET
		})
	]
}) satisfies Handle;

export const handle = sequence(handleAuth);
