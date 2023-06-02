import DefaultBG from '../../../public/GreyGradientSquare.jpg';

type props = {
	Layer: string;
	ImageSource?: string;
};

export const ListStackImage = ({ Layer, ImageSource = DefaultBG }: props) => {
	let StackLayer = '';

	switch (Layer) {
		case 'Top':
			StackLayer = 'StackTop';
			break;
		case 'Middle':
			StackLayer = 'StackMiddle';
			break;
		case 'Bottom':
			StackLayer = 'StackBottom';
			break;
		default:
			break;
	}

	return <img className={StackLayer} src={ImageSource} />;
};
