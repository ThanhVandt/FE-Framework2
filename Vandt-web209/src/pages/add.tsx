import { useForm } from "react-hook-form"
import { useAddProductMutation } from "../services/product.service"
import { useNavigate } from "react-router-dom"

type AddForm = {
    name: string,
    price: number,
    description: string
}
const Add = () => {
    const { handleSubmit, formState: { errors }, register } = useForm<AddForm>();
    const [addProduct] = useAddProductMutation();
    const navigate = useNavigate();
    const onSubmit = (data: AddForm) => {
        addProduct(data)
        alert("thêm thành công")
        navigate('/')
    }
    return <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Thêm mới</h1>
        Name
        <input type="text" {...register("name", { required: true, minLength: 3 })} />
        <br />
        {errors?.name && <span>Trường bắt buộc</span>}
        <br />
        Price
        <input type="number" min={0} {...register("price", { required: true })} />
        <br />
        {errors?.price && <span>Trường bắt buộc</span>}
        <br />
        Description <select {...register("description", { required: true })}>
            <option selected disabled>xuat xu</option>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
        </select>
        {errors.description && <span>ko dc bo trong</span>}
        <br />
        <button type="submit">Thêm</button>
    </form>
}
export default Add