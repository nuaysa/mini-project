import * as Yup from 'yup'

export const eventSchema = Yup.object({
  title: 
  Yup.string()
  .min(5, "Title must be at least 5 characters long")
  .max(100, "Title must be at most 100 characters long")
  .required("Title is required"),
  description: 
  Yup.string()
  .min(200, "Title must be at least 200 characters long")
  .max(1000, "Title must be at most 1000 characters long")
  .required("description is required"),
  category: 
  Yup.string()
  .required("category is required"),
  date: 
  Yup.date()
  .min(new Date(), "can not input today's date")
  .typeError("invalid date format")
  .required("date required"),
  time:  
  Yup.string()
  .required("time is required"),
  location: 
  Yup.string()
  .required("location is required"),
  venue: 
  Yup.string()
  .required("location is required"),
  mapURL: 
  Yup.string()
  .required("mapURL is required"),
  type: 
  Yup.string()
  .required("type is required"),
  thumbnail: 
  Yup.mixed<File>()
  .required("Thumbnail is required")
  .test(
    "fileSize",
    "File terlalu besar (maksimal 2MB)",
    (value: any) =>
      !value || (value instanceof File && value.size <= 2 * 1024 * 1024)
  )
  .test(
    "fileType",
    "Format file tidak didukung (hanya .jpeg, .png, .jpg, .webp)",
    (value:  any) =>
      !value ||
      (value instanceof File &&
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          value.type
        ))
  ),
})

export const ticketSchema = Yup.object().shape({
  price: Yup.number().required("Price is Required").min(0, "can't have a minus price"),
  quota: Yup.number().required("Quota is Required").min(20, "minimum quota= 20"),
  category: Yup.string().required("Please select a category"),
  startDate: Yup.date().required("Start Date is Required"),
  endDate: Yup.date().required("End Date is Required"),
  discount: Yup.boolean() 
})

export const ratingSchema = Yup.object().shape({
  rating: Yup.string().required("Rating is Required"),
  desc: Yup.string().required("Review is Required").min(10, "Comment must be at least 10 characters long"),
})
