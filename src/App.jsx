import React from 'react'
import './App.css'
import { useState } from 'react'
import { useEffect } from 'react'
import ImageCart from './components/ImageCart'
import ImageSearch from './components/ImageSearch'

const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [term, setTerm] = useState('')

  useEffect(() => {
    fetch(`https://pixabay.com/api/?key=11258786-cabe98337afeeb0ae91b65ffe&q=${term}&image_type=photo&pretty=true`)
      .then(res => res.json())
      .then(data => {
        setImages(data.hits)
        setIsLoading(false)
      })
      .catch(err => console.log(err))
  }, [term]);

  return (
    <div className='container mx-auto'>
      <ImageSearch searchText={(text) => setTerm(text)} />

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No images found...</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map(image =>
          <ImageCart image={image} key={image.id} />
        )}
      </div>}
    </div>
  )
}

export default App
