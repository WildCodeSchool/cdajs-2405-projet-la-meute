export function safeEmail(email: string | undefined) {
	if (email?.startsWith("xxx") && email?.endsWith("@xxx.xx")) {
		return "[adresse supprimée]";
	}
	return email?.toLowerCase();
}
