import {
    useCallback,
    useEffect,
    useState
} from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    message,
    Spin
} from 'antd';
import {
    useNavigate,
    useParams
} from 'react-router-dom';
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";
import axios from "axios";

const UpdateCategoryPage = () => {
    const API_URL = import.meta.env.VITE_BASE_URL;
    const [form] = Form.useForm();
    const {guid} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const fetchCategoryDetail = useCallback(async (guid) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/categories/${guid}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if (response.data.status) {
                const data = response.data.data;
                form.setFieldsValue({
                    name: data.name,
                    img: data.img
                });
                setCategoryName(data.name);
            } else {
                message.error('Kategori getirilirken bir sorun oluştu.');
            }
            setLoading(false);
        } catch (e) {
            if(e.status === 404) {
                message.error('Kategori bulunamadı.');
                setTimeout(() => {
                    navigate('/admin/categories');
                },1000);
            } else {
                message.error(e.response.data.message);
                console.log(e);
                setLoading(false);
            }
        }
    }, [API_URL]);

    useEffect(() => {
        fetchCategoryDetail(guid);
    }, [fetchCategoryDetail]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/categories/update/${guid}`,
                values,
                {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if (response.data.status) {
                message.success('Kategori başarıyla güncellendi.');
                const data = response.data.data;
                form.setFieldsValue({
                    name: data.name,
                    img: data.img
                })
            } else {
                message.error('Kategori güncellenirken bir sorun oluştu.');
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
                title={`Admin Panel Kategori Güncelleme - ${categoryName}`}
                description={`${categoryName} adlı kategory güncelleme sayfasıdır.`}
            />
            <Card
                title="Kategori Güncelle"
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
                        Güncelle
                    </Button>
                </Form>
            </Card>
        </Spin>
    )
}

export default UpdateCategoryPage;