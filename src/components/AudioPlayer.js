/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom"
import Slider from 'react-rangeslider'
import Visualizer from "../components/Visualizer";

// To include the default styles
import 'react-rangeslider/lib/index.css'

import BackButtonIcon from "../assets/back-button.svg";
import PauseButtonIcon from "../assets/pause.svg";
import PlayButtonIcon from "../assets/play.svg";
import ForwardButtonIcon from "../assets/forward-button.svg";
import ShareButtonIcon from "../assets/share.svg";


import "../styles/_audio-player.scss";

const BackButton = (props) => {
	return (
		<span className="back button" onClick={props.action}>
			<img src={BackButtonIcon} alt="back 10 seconds"></img>
		</span>
	);
};

const PauseButton = (props) => {
	return (
		<span className="pause button" onClick={props.action}>
			<img
				src={props.audioPaused ? PlayButtonIcon : PauseButtonIcon}
				alt="back 10 seconds"
			></img>
		</span>
	);
};

const ForwardButton = (props) => {
	return (
		<span className="forward button" onClick={props.action}>
			<img src={ForwardButtonIcon} alt="back 10 seconds"></img>
		</span>
	);
};

const ShareButton = (props) => {
	return (
		<span className="share button" onClick={props.action}>
			<img src={ShareButtonIcon} alt="Share"></img>
		</span>
	);
};

export default (props) => {
	const audioRef = useRef();
	const gainRef = useRef();
	const volRef = useRef();
	const shareLinkRef = useRef();
	const [analyzer, setAnalyzer] = useState(null);
	const [audioPaused, setAudioPaused] = useState(false);
	const [showShareBox, setShowShareBox] = useState(false);
	const [gain, setGain] = useState(1)
	const location = useLocation()

	useEffect(() => {
		const audioContext = plugAudio();
		return () => {
			audioContext.close();
		};
	}, []);

	useEffect(() => {
		if (gainRef.current) {
			gainRef.current.gain.value = gain;
		}
	}, [gain])

	function plugAudio() {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioContext = new AudioContext();

		const analyzer = audioContext.createAnalyser();
		analyzer.fftSize = 32;

		const track = audioContext.createMediaElementSource(audioRef.current);
		const gainNode = audioContext.createGain();
		track.connect(gainNode).connect(analyzer).connect(audioContext.destination);
		gainRef.current = gainNode;

		// volRef.current.addEventListener(
		// 	"input",
		// 	function () {
		// 		gainNode.gain.value = this.value;
		// 	},
		// 	false
		// );
		setAnalyzer(analyzer);
		return audioContext;
	}

	function play() {
		audioRef.current.play();
		setAudioPaused(false);
	}

	function pause() {
		audioRef.current.pause();
		setAudioPaused(true);
	}

	function rewind() {
		audioRef.current.currentTime = Math.max(
			audioRef.current.currentTime - 10,
			0
		);
	}

	function forward() {
		audioRef.current.currentTime = Math.min(
			audioRef.current.currentTime + 10,
			audioRef.current.duration
		);
	}

	function selectShareText() {
    const node = shareLinkRef.current;

    if (document.body.createTextRange) {
			const range = document.body.createTextRange();
			range.moveToElementText(node);
			range.select();
    } else if (window.getSelection) {
			const selection = window.getSelection();
			const range = document.createRange();
			range.selectNodeContents(node);
			selection.removeAllRanges();
			selection.addRange(range);
    } else {
			console.warn("Could not select text in node: Unsupported browser.");
    }
	}

	function onGainChange(val) {
		setGain(val)
	}

	return (
		<div className="audioPlayer">
			{/*analyzer && <Visualizer analyzer={analyzer} audioPaused={audioPaused} />*/}
			{analyzer && <Visualizer analyzer={analyzer} />}
			<div className="controls">
				<div className="audioControls">
					<BackButton action={rewind} />
					<PauseButton
						audioPaused={audioPaused}
						action={audioPaused ? play : pause}
					/>
					<ForwardButton action={forward} />
				</div>
				<ShareButton action={() => {
					if (!showShareBox) { selectShareText() }
					setShowShareBox(current => !current)
				}} />
			</div>
			<div ref={shareLinkRef} className="share-box" style={{display: showShareBox ? 'block' : 'none'}}>
				{ window.location.origin + location.pathname + location.search }
			</div>
			<audio
				ref={audioRef}
				{...props}
				controls={false}
				crossOrigin="anonymous"
				autoplay="true"
			></audio>
			<Slider
				min={0}
				max={10}
				step={0.1}
				value={gain}
				tooltip={false}
				orientation='horizontal'
				onChange={onGainChange}
			/>
		</div>
	);
};
