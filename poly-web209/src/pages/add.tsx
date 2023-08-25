import React from "react";
import { Button, Form, Input, Select, message, InputNumber } from "antd";
import { useAddProductMutation } from "../service/product.service";
import { useNavigate } from "react-router-dom";

type FieldType = {
  name?: string;
  desc?: string;
  xuatxu?: string;
  soluong?: number;
};

const AddProduct: React.FC = () => {
  const [addProduct] = useAddProductMutation();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      await addProduct(values).unwrap();

      message.success("Thêm sản phẩm thành công");

      await new Promise((resolve) => setTimeout(resolve, 1000));

      navigate("/");
    } catch (error) {
      message.error("Thêm sản phẩm thất bại");
    }
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      style={{ maxWidth: 600 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <h1 className="text-3xl my-10 font-bold text-center">Thêm sản phẩm</h1>
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

export default AddProduct;
