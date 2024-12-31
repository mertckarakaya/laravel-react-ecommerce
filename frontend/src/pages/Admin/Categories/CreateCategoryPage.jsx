import { useState} from 'react';
import { Button, Form, Input, Card, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";

const CreateCategoryPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/categories/create`,
                values,
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    }
                });
            if (response.data.status) {
                message.success('Kategori başarıyla eklendi.');
                const data = response.data.data;
                console.log(data)
                setTimeout(() => {
                    navigate(`/admin/categories/${data.guid}`);
                }, 5000);
            } else {
                message.error('Kategori eklenirken bir sorun oluştu.');
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
                title="Admin Panel Kategori Ekleme"
                description="Admin Panel Kategori Ekleme sayfasıdır."
            />
            <Card
                title="Kategori Ekle"
                extra={
                <Button
                    type="primary"
                    onClick={() => navigate('/admin/categories')}
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
                        label="Kategori Adı"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen kategori adını giriniz!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Kategori Görseli (Link)"
                        name="img"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen kategori görselini (Link) giriniz!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ekle
                    </Button>
                </Form>
            </Card>
        </Spin>
    )
}

export default CreateCategoryPage;