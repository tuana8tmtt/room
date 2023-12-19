import { Breadcrumb, Input, InputRef, Layout, Space } from 'antd'
import { Content } from 'antd/lib/layout/layout'
import React, { useEffect, useRef, useState } from 'react'
import { Table } from 'antd'
import { Typography } from 'antd';
import { Button, Radio } from 'antd';
import { NavLink } from 'react-router-dom';
import { ProductType } from '../../types/product';
import swal from 'sweetalert';
import { listroom, remove } from '../../../api/product';
import Swal from 'sweetalert2';
import { Money } from '../../../utils/home';
import { SearchOutlined } from '@ant-design/icons';
import { ColumnType, FilterConfirmProps } from 'antd/lib/table/interface';
import Highlighter from 'react-highlight-words';





const { Title } = Typography;
type DataIndex = keyof any;


const ListProduct = () => {
    const [products, setProducts] = useState<ProductType[]>();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);

    const handleSearch = (
        selectedKeys: string[],
        confirm: (param?: FilterConfirmProps) => void,
        dataIndex: DataIndex,
    ) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: () => void) => {
        clearFilters();
        setSearchText('');
    };

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await listroom();
            setProducts(data);
        }
        getProducts();
    }, [])
    const handleRemove = async (id: string) => {
        swal({
            title: "Are you sure you want to delete?",
            text: "If deleted it will be gone forever",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        })
            .then((willDelete) => {
                if (willDelete) {
                    remove(id)
                    swal("Delete Successfully", {
                        icon: "success",
                    })
                        .then(() => setProducts(products?.filter(item => item._id !== id)));
                } else {
                    swal("Cancel Successfully");
                }
            });
    }
    const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<any> => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({ closeDropdown: false });
                            setSearchText((selectedKeys as string[])[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: boolean) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes((value as string).toLowerCase()),
        onFilterDropdownOpenChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    
    const columns = [
        { title: 'STT', dataIndex: 'stt', key: 'stt' },
        { title: 'Image', dataIndex: 'image', key: 'image' },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (recore: any) => (Money(recore))
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
            ...getColumnSearchProps('address'),
            render: (recore: any) => (recore)
        },
        { title: 'Desc', dataIndex: 'desc', key: 'category' },

        {
            title: 'Action',
            dataIndex: '',
            key: 'action',
            render: (recore: any) => (
                <Space size="middle">
                    <NavLink className={"btn btn-info"} to={'/admin/room/view/' + recore.id}>View</NavLink>
                    <button className='btn btn-danger' onClick={() => handleRemove(recore.id)}>Remove</button>
                </Space>
            )
        },
    ];
    const data = products?.map((product, index) => {
        return {
            stt: index + 1,
            image: <img src={product.image} alt="" width="100px" />,
            name: product.name,
            price: product.price,
            desc: product.desc,
            address: product.address,
            id: product._id
        }
    })

    return (
        <div>
            <Layout style={{ padding: '0 24px 24px', minHeight: '100vh', maxHeight: '900vh' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>Room</Breadcrumb.Item>
                </Breadcrumb>

                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>
                    <div style={{ minHeight: 460, padding: 24 }}>
                        <div style={{ float: 'right' }}>
                            <Button><NavLink to='add'>Add Room</NavLink></Button>
                        </div>
                        <Title level={2}>List Room</Title>
                        <Table columns={columns} dataSource={data} />
                    </div>
                </Content>
            </Layout>
        </div>
    )
}

export default ListProduct