import Layout from "../../layouts/Layout";
import {
  useGetSingleBooksQuery,
  useRemoveBooksMutation,
} from "../../redux/features/books/bookApi";
import Loading from "../../components/Loading/Loading";
import { Container } from "react-bootstrap";
import moment from "moment";
import Comments from "../../components/comments/Comments";
//import { initBook } from "../../shared/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import { initBook } from "../../shared/constants";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Book = () : JSX.Element | null  => {
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [isEditable, setIsEditable] = useState(false);

  const { data: user } = useAppSelector((state) => state.user);

  const { data: book, isLoading } = useGetSingleBooksQuery(bookId as string, {
    refetchOnReconnect: true,
    pollingInterval: 6000,
    refetchOnMountOrArgChange: true,
  });
  const [removeBook] = useRemoveBooksMutation();

  useEffect(() => {
    console.log({ book, user });
    if ((book?.success && book?.data?.authorDetails?._id) === user?._id) {
      setIsEditable(true);
    }
  }, [user, book]);

  if (!book?.success) {
    // console.log(book?.message, "error");
    return (
    <p className="text-danger mt-4">
      Data not found. <Link to="/"> Go to home </Link>
    </p>
  );
  }
   
  const removeHandler = async (): Promise<void> => {
    const res = await removeBook(bookId as string);
    navigate("/");
    if ("data" in res) {
      await Toast.fire({
        icon: "success",
        title: "Data deleted successfully",
      });
    } else {
      await Toast.fire({
        icon: "error",
        title: "Something went wrong",
      });
    }
  };

  return (
    <Layout>
      <Container>
        {book?.success && !book.data ? (
          <p className="text-danger mt-4">
            Data not found. <Link to="/"> Go to home </Link>
          </p>
        ) : (
          <>
            <div className="card mb-3 my-4">
              {isLoading && <Loading />}

              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={book?.data?.image || "/images/bookCover.webp"}
                    className="img-fluid rounded-start w-100"
                    alt="book cover"
                    style={{ maxHeight: "400px" }}
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-capitalize d-flex justify-content-center h-100 flex-column">
                    <h5 className="card-title">{book?.data?.title}</h5>
                    <div>
                      <b> author: </b> {book?.data?.author}
                    </div>
                    <div>
                      <b> genre: </b> {book?.data?.genre}
                    </div>
                    <div>
                      <b> publication year: </b>
                      {moment(book?.data?.publicationDate).format("DD/MM/YYYY")}
                    </div>

                    {isEditable ? (
                      <div className="mt-3">
                        <Link
                          to={`/update-book/${book?.data?._id as string}`}
                          className="text-capitalize btn btn-warning me-3"
                        >
                          edit
                        </Link>
                        <button
                          className="text-capitalize btn btn-danger"
                          // eslint-disable-next-line @typescript-eslint/no-misused-promises
                          onClick={removeHandler}
                        >
                          remove
                        </button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <Comments book={book?.data ? book?.data : initBook} />
          </>
        )}
      </Container>
    </Layout>
  );
};

export default Book;
