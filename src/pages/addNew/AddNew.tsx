// import React from 'react';

import BookForm from "../../components/bookForm/BookForm";
import Layout from "../../layouts/Layout";

const AddNew = () => {
  return (
    <Layout>
      <BookForm mode="create" />
    </Layout>
  );
};

export default AddNew;
