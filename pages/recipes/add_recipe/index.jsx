import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../../../components/base/Navbar'
import Footer from '../../../components/base/Footer'
import Image from 'next/image'
import { addRecipe } from '../../../redux/slice/recipeSlice'

const Index = () => {
  const [showImage, setShowImage] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const router = useRouter()
  const dispatch = useDispatch()
  const { addRecipeStatus, error } = useSelector((state) => state.recipe)

  const handleImageReader = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setShowImage(reader.result)
      }
      reader.readAsDataURL(file)
      setImage(file)
    }
  }

  const handleRemoveImage = () => {
    setShowImage(null)
  }

  const handleSubmit = async () => {
    if (!image || !title || !description) {
      alert('Please fill all fields and upload an image.')
      return
    }

    try {
      const resultAction = await dispatch(addRecipe({ image, title, description })).unwrap()
      alert('Recipe uploaded successfully!')
      router.push(`/recipes/${resultAction.id}`)
    } catch (error) {
      console.error('Error uploading recipe:', error)
      alert('Failed to upload recipe.')
    }
  }

  return (
    <div className='font-montserrat'>
        <Navbar />
        <div className="w-[70%] h-[425px] border-2 border-dashed border-gray-400 flex items-center justify-center mx-[15%] relative">
            <input 
              name="" 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              onChange={handleImageReader}
            />
            {showImage ? (
              <div className="relative w-full h-full">
                <Image src={showImage} fill style={{ objectFit: 'contain', height: '100%' }} alt="Uploaded" className="max-w-full max-h-full" />
                <button 
                  onClick={handleRemoveImage} 
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 w-8 h-8"
                >
                  &times;
                </button>
              </div>
            ) : (
              <span className="text-gray-500">Drag & drop gambar di sini atau klik untuk memilih</span>
            )}
        </div>

        <input 
          name="title" 
          type="text" 
          placeholder='Title' 
          className='w-[70%] mx-[15%] mt-5 placeholder:text-gray-500 px-6 py-3 bg-slate-200 rounded-lg text-lg' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
          name="description" 
          placeholder='Ingredients' 
          className='w-[70%] mx-[15%] mt-5 placeholder:text-gray-500 px-6 py-3 bg-slate-200 rounded-lg text-lg' 
          rows="7"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button 
          className='bg-yellow-400 text-white rounded-lg mx-[40%] w-[20%] py-3 text-sm mt-10' 
          onClick={handleSubmit}
        > 
          Post 
        </button>
        
        <Footer />
    </div>
  )
}

export default Index
