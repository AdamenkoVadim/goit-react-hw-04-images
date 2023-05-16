import { Component } from "react"
import { api } from 'service/Api';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from "./Searchbar/Searchbar";
import { Loader } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { Button } from "./Button/Button";
import { Modal } from "./Modal/Modal";

export  class App extends Component{

  state ={
    searchName: '',
    status: 'idle',
    pictures: [],
    page: 1,
    showModal: false,
    largeImageURL: null,
    isVisibleBtn: false,
    total: null,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchName, page } = this.state;

    if (prevState.searchName !== searchName) {
      this.setState({ status: 'pending' });

      const response = await api.fetchResponce(searchName, page);

      if (response.hits <= 0) {
        toast.error(`No hemos encontrado "${searchName}"`);
        return;
      } else {
        toast.success(`Nosotros encontró "${response.total}" fotos "${searchName}"`);
      }

      this.setState({
        pictures: response.hits,
        isVisibleBtn: true,
        status: 'resolved',
        total: response.total,
      });
      return;
    }

    if (prevState.page !== page) {
      this.setState({ status: 'pending' });
      const response = await api.fetchResponce(searchName, page);
      this.setState(prevState => ({
        pictures: [...prevState.pictures, ...response.hits],
        status: 'resolved',
      }));
      return;
    }
  }

  hendleFormSubmit = searchName => {
    this.setState({
      searchName:searchName,
      page:1,
      pictures:[],
      status:'idle',
      isVisibleBtn: false,
    })
  }
  
  openModal = largeImageURL => {
    this.setState({
      showModal: true,
      largeImageURL: largeImageURL,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render (){
    const { pictures, largeImageURL, showModal, status, isVisibleBtn, total } =
    this.state;
  return (
    <>
     <Searchbar onSubmit = {this.hendleFormSubmit}/>

     {pictures.length > 0 && (
          <ImageGallery 
            pictures={pictures} 
            openModal={this.openModal} 
          />
      )}

     {status === 'pending' && pictures.length !== 0 &&
          <Loader 
          />
      }

     {status === 'resolved' && isVisibleBtn && pictures.length !== total &&
         <Button 
            loadMore={this.loadMore}  
         />
      }

      {showModal ? (
        <Modal
          largeImageURL={largeImageURL}
          onClose={this.closeModal}
        />
      ) : null}

     <ToastContainer/>
    </>
  )};
};
