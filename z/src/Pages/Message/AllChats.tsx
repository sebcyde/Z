import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

function AllChats() {
	const navigate = useNavigate();

	const NewChatBanner = () => {
		return (
			<div className="NewChatBanner">
				<h4>All Chats</h4>
				<AddIcon onClick={() => navigate('/newchat')} />
			</div>
		);
	};

	return (
		<div className="AllChatsContainer">
			<NewChatBanner />
		</div>
	);
}

export default AllChats;
