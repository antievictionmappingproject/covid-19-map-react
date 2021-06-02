/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState, useRef } from "react";
import Visualizer from "../components/Visualizer";

import BackButtonIcon from "../assets/back-button.svg";
import PauseButtonIcon from "../assets/pause.svg";
import PlayButtonIcon from "../assets/play.svg";
import ForwardButtonIcon from "../assets/forward-button.svg";

import "../styles/_audio-player.scss";

const BackButton = (props) => {
	return (
		<span onClick={props.action}>
			<img src={BackButtonIcon} alt="back 10 seconds"></img>
		</span>
	);
};

const PauseButton = (props) => {
	return (
		<span onClick={props.action}>
			<img
				src={props.audioPaused ? PlayButtonIcon : PauseButtonIcon}
				alt="back 10 seconds"
			></img>
		</span>
	);
};

const ForwardButton = (props) => {
	return (
		<span onClick={props.action}>
			<img src={ForwardButtonIcon} alt="back 10 seconds"></img>
		</span>
	);
};

export default (props) => {
	const audioRef = useRef();
	const volRef = useRef();
	const [analyzer, setAnalyzer] = useState(null);
	const [audioPaused, setAudioPaused] = useState(true);

	useEffect(() => {
		const audioContext = plugAudio();
		return () => {
			audioContext.close();
		};
	}, []);

	function plugAudio() {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioContext = new AudioContext();

		const analyzer = audioContext.createAnalyser();
		analyzer.fftSize = 32;

		const track = audioContext.createMediaElementSource(audioRef.current);
		const gainNode = audioContext.createGain();
		track.connect(gainNode).connect(analyzer).connect(audioContext.destination);

		volRef.current.addEventListener(
			"input",
			function () {
				gainNode.gain.value = this.value;
			},
			false
		);
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

	return (
		<div className="audioPlayer">
			{analyzer && <Visualizer analyzer={analyzer} audioPaused={audioPaused} />}
			<div className="audioControls">
				<BackButton action={rewind} />
				<PauseButton
					audioPaused={audioPaused}
					action={audioPaused ? play : pause}
				/>
				<ForwardButton action={forward} />
			</div>
			<audio
				ref={audioRef}
				{...props}
				controls={false}
				crossOrigin="anonymous"
			></audio>
			<input
				ref={volRef}
				type="range"
				id="volume"
				min="0"
				max="5"
				defaultValue="1"
				step="0.01"
			></input>
		</div>
	);
};
