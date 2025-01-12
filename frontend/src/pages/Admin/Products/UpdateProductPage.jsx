import {useEffect, useState, useCallback} from 'react';
import {
    Button,
    Form,
    Input,
    Card,
    message,
    Spin,
    InputNumber,
    Select
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from 'react-quill';
import MetaDecorator from '../../../components/utils/MetaDecorator/MetaDecorator.jsx';
import 'react-quill/dist/quill.snow.css';

const CreateProductPage = () => {
    const apiURI = import.meta.env.VITE_BASE_URL;
    const params = useParams();
    const productGuid = params.guid;
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState('');

    const fetchProductDetail = useCallback(async (guid) => {
        try {
            setLoading(true);
            const response = await axios.get(`${apiURI}/products/${guid}`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                }
            });
            if (response.data.status) {
                const data = response.data.data;
                setProductName(data.name);
                form.setFieldsValue({
                    name: data.name,
                    category: data.category_guid,
                    current_price: data.current_price,
                    discount_price: data.discount_price,
                    description: data.description,
                    images: data.images.map(image => image.image_path).join('\n'),
                    colors: data.colors.map(color => color.hex_code).join('\n'),
                    sizes: data.sizes.map(size => size.size).join('\n')
                });
            } else {
                message.error('Ürün getirilirken bir sorun oluştu.');
            }
            setLoading(false);
        } catch (e) {
            if(e.status === 404) {
                message.error('Ürün bulunamadı.');
                setTimeout(() => {
                    navigate('/admin/products');
                },1000);
            } else {
                message.error(e.response.data.message);
                console.log(e);
                setLoading(false);
            }
        }
    }, [apiURI]);

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`${apiURI}/categories`, {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    }
                });
                if (response.data.status) {
                    const data = response.data.data;
                    setCategories(data);
                } else {
                    message.error('Kategoriler getirilirken bir sorun oluştu.');
                }
            } catch (e) {
                message.error(e.response.data.message);
                console.log(e);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
        fetchProductDetail(productGuid);
    }, [apiURI]);

    const onFinish = async (values) => {
        try {
            setLoading(true);
            const response = await axios
                .post(`${apiURI}/products/create`,
                    {
                        name: values.name,
                        category_guid: values.category,
                        current_price: values.current_price,
                        discount_price: values.discount_price,
                        description: values.description,
                        images: values.images.split('\n').map((item) => item.trim()),
                        colors: values.colors.split('\n').map((item) => item.trim()),
                        sizes: values.sizes.split('\n').map((item) => item.trim())

                    },
                {
                    headers: {
                        Accept: 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))?.token}`
                    }
                });
            if (response.data.status) {
                message.success('Ürün başarıyla eklendi.');
                const data = response.data.data;
                form.resetFields();
                setTimeout(() => {
                    navigate(`/admin/products/${data}`);
                }, 5000);
            } else {
                message.error('Ürün eklenirken bir sorun oluştu.');
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
                title={`Admin Panel Ürün Güncelle - ${productName}`}
                description={`Admin Panel - ${productName} adlı ürünü güncelleme sayfasıdır.`}
            />
            <Card
                title="Ürün Ekle"
                extra={
                <Button
                    type="primary"
                    onClick={() => navigate('/admin/products')}
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
                        label="Ürün Adı"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen ürün adını giriniz!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ürün Kategorisi"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen kategori seçiniz!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            placeholder="Kategori seçiniz"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {categories.map((category) => (
                                <Select.Option
                                    value={category.guid}
                                    key={category.guid}
                                >
                                    {category.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Yeni Fiyat"
                        name="current_price"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen ürün fiyatını giriniz!',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="İndirim Oranı"
                        name="discount_price"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen ürün indirim oranı giriniz giriniz!',
                            },
                        ]}
                        style={{ display: 'inline-block', width: 'calc(50% - 8px)' }}
                    >
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Ürün Açıklaması"
                        name="description"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen ürün açıklaması giriniz giriniz!',
                            },
                        ]}
                    >
                        <ReactQuill/>
                    </Form.Item>
                    <Form.Item
                        label="Ürün Görselleri (Linkler)"
                        name="images"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen en az 4 ürün görsel linki girin!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Ürün görsellerini linklerini yeni bir satıra yazınız!"
                            autoSize={{ minRows: 4 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ürün Renkleri (RGB kodları)"
                        name="colors"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen en az 1 ürün rengi(RGB Kodları) giriniz!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Ürün renklerini yeni bir satıra yazınız!"
                            autoSize={{ minRows: 4 }}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Ürün Bedenleri"
                        name="sizes"
                        rules={[
                            {
                                required: true,
                                message: 'Lütfen en az 1 ürün bedeni giriniz!',
                            },
                        ]}
                    >
                        <Input.TextArea
                            placeholder="Ürün bedenlerini yeni bir satıra yazınız!"
                            autoSize={{ minRows: 4 }}
                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                        Ekle
                    </Button>
                </Form>
            </Card>
        </Spin>
    )
}

export default CreateProductPage;