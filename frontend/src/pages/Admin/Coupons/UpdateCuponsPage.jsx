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
    Spin,
    InputNumber
} from 'antd';
import {
    useNavigate,
    useParams
} from 'react-router-dom';
import MetaDecorator from "../../../components/utils/MetaDecorator/MetaDecorator.jsx";
import axios from "axios";

const UpdateCouponPage = () => {
    const ApiURI = import.meta.env.VITE_BASE_URL;
    const [form] = Form.useForm();
    const {guid} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [couponName, setCouponName] = useState('');

    const fetchCouponDetail = useCallback(async (guid) => {
        try {
            setLoading(true);
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/coupons/${guid}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if (response.data.status) {
                const data = response.data.data;
                form.setFieldsValue({
                    code: data.code,
                    discount_percent: data.discount_percent
                });
                setCouponName(data.name);
            } else {
                message.error('Kupon getirilirken bir sorun oluştu.');
            }
            setLoading(false);
        } catch (e) {
            if(e.status === 404) {
                message.error('Kupon bulunamadı.');
                setTimeout(() => {
                    navigate('/admin/coupons');
                },1000);
            } else {
                message.error(e.response.data.message);
                console.log(e);
                setLoading(false);
            }
        }
    }, [ApiURI]);

    useEffect(() => {
        fetchCouponDetail(guid);
    }, [fetchCouponDetail]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/coupons/update/${guid}`,
                values,
                {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if (response.data.status) {
                message.success('Kupon başarıyla güncellendi.');
                const data = response.data.data;
                form.setFieldsValue({
                    name: data.code,
                    discount_percent: data.discount_percent
                })
            } else {
                message.error('Kupon güncellenirken bir sorun oluştu.');
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
                title={`Admin Panel Kupon Güncelleme - ${couponName}`}
                description={`${couponName} adlı kupon güncelleme sayfasıdır.`}
            />
            <Card
                title="Kupon Güncelle"
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
                                message: 'Lütfen kupon codu giriniz!',
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
                                message: 'Lütfen indirim oranı giriniz!',
                            },
                        ]}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Güncelle
                    </Button>
                </Form>
            </Card>
        </Spin>
    )
}

export default UpdateCouponPage;