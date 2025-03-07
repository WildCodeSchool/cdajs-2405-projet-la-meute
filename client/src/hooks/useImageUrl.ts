export const useImageUrl = (path: string) => {
	const pathname = window.location.toString();

	if (path?.startsWith("http")) {
		return path;
	}
	if (pathname.includes("staging")) {
		return `${import.meta.env.VITE_API_URL_STAGING || ""}${path}`;
	}
	if (pathname.includes("localhost")) {
		return `${import.meta.env.VITE_API_URL_DEV || ""}${path}`;
	}
	if (!pathname.includes("staging") && !pathname.includes("localhost")) {
		return `${import.meta.env.VITE_API_URL_PROD || ""}${path}`;
	}
};
