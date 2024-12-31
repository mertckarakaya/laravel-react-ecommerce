import {useCallback, useEffect, useState} from "react";
import {Button, message, Table, Popconfirm, Space} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";

const CategoryPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_BASE_URL;
    const fetchCategories = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiURL}/categories`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if(response.data.status) {
                setDataSource(response.data.data);

            } else {
                message.error('Kategori getirilirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        } finally {
            setLoading(false)
        }
    }, [apiURL])
    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const deleteCategory = async (guid) => {
        try {
            const response = await axios.delete(`${apiURL}/categories/delete/${guid}`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if(response.data.status) {
                fetchCategories();

            } else {
                message.error('Kategori silinirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Kategori Görseli',
            dataIndex: 'img',
            key: 'img',
            render : (imgSrc) => (
                <img src={imgSrc} alt="image" width={100} />
            )
        },
        {
            title: 'Adı',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size={"middle"}>
                    <Button type="primary" onClick={() => navigate(`/admin/categories/${record.guid}`)}>
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Kategori Sil"
                        description="Kategori silmek istediğinize emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteCategory(record.guid)}
                    >
                        <Button type="primary" danger>Sil</Button>
                    </Popconfirm>
                </Space>
            )
        }
    ];
    return (
        <>
            <MetaDecorator
                title="Admin Panel Kategori Listesi"
                description="Admin Panel Kategori liste sayfasıdır."
            />
            <Table
                dataSource={dataSource}
                columns={columns}
                rowKey={(record) => record.guid}
                loading={loading}
            />
        </>
    )
}

export default CategoryPage;
