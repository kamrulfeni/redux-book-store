
import Layout from "../../layouts/Layout";
import { useAppSelector } from "../../redux/hooks";
import BookCard from "../../components/bookCard/BookCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const Wishlist = () => {
  const { books } = useAppSelector((state) => state.wishlist);

  return (
    <Layout>
      <Container>
        <Row xs={1} sm={2} md={3} lg={4} className="my-3 g-4">
          {books.length > 0 ?
            books.map((book) => (
              <Col key={book._id}>
                <BookCard book={book} />
              </Col>
            )) : <p className="text-danger"> No data found. </p> }
        </Row>
      </Container>
    </Layout>
  );
};

export default Wishlist;
