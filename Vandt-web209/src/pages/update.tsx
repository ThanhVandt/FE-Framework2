import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useFetchProductQuery, useUpdateProductMutation } from "../services/product.service"
import { useNavigate, useParams } from "react-router-dom"

type UpdateForm = {
    name: string,
    price: number,
    description: string
}
const Update = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data } = useFetchProductQuery();
    const product = data?.find((item) => item.id === Number(id));
    const {handleSubmit,formState: { errors },register,setValue} = useForm<UpdateForm>();
    const [ updateProduct ] = useUpdateProductMutation();

    useEffect(()=> {
        if(product) {
            setValue('name', product.name);
            setValue('price', product.price);
            setValue('description', product.description);
        }
    },[product, setValue]);
    const onSubmit = (data: UpdateForm) => {
        if(product) {
            updateProduct({...product, ...data});
            navigate('/');
        }
    };

    return <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sửa sp</h1>
        Name 
        <input type="text" {...register("name", {required: true, minLength: 3})}/>
        <br />
        {errors?.name && <span>Trường bắt buộc</span>}
        <br />
        Price 
        <input type="number" min={0} {...register("price", {required: true})} />
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
        <button type="submit">Sửa</button>
    </form>
}
export default Update