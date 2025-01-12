import {useCallback, useEffect, useState} from "react";
import {Button, message, Table, Popconfirm, Space} from "antd";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";

const CouponPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const apiURL = import.meta.env.VITE_BASE_URL;
    const fetchCoupons = useCallback(async () => {
        setLoading(true)
        try {
            const response = await axios.get(`${apiURL}/coupons`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if(response.data.status) {
                console.log(response.data);

                setDataSource(response.data.data);

            } else {
                message.error('Kuponlar getirilirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        } finally {
            setLoading(false)
        }
    }, [apiURL])
    useEffect(() => {
        fetchCoupons();
    }, [fetchCoupons]);

    const deleteCoupon = async (guid) => {
        try {
            const response = await axios.delete(`${apiURL}/coupons/delete/${guid}`,{
                headers: {
                    Accept :'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if(response.data.status) {
                fetchCoupons();
            } else {
                message.error('Kupon silinirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        }
    }

    const columns = [
        {
            title: 'Kupon Kodu',
            dataIndex: 'code',
            key: 'code',
            render: (code) => <b>{code}</b>
        },
        {
            title: 'İndirim Oranı',
            dataIndex: 'discount_percent',
            key: 'discount_percent',
            render: (text) => <>% {text}</>
        },
        {
            title: 'İşlemler',
            dataIndex: 'actions',
            key: 'actions',
            render: (_, record) => (
                <Space size={"middle"}>
                    <Button type="primary" onClick={() => navigate(`/admin/coupons/${record.guid}`)}>
                        Düzenle
                    </Button>
                    <Popconfirm
                        title="Kuponu Sil"
                        description="Kuponu silmek istediğinize emin misiniz?"
                        okText="Evet"
                        cancelText="Hayır"
                        onConfirm={() => deleteCoupon(record.guid)}
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
                title="Admin Panel Kupon Listesi"
                description="Admin Panel Kupon liste sayfasıdır."
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

export default CouponPage;
