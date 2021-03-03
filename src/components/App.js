import React, { Component } from "react";
import Searchbar from "./searchbar/Searchbar";
import ImageGallery from "./imageGallery/ImageGallery";
import imagesApi from "../services/imagesApi";
import Button from "./button/Button";
import Loader from "react-loader-spinner";
import Modal from "./modal/Modal";

import styles from "./App.module.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

export default class App extends Component {
  state = {
    searchQuery: "",
    page: 1,
    results: [],
    loading: false,
    modalImage: null,
    firstFetch: true,
  };

  handleSearchbarSubmit = (query) => {
    this.setState({
      searchQuery: query,
      results: [],
      page: 1,
      firstFetch: true,
    });
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    prevQuery !== nextQuery && this.fetchImages();
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({
      loading: true,
    });

    imagesApi
      .fetchImagesWithQuery(searchQuery, page)
      .then((images) => {
        this.setState((prevState) => ({
          results: [...prevState.results, ...images],
          page: prevState.page + 1,
        }));
        if (!this.state.firstFetch) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => console.log(error))
      .finally(() => {
        this.setState({
          loading: false,
          firstFetch: false,
        });
      });
  };

  openModal = (imageUrl) => {
    this.setState({ modalImage: imageUrl });
  };

  closeModal = (e) => {
    this.setState({ modalImage: null });
  };

  render() {
    const { results, loading, modalImage } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleSearchbarSubmit} />
        <ImageGallery images={results} onClick={this.openModal} />
        {modalImage && (
          <Modal largeImage={modalImage} onClose={this.closeModal} />
        )}
        {loading && (
          <div className={styles.Loader}>
            <Loader type="Oval" color="#00BFFF" height={100} width={100} />
          </div>
        )}
        {results.length > 0 && !loading && (
          <Button onClick={this.fetchImages} />
        )}
      </div>
    );
  }
}
