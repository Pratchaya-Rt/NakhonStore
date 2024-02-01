import { useState } from "react";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import SmallProduct from "./SmallProduct";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();

  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <section className="mr-[5rem]">
        <div
          className={`flex-1 p-4 cursor-pointer text-lg hover:bg-[#3D3B40] ${
            activeTab === 1 ? "font-bold text-orange-400" : ""
          }`}
          onClick={() => handleTabClick(1)}
        >
          เขียนรีวิว
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg hover:bg-[#3D3B40]${
            activeTab === 2 ? "font-bold text-orange-400" : ""
          }`}
          onClick={() => handleTabClick(2)}
        >
          รีวิวทั้งหมด
        </div>
        <div
          className={`flex-1 p-4 cursor-pointer text-lg hover:bg-[#3D3B40]${
            activeTab === 3 ? "font-bold text-orange-400" : ""
          }`}
          onClick={() => handleTabClick(3)}
        >
          สินค้าใกล้เคียง
        </div>
      </section>

      {/* ส่วนที่ 2 */}
      <section>

        {/* Tab แรก เขียนรีวิว */}
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block text-xl mb-2">
                    ให้คะแนน
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  >
                    <option value="">Select</option>
                    <option value="1">แย่มาก</option>
                    <option value="2">แย่</option>
                    <option value="3">พอใช้</option>
                    <option value="4">ดี</option>
                    <option value="5">ดีเยี่ยม</option>
                  </select>
                </div>

                <div className="my-2">
                  <label htmlFor="comment" className="block text-xl mb-2">
                    คอมเม้นต์
                  </label>

                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="p-2 border rounded-lg xl:w-[40rem] text-black"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-orange-600 text-white py-2 px-4 rounded-lg"
                >
                  เพิ่มรีวิว
                </button>
              </form>
            ) : (
              <p>
                กรุณา <Link className="text-orange-500 underline" to="/login">เข้าสู่ระบบ</Link> ก่อนเขียนรีวิว
              </p>
            )}
          </div>
        )}
      </section>

      {/* Tab 2  รีวิวทั้งหมด*/}
      <section>
        
        {activeTab === 2 && (
          <>
            <div>{product.reviews.length === 0 && <p>ไม่มีรีวิว</p>}</div>

            <div>
              {product.reviews.map((review) => (
                <div
                  key={review._id}
                  className="bg-[#1A1A1A] p-4 rounded-lg xl:ml-[2rem] sm:ml-[0rem] xl:w-[50rem] sm:w-[24rem] mb-5"
                >
                  <div className="flex justify-between">
                    <strong className="text-[#B0B0B0]">{review.name}</strong>
                    <p className="text-[#B0B0B0]">
                      {review.createdAt.substring(0, 10)}
                    </p>
                  </div>

                  <p className="my-4">{review.comment}</p>
                  <Ratings value={review.rating} />
                </div>
              ))}
            </div>
          </>
        )}
      </section>


      {/* Tab 3 สินค้าใกล้เคียง*/}
      <section>
        {activeTab === 3 && (
          <section className="ml-[4rem] flex flex-wrap">
            {!data ? (
              <Loader />
            ) : (
              data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))
            )}
          </section>
        )}
      </section>
    </div>
  );
};

export default ProductTabs;