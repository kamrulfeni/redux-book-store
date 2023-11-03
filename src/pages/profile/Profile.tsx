
import Container from "react-bootstrap/Container";
import LayoutAdmit from "../../layoutAdmin/LayoutAdmit";
//import Loading from "../../components/Loading/Loading";
import { Row } from "react-bootstrap";

const profile = () => {
    return (
      <LayoutAdmit>
        {/* <div className="banner"></div>
        {Loading && <Loading />}
        <div className="mt-4 mb-1">
          <h2 className="text-center heading">
            <span> Recent Added </span>
          </h2>
        </div> */}
        <Container>
          <Row xs={1} sm={2} md={3} lg={4} className="mb-4 mt-1 g-4">
            {/* {books.length > 0 &&
              books.map((book) => (
                <Col key={book._id}>
                  <BookCard book={book} />
                </Col>
              ))} */}
          </Row>
          <div className="mb-4 text-center">
            {/* <Link to="/books"> Show more ... </Link> */}
          </div>
        </Container>
      </LayoutAdmit>
    );
};

export default profile;