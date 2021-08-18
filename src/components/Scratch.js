/* eslint-disable import/no-anonymous-default-export */
import AudioPlayer from "../components/AudioPlayer";

export default () => {
	return (
		<div className="aemp-infowindow">
			<span className="aemp-infowindow-close">×</span>
			<div>
				<AudioPlayer
					controls={true}
					src={"/assets/audio/test-oral-history.mp3"}
				/>
			</div>
		</div>
	);
};
