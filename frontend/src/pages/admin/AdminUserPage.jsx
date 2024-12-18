import {useCallback, useEffect, useState} from "react";
import {message, Table} from "antd";
import axios from "axios";
import MetaDecorator from "../../components/utils/MetaDecorator/MetaDecorator.jsx";

const AdminUserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const apiURL = import.meta.env.VITE_BASE_URL;
    const fetchUsers = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiURL}/users`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token').replace(/"/g, '')}`
                }
            });
            if(response.data.status) {
                setDataSource(response.data.data);

            } else {
                message.error('Kullanıcılar getirilirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        } finally {
            setLoading(false)
        }
    }, [apiURL])
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            key: 'avatar',
            render : (imgSrc) => (
                <img src={imgSrc} alt="Avatar" style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%"
                }} />
            )
        },
        {
            title: 'Kullanıcı Adı',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'E-Posta',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Rol',
            dataIndex: 'role',
            key: 'role',
        }
    ];
    return (
        <>
            <MetaDecorator
                title="Admin Panel Kullanıcı Listesi"
                description="Admin Panel Kullanıcı liste sayfasıdır."
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record.id}
                loading={loading}
            />
        </>
    )
}

export default AdminUserPage;
