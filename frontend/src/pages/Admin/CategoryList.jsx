import { useState } from "react"
import {toast} from "react-toastify"
import { 
    useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
    useFetchCategoriesQuery 
    } from "../../redux/api/categoryApiSlice.js"
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";
import AdminMenu from "./AdminMenu.jsx";

const CategoryList = () => {
    const { data : categories} = useFetchCategoriesQuery();
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatingName, setUpdatingName] = useState('')
    const [modalVisible, setModalVisible] = useState(false)

    const [createCategory] = useCreateCategoryMutation()
    const [updateCategory] = useUpdateCategoryMutation()
    const [deleteCategory] = useDeleteCategoryMutation()



    const handleCreateCategory = async (e) => {
      e.preventDefault()

      if (!name) {
        toast.error('จำเป็นต้องระบุชื่อหมวดหมู่')
        return;
      }

      try {
        const result = await createCategory({name}).unwrap()
        if (result.error) {
          toast.error(result.error)
        } else {
          setName("")
          toast.success(`${result.name} ถูกสร้างแล้ว`)
        }
      } catch (error) {
        console.error(error);
        toast.error('สร้างหมวดหมู่สินค้าล้มเหลว ลองใหม่อีกครั้ง')
      }
    }

    const handleUpdateCategory = async (e) =>{
      e.preventDefault()

      if (!updatingName) {
        toast.error("จำเป็นต้องระบุชื่อหมวดหมู่ที่ต้องการแก้ไข")
        return;
      }

      try {
        const result = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {name: updatingName},})

        if (result.error) {
          toast.error(result.error)
        } else {
          toast.success(`${result.name} ถูกอัพเดทแล้ว`)
          setSelectedCategory(null)
          setUpdatingName('')
          setModalVisible(false)
        }


      } catch (error) {
        console.error(error);
      }

    }
    const handleDeleteCategory = async () => {
      try {
        const result = await deleteCategory(selectedCategory._id).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(`${result.name} is deleted.`);
          setSelectedCategory(null);
          setModalVisible(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Category delection failed. Tray again.");
      }
    };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        <AdminMenu/>
        <div className="md:w-3/4 p-3">
            <div className="h-12">จัดการหมวดหมู่สินค้า</div>
            <CategoryForm value={name} setValue={setName} handleSubmit={handleCreateCategory}/>
            <br />
            <hr />

            <div className="flex flex-wrap">
              {categories?.map((category) => (
                <div key={category._id}>
                    <button onClick={() => {
                      {
                       setModalVisible(true);
                       setSelectedCategory(category)
                       setUpdatingName(category.name) 
                      }
                    }} 
                    className="text-orange-400 hover:text-white border border-orange-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-orange-300 dark:text-orange-300 dark:hover:text-white dark:hover:bg-orange-400 dark:focus:ring-orange-900 m-3 mt-6"
                    >
                   
                        {category.name}
                      
                    </button>
                </div>
              ))}
            </div>
            
                    <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>

                        <CategoryForm value={updatingName} setValue={value => setUpdatingName(value)} handleSubmit={handleUpdateCategory} buttonText="Update" handleDelete={handleDeleteCategory}/>

                    </Modal>

        </div>
    </div>
  )
}

export default CategoryList