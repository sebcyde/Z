import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import ChatsList from '../../Components/Messages/ChatsList';

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
			<ChatsList />
		</div>
	);
}

export default AllChats;
