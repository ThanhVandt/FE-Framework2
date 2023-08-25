import React from "react";
import { Button, Form, Input, Select, message, InputNumber } from "antd";
import { useGetProductByIdQuery, useUpdateProductMutation } from "../service/product.service";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

type FieldType = {
  name?: string;
  desc?: string;
  xuatxu?: string;
  soluong?: number;
};

const EditProduct: React.FC = () => {
  const [updateProduct] = useUpdateProductMutation();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: productData } = useGetProductByIdQuery(id || "");
  useEffect(() => {
    form.setFieldsValue(productData);
  }, [productData]);
  const onFinish = async (values: any) => {
    try {
      await updateProduct({ ...values, id: id }).unwrap();

      message.success("Cập nhật sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/");
      form.resetFields();
    } catch (error) {
      message.error("Cập nhật sản phẩm thất bại");
    }
  };
  return (
    <Form
      name="basic"
      form={form}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl my-10 font-bold text-center">
        Cập nhật sản phẩm
      </h1>
      <Form.Item<FieldType>
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input your name!" }]}
      >
        <Input />
      </Form.Item>
      <Form.Item<FieldType>
        label="Số lượng"
        name="soluong"
        rules={[{ required: true, message: "Nhập số lượng!" }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Select"
        name="xuatxu"
        rules={[{ required: true, message: "Chọn Xuất xứ" }]}
      >
        <Select>
          <Select.Option value="Việt Nam">Việt Nam</Select.Option>
          <Select.Option value="Trung Quốc">Trung Quốc</Select.Option>
          <Select.Option value="Đài Loan">Đài Loan</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="desc"
        label="Miêu tả"
        rules={[{ required: true, message: "Nhập miêu tả" }]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" danger htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditProduct;
