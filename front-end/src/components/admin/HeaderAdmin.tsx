import React from 'react'
import { Input, Typography } from 'antd';
import { Avatar } from 'antd';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import Search, { SearchProps } from 'antd/lib/input/Search';

const { Title } = Typography;

type Props = {}

const HeaderAdmin = (props: Props) => {
	// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);

	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Title style={{ color: 'white' }} level={3}>アパート管理</Title>
			<Input  placeholder="Search" prefix={<SearchOutlined /> } style={{width: '500px', borderRadius: '25px'}} />
			<Avatar style={{ float: 'right' }} icon={<UserOutlined />} />
		</div>
	)
}

export default HeaderAdmin