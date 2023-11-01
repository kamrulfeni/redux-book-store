// import React from 'react';

import { useParams } from "react-router-dom";
import BookForm from "../../components/bookForm/BookForm";
import { useGetSingleBooksQuery } from "../../redux/features/books/bookApi";
import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { IBook } from "../../interface/bookInterface";
import { initBook } from "../../shared/constants";
import Layout from "../../layouts/Layout";




const UpdateBook = () => {
  const [book, setBook] = useState<IBook>(initBook);
  const { bookId } = useParams();

  const { data, isLoading } = useGetSingleBooksQuery(bookId as string);

  useEffect(() => {
    if (data?.success) {
      setBook(data.data);
    }
  }, [data]);

  return (
    <Layout>
      {isLoading && <Loading />}
      <BookForm mode="edit" data={book} />
    </Layout>
  );
};

export default UpdateBook;
