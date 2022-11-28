import React, { FormEvent, useState } from "react";

import { Button } from "../Button";
import { Input } from "../Input";

import searchIcon  from '../../assets/images/search-icon.svg'

import styles from './styles.module.scss';

type FormProps = {
  onSubmit:  (formData: string) => Promise<void>,
}

export function Form({ onSubmit }: FormProps) {
  const [searchTerm, setSearchTerm] = useState('');


  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    await onSubmit(searchTerm);
    setSearchTerm('');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Input
        type='search'
        placeholder="Type your favorite music, band or artist"
        onChange={(e) => setSearchTerm(e.target.value)}
        value={searchTerm}
        required
      />
      <Button
        aria-label="search button"
        type="submit"
      >
        <img src={searchIcon} alt="search icon" />
      </Button>
    </form>
  )
}

// GET https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=linkin%20park&key=[YOUR_API_KEY] HTTP/1.1

// empty -->
// {
//   "_links": {
//     "self": {
//       "href": "/discovery/v2/attractions.json?keyword=carros"
//     }
//   },
//   "page": {
//     "size": 20,
//     "totalElements": 0,
//     "totalPages": 0,
//     "number": 0
//   }
// }
