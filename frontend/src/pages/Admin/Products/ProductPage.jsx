import {useCallback, useEffect, useState} from "react";
import {Button, message, Table, Popconfirm, Space} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";

const ProductPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_BASE_URL;
    const fetchProducts = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiURL}/products`,{
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
        fetchProducts();
    }, [fetchProducts]);

    const deleteCategory = async (guid) => {
        try {
            const response = await axios.delete(`${apiURL}/products/delete/${guid}`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if(response.data.status) {
                fetchProducts();

            } else {
                message.error('Ürünler silinirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Ürün Görseli',
            dataIndex: 'images',
            key: 'images',
            render : (imgSrc) => (
                <img src={imgSrc[0].image_path} alt="image" width={100} />
            )
        },
        {
            title: 'Adı',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <b>{text}</b>
        },
        {
            title: 'Kategory',
            dataIndex: 'category',
            key: 'category',
            render: (text) => <>{text.name}</>
        },
        {
            title: 'Fiyat',
            dataIndex: 'current_price',
            key: 'current_price',
        },
        {
            title: 'İndirim Oranı',
            dataIndex: 'discount_price',
            key: 'discount_price',
            render: (text) => <>% {text}</>
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size={"middle"}>
                    <Button type="primary" onClick={() => navigate(`/admin/products/${record.guid}`)}>
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
                title="Admin Panel Ürün Listesi"
                description="Admin Panel Ürün liste sayfasıdır."
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

export default ProductPage;
