import { useState, useEffect } from "react";
import Layout from "../../layouts/Layout";
import Loading from "../../components/Loading/Loading";
import BookCard from "../../components/bookCard/BookCard";
import { IBook } from "../../interface/bookInterface";
import { useGetBooksQuery } from "../../redux/features/books/bookApi";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./home.css";
import { Link } from "react-router-dom";

const Home = () => {
  const [books, setBooks] = useState<IBook[]>([]);
  const [loading, setLoading] = useState(false);

  const { data: book, isLoading, error } = useGetBooksQuery("limit=8");

  useEffect(() => {
    if (book?.success) {
      setBooks(book?.data);
      setLoading(isLoading);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [book]);

  if (error) {
    console.log(error);
  }
  return (
    <Layout>
      <div className="banner"></div>
      {loading && <Loading />}
      <div className="mt-4 mb-1">
        <h2 className="text-center heading">
          <span> Recent Added </span>
        </h2>
      </div>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="mb-4 mt-1 g-4">
          {books.length > 0 &&
            books.map((book) => (
              <Col key={book._id}>
                <BookCard book={book} />
              </Col>
            ))}
        </Row>
        <div className="mb-4 text-center">
          <Link to="/books"> Show more ... </Link>
        </div>
      </Container>
    </Layout>
  );
};

export default Home;
