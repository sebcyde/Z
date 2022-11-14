import styled from 'styled-components';

export const AnimeBaseContainer = styled.div`
	border-top: 1px solid #8d99ae;
	padding: 15px;
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;

	div {
		width: 70%;
		span {
			width: 70%;
			display: flex;
			justify-content: space-between;
			p {
				margin: 0px;
				width: fit-content;
			}
		}
	}

	img {
		object-fit: cover;
		width: 100px;
		height: 100px;
		overflow: hidden;
	}
`;
