import React, { useEffect, useState } from 'react'
import { AutoComplete, Input, SelectProps, Typography } from 'antd';
import { Avatar } from 'antd';
import { BellOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';
import { AudioOutlined } from '@ant-design/icons';
import Search, { SearchProps } from 'antd/lib/input/Search';
import { NavLink, useNavigate } from 'react-router-dom';
import './header.css'
import { list } from '../../api/service';

const { Title } = Typography;

type Props = {}

const HeaderAdmin = (props: Props) => {
	// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value);
	const [isBoxVisible, setBoxVisible] = useState(false);
	const [service, setService] = useState<any>();

	const handleBellClick = () => {
		setBoxVisible((prevVisible) => !prevVisible);
	};
	const boxStyles = {
		height: isBoxVisible ? 'auto' : '0px',
		opacity: isBoxVisible ? '1' : '0',
	};
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0.0);
	const [options, setOptions] = useState([]);
	const [inputValue, setInputValue] = useState('');

	const { user } = JSON.parse(localStorage.getItem('user') as string)

	const onSearch = async (val) => {
		try {
			const { data } = await list(); // Assuming list() returns the entire data
			setService(data);

			let filtered = data?.filter(
				(obj) =>
					obj._id !== '' &&
					obj.name
						.toString()
						.toLowerCase()
						.includes(val)
			);

			// Map the filtered data to the format expected by AutoComplete
			const mappedOptions = filtered.map((item) => ({
				value: item.name, // You may need to adjust this depending on what you want to show
				label: item.name,
				id: item._id
			}));

			setOptions(mappedOptions);
		} catch (error) {
			console.error("Error fetching data:", error);
		}
	};
	const navigate = useNavigate()
	const onSelect = (val, option) => {
		setInputValue('');

		navigate(`/admin/device/view/${option.id}`)
	};

	const onInputChange = (value) => {
		setInputValue(value);
	};

	useEffect(() => {
		onSearch(""); // Fetch initial data
	}, []);
	return (
		<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Title style={{ color: 'white' }} level={3}>Apartment Management</Title>
			<AutoComplete
				options={options}
				onSelect={(val, option) => onSelect(val, option)}
				onSearch={onSearch}
				onChange={onInputChange}
				value={inputValue}

			>
				<Input placeholder="Search" prefix={<SearchOutlined />} style={{ width: '400px', borderRadius: '25px', height: '40px' }} />
			</AutoComplete>
			<div style={{ display: 'flex' }}>
				<div className="icon" id="bell" onClick={handleBellClick}><img src="https://i.imgur.com/AC7dgLA.png" alt="" /> </div>
				{isBoxVisible && (
					<div className="notifications" id="box" style={boxStyles} >
						<h2 >Notifications - <span>2</span></h2>
						<div className="notifications-item" >
							<div className="text">
								<h4>Wellcome</h4>
							</div>
						</div>
						<div className="notifications-item">
							<div className="text">
								<h4>Hi Admin</h4>
							</div>
						</div>
					</div>
				)}
				<NavLink to={'user/' + user._id}><Avatar style={{ float: 'right' }} icon={<UserOutlined />} /></NavLink>
			</div>
		</div>
	)
}

export default HeaderAdmin