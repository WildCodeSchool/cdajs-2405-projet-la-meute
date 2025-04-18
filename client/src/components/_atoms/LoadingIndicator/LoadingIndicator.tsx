import "./LoadingIndicator.scss";
import { ThreeDot } from "react-loading-indicators";

function LoadingIndicator() {
	return (
		<section aria-busy="true" className="loadingIndicator">
			<ThreeDot color="#0a6375" size="medium" variant="bounce" />
		</section>
	);
}

export default LoadingIndicator;
