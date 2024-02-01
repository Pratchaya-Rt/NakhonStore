import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "./AdminMenu";




const ProductUpdate = () => {
    const params = useParams()

    const { data: productData } = useGetProductByIdQuery(params._id);

    console.log(productData);

    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(
        productData?.description || ""
    );
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category?._id || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock);

        // hook
    const navigate = useNavigate();

    // Fetch categories using RTK Query
    const { data: categories = [] } = useFetchCategoriesQuery();

    const [uploadProductImage] = useUploadProductImageMutation();

    // Define the update product mutation
    const [updateProduct] = useUpdateProductMutation();

    // Define the delete product mutation
    const [deleteProduct] = useDeleteProductMutation();

    useEffect(() => {
        if (productData && productData._id) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            if (productData.category && mongoose.Types.ObjectId.isValid(productData.category._id)
              ) {
                setCategory(productData.category._id);
              } else {
                // Handle the case where category is undefined or not a valid ObjectId
                setCategory("");
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
              }
            // Check if countInStock is defined and is a valid number
            if (productData.countInStock !== undefined && !isNaN(productData.countInStock)) {
              setStock(productData.countInStock);
            } else {
              // Handle the case where countInStock is undefined or not a number
              setStock(0); // or set to a default value
            }
          }
    }, [productData]);


    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);
        try {
          const res = await uploadProductImage(formData).unwrap();
          toast.success("Item added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          setImage(res.image);
        } catch (err) {
          toast.success("Item added successfully", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formData = new FormData();
          formData.append("image", image);
          formData.append("name", name);
          formData.append("description", description);
          formData.append("price", price);
          formData.append("category", category);
          formData.append("quantity", quantity);
          formData.append("brand", brand);
          formData.append("countInStock", stock);
    
          // Update product using the RTK Query mutation
          const data = await updateProduct({ productId: params._id, formData });
    
          if (data?.error) {
            toast.error(data.error, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
          } else {
            toast.success(`สินค้าอัพเดทสำเร็จ :D`, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 2000,
            });
            navigate("/admin/allproductslist");
          }
        } catch (err) {
          console.log(err);
          toast.error("สินค้าอัพเดทล้มเหลว กรุณาลองใหม่อีกครั้ง", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      };
    
      const handleDelete = async () => {
        try {
          let answer = window.confirm(
            "Are you sure you want to delete this product?"
          );
          if (!answer) return;
    
          const { data } = await deleteProduct(params._id);
          toast.success(`"${data.name}" ถูกลบแล้ว`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
          navigate("/admin/allproductslist");
        } catch (err) {
          console.log(err);
          toast.error("Delete failed. Try again.", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
          });
        }
      };


  return (
    <>
         <div className="container  xl:mx-[9rem] sm:mx-[0]">
        <div className="flex flex-col md:flex-row">
          <AdminMenu />
          <div className="md:w-3/4 p-3">
            <div className="h-12">Update / Delete Product</div>

            {image && (
              <div className="text-center">
                <img
                  src={image}
                  alt="product"
                  className="block mx-auto w-[30%] h-[30%]"
                />
              </div>
            )}

            <div className="mb-3">
              <label className="text-white px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-13">
                {image ? image.name : "Upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={uploadFileHandler}
                  className="text-white"
                />
              </label>
            </div>

            <div className="p-3">
              <div className="flex flex-wrap">
                <div className="one">
                  <label htmlFor="name">ชื่อสินค้า</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="two">
                  <label htmlFor="name block">ราคา</label> <br />
                  <input
                    type="number"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-wrap">
                <div>
                  <label htmlFor="name block">จำนวน</label> <br />
                  <input
                    type="number"
                    min="1"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="name block">แบรนด์สินค้า</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
              </div>

              <label htmlFor="" className="my-5">
                Description
              </label>
              <textarea
                type="text"
                className="p-2 mb-3 bg-[#101011]  border rounded-lg w-[95%] text-white"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="flex justify-between">
                <div>
                  <label htmlFor="name block">จำนวนในสต็อก</label> <br />
                  <input
                    type="text"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white "
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="">หมวดหมู่สินค้า</label> <br />
                  <select
                    placeholder="Choose Category"
                    className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white mr-[5rem]"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-green-600 mr-6"
                >
                  อัพเดท
                </button>
                <button
                  onClick={handleDelete}
                  className="py-4 px-10 mt-5 rounded-lg text-lg font-bold  bg-pink-600"
                >
                  ลบสินค้า
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductUpdate