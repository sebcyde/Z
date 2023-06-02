import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

type Props = {};

const AdminPage = (props: Props) => {
	const AdminData = useSelector((state: any) => state.AdminDataState);

	useEffect(() => {
		console.log('Admin Panel:', AdminData.AdminData);
	}, []);

	return <div style={{textAlign:'center'}}>{JSON.stringify(AdminData.AdminData)}</div>;
};

export default AdminPage;
