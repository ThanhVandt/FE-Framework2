import { useFetchProductQuery, useRemoveProductMutation } from "../services/product.service"
const Dashboard = () => {
    const { data } = useFetchProductQuery();

    //xóa
    const [remove] = useRemoveProductMutation();
    const handleDelete = (id?: number) => {
        if(id){
            let cf = confirm("u sure?")
            if(cf){
                remove(id)
            }
        }
    }

    //sửa
    const handleUpdate = (id?: number) => {
        if(id) {
            window.location.href = `/update/${id}`;
        }
    }
    
    return <div className="overflow-x-auto mx-auto w-[600px]">
        <a
            href="/add"
            className="inline-block rounded bg-green-600 px-4 py-2 text-xs font-medium text-white hover:bg-green-700"
        >
            Add
        </a>
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="ltr:text-left rtl:text-right">
                <tr>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Name
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Price
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Description
                    </th>
                    <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                        Action
                    </th>
                </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
                {data?.map((item) => (
                    <tr key={item.id}>
                        <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                            {item.name}
                        </td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.price}</td>
                        <td className="whitespace-nowrap px-4 py-2 text-gray-700">{item.description}</td>
                        <td className="whitespace-nowrap px-4 py-2">
                            <a
                                onClick={() => handleUpdate(item.id)}
                                className="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
                            >
                                Update
                            </a>
                            <a
                                href="#"
                                onClick={() => handleDelete(item.id)}
                                className="inline-block rounded bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-700 ml-[10px]"
                            >
                                Remove
                            </a>
                        </td>
                    </tr>
                ))}

            </tbody>
        </table>
    </div>
}
export default Dashboard