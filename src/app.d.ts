/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
	// preserve any customizations you have here
	namespace App {
		// interface Error {}
		interface Locals {
			supabase: SupabaseClient<Database>;
			getSession(): Promise<Session | null>;
		}
		interface LayoutData {
			session: Session | null;
			user: Record<string, any> | undefined;
		}
		interface PageData {
			session: Session | null;
			user: Record<string, any> | undefined;
		}
		// interface Platform {}
	}

	// add these lines
	interface ViewTransition {
		updateCallbackDone: Promise<void>;
		ready: Promise<void>;
		finished: Promise<void>;
		skipTransition: () => void;
	}

	interface Document {
		startViewTransition(updateCallback: () => Promise<void>): ViewTransition;
	}
}

export {};
