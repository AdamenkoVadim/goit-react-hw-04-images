import { Component } from "react"
import css from "components/Searchbar/Searchbar.module.css"
import { toast } from 'react-toastify';
import { AiOutlineSearch } from 'react-icons/ai';

export class Searchbar extends Component{
  state = {
    searchName:'',
  }

  hendleChangeName = (e) => {
    this.setState({searchName: e.currentTarget.value.toLowerCase()})
  }

  hendleSubmit = (e) => {
    e.preventDefault();

    if(this.state.searchName.trim() ==='') {
      toast.warn('Por favor escribe algo!!!');
      return;
    }
    this.props.onSubmit(this.state.searchName);
    this.setState({searchName: ''})
  }
  
  render() {
    return (
        <header className = {css.Searchbar} >
          <form 
            className={css.SearchForm} 
            onSubmit = {this.hendleSubmit}
          >
            
            <button type="submit" className={css.SearchForm__button}>
            <AiOutlineSearch size={32}/>
            </button>

          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value = {this.state.searchName}
            onChange = {this.hendleChangeName}
          />
          </form>
        </header>
    )}
}