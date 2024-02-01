const asyncHandler = (fn) => (req,res,next) => {
    Promise.resolve(fn(req,res,next)).catch(error => {
        res.status(500).json({message: error.message})
    })
}

export default asyncHandler;

//asyncHandler ถูกใช้เพื่อทำให้การจัดการ errors ที่เกิดขึ้นใน asynchronous functions ใน Express.js ง่ายขึ้น, โดยไม่ต้องใช้ try-catch ภายใน asynchronous functions
// แต่ให้ใช้ Promise.reject เพื่อ throw error ออกมา.