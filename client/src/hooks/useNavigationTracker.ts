import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export default function useNavigationTracker() {
	const [clickCount, setClickCount] = useState(0);
	const prevPath = useRef<string | null>(null);
	const location = useLocation();

	useEffect(() => {
		if (prevPath.current === null && location.pathname !== "/login") {
			const isInitialVisit =
				location.pathname !== "/trainer" && location.pathname !== "/owner";

			if (isInitialVisit) {
				setClickCount(1);
			}
		} else if (prevPath.current && prevPath.current !== location.pathname) {
			setClickCount((prev) => {
				const newCount = prev + 1;
				return newCount;
			});
		}
		prevPath.current = location.pathname;
	}, [location.pathname]);

	// Reset counter when logout
	const resetClickCount = () => {
		setClickCount(0);
		prevPath.current = null;
	};

	return { clickCount, resetClickCount };
}
