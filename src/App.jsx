import axios from "axios";
import { useState, useEffect } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
// import { fetchImagesQuery } from "./services/api";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

// Unsplash API
const ACCESS_KEY = "UKG2a0MkWM030phAM-Wt9EshPYfIwIc-qbYY-aW2UXs";
const BASE_URL = "https://api.unsplash.com/search/photos";

const fetchImages = async (query, page = 1, perPage = 12) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: ACCESS_KEY,
      },
    });
    return response.data;
  } catch (error) {
    return { results: [], total_pages: 0 };
  }
};

const App = () => {
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [query, setQuery] = useState('');
    const [page, setPage] = useState('');
    const [totalPages, setTotalPages] = useState(0);
      const [selectedImage, setSelectedImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
   

    useEffect(() => {
        const getImages = async () => {
            if (!query) return;
setLoading(true);
             
             try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };

    getImages();
  }, [query, page]);


     const handleSearch = (searchQuery) => {
    setQuery(searchQuery);
    setImages([]);
    setPage(1);
    setError(null);
    };
    
      const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    };
    
      const openModal = (image) => {
    setSelectedImage(image);
        setIsModalOpen(true);
        document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    document.body.style.overflow = "";
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
         {images !== null && (
        <>
          <ImageGallery images={images} openModal={openModal}/>
          {page < totalPages && (
            <div style={{ textAlign: "center",}}>
              <LoadMoreBtn onClick={handleLoadMore} />
            </div>
          )}
        </>
      )}
          {loading && <Loader />}
      {error && <ErrorMessage />}
      {selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          image={selectedImage}
        />
      )}

    </div>
  )
}

export default App;
