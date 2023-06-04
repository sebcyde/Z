import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

type Props = {
	ExtraClass?: string;
	LoadingText?: string;
};

function LoadingScreen({ ExtraClass, LoadingText }: Props) {
	return (
		<div
			className={`page flex justcenter justcolumn aligncenter ${ExtraClass}`}
		>
			<FadeLoader color={'rgb(194, 87, 0)'} aria-label="Loading Spinner" />
			{LoadingText ? <p className="margin-top-20">{LoadingText}</p> : ''}
		</div>
	);
}

export default LoadingScreen;
