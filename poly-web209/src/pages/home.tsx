import { Button, Input, Modal } from "antd";
import { SearchOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useFetchProductQuery, useRemoveProductMutation } from "../service/product.service";
import { Link } from "react-router-dom";
import { IProduct } from "../model";

const Home = () => {
  const { data } = useFetchProductQuery();
  const [removeProduct] = useRemoveProductMutation();
  const [searchKeyword, setSearchKeyword] = useState("");

  const filterProducts = (products: IProduct[], keyword: any) => {
    return products.filter(
      (product: any) =>
        product.name.toLowerCase().includes(keyword.toLowerCase()) ||
        product.desc.toLowerCase().includes(keyword.toLowerCase()) ||
        product.xuatxu.toLowerCase().includes(keyword.toLowerCase())
    );
  };
  let filteredProducts: IProduct[] = [];
  if (data) {
    filteredProducts = filterProducts(data, searchKeyword);
  }
  const onHandleDelete = (id?: number) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      icon: <ExclamationCircleOutlined />,
      content: "Bạn có chắc muốn xóa sản phẩm này?",
      okText: "Xác nhận",

      cancelText: "Hủy",
      onOk: () => removeProduct(id),
    });
  };
  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <div className="">
          <Button type="primary" danger>
            <Link to={"/add"}>Thêm sản phẩm</Link>
          </Button>
        </div>
        <Input
          size="large"
          className="my-2 max-w-[300px] mx-auto"
          placeholder="tìm kiếm sản phẩm"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchKeyword(e.target.value)} // Cập nhật từ khóa tìm kiếm khi người dùng nhập
          value={searchKeyword}
        />
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm text-center">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                #
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Name
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Số lượng
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Mô tả
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Xuất xứ
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {filteredProducts.map((item, index) => (
              <tr>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.soluong}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.xuatxu}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {item.desc}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700 space-x-2">
                  <Button type="primary" danger>
                    <Link to={`update/${item?.id}`}>Sửa</Link>
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => onHandleDelete(item?.id)}
                  >
                    Xóa{" "}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
