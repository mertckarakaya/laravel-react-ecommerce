import { useState} from 'react';
import { Button, Form, Input, Card, message, Spin, InputNumber } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";

const CreateCouponPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/coupons/create`,
                values,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    }
                });
            if (response.data.status) {
                message.success('Kupon başarıyla eklendi.');
                const data = response.data.data;
                setTimeout(() => {
                    navigate(`/admin/coupons/${data.guid}`);
                }, 5000);
            } else {
                message.error('Kupon eklenirken bir sorun oluştu.');
            }
        } catch (e) {
            message.error(e.response.data.message);
            console.log(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Spin spinning={loading}>
            <MetaDecorator
                title="Admin Panel Kupon Ekleme"
                description="Admin Panel Kupon Ekleme sayfasıdır."
            />
            <Card
                title="Kupon Ekle"
                extra={
                <Button
                    type="primary"
                    onClick={() => navigate('/admin/coupons')}
                >
                    Geri Dön
                </Button>
            }
            >
                <Form
                    name="basic"
                    layout="vertical"
                    autoComplete="off"
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="Kupon Kodu"
                        name="code"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen kupon kodu giriniz!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="İndirim Oranı"
                        name="discount_percent"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen indirim oranını giriniz!',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ekle
                    </Button>
                </Form>
            </Card>
        </Spin>
    )
}

export default CreateCouponPage;