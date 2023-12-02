import React from 'react'
import { Menu, Button, Layout } from 'antd';
import { ContainerOutlined, CreditCardOutlined, DashboardOutlined, DesktopOutlined, HomeOutlined, LogoutOutlined, ShoppingCartOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { NavLink, useNavigate } from 'react-router-dom';



type Props = {
	onLogout: () => void

}
const NavAdmin = ({ onLogout }: Props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/home");
		onLogout();

	}
	return (
		<div>
			<Layout>
				<Menu theme='dark' defaultSelectedKeys={['Dasboard']} mode='inline'>
					<Menu.Item key={'Dasboard'} icon={<DashboardOutlined />}>
						<NavLink className="nav-link active" aria-current="page" to="">Dashboard</NavLink>
					</Menu.Item>
					<Menu.Item key={'Contract'} icon={<ContainerOutlined />}>
						<NavLink className="nav-link" to='contract'>Contract</NavLink>
					</Menu.Item>
					<Menu.Item key={'Product'} icon={<HomeOutlined />}>
						<NavLink className="nav-link" to='room'>Room</NavLink>
					</Menu.Item>
					<Menu.Item key={'Expense'} icon={<CreditCardOutlined />}>
						<NavLink className="nav-link" to='expense'>Expense</NavLink>
					</Menu.Item>
					<Menu.Item key={'Device'} icon={<DesktopOutlined />}>
						<NavLink className="nav-link" to='device'>Device</NavLink>
					</Menu.Item>
					<Menu.Item
						icon={<LogoutOutlined />}
						title=""
						style={{
							position: 'absolute',
							bottom: 0,
							zIndex: 1,
							marginBottom: '80px'
						}}
						onClick={() => handleLogout()} key="/logout"
					>
						<span>Log Out</span>
						<NavLink to='/signin' />
					</Menu.Item>
				</Menu>
			</Layout>
		</div>
	)
}

export default NavAdmin