import { useState, useEffect } from "react";
import { IBook } from "../../interface/bookInterface";
import Card from "react-bootstrap/Card";
import moment from "moment";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsBookmarkXFill, BsBookmarkCheckFill } from "react-icons/bs";
import "./bookCard.css";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleWishlist } from "../../redux/features/wishList/wishListSlice";
import { useUpdateBooksMutation } from "../../redux/features/books/bookApi";

const BookCard = ({ book }: { book: IBook }) => {
  const dispatch = useAppDispatch();
  const { wishlist, user } = useAppSelector((state) => state);
  const books = wishlist.books;
  const [wishList, setWishList] = useState<boolean>(false);

  const [updateIsFinished] = useUpdateBooksMutation();

  useEffect(() => {
    const isExist = books.find((b) => b._id === book._id);
    if (isExist) {
      setWishList(true);
    } else {
      setWishList(false);
    }
  }, [books, book._id]);

  const wishListHandler = () => {
    dispatch(toggleWishlist(book));
  };

  return (
    <>
      <Card className="w-100 bookCard">
        <Link
          to={`/book/${book?._id ? book?._id : ""}`}
          className="text-black text-capitalize"
        >
          <div className="bookImage">
            <Card.Img
              variant="top"
              //src={book.image || "images/bookCover.webp"}
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              src={`${book.image}`}

              style={{ height: "300px", position: "relative" }}
            />
          </div>

          <Card.Body className="pb-0">
            <Card.Title> {book.title} </Card.Title>
            <div>
              <div className="d-flex">
                <b className="me-2">Author: </b>
                <span> {book.author} </span>
              </div>
              <div className="d-flex">
                <b className="me-2">genre: </b> <span> {book.genre} </span>
              </div>
              <div className="d-flex">
                <b className="me-2">Publication: </b>
                <span>{moment(book.publicationDate).format("DD/MM/YYYY")}</span>
              </div>
            </div>
          </Card.Body>
        </Link>
        <div className="p-3 pt-0 d-flex justify-content-end">
          <div className="d-flex">
            <div className="wishLIst fs-2 me-2" onClick={wishListHandler}>
              {wishList ? (
                <AiFillHeart title="Remove wish list" />
              ) : (
                <AiOutlineHeart title="Add to wish list" />
              )}
            </div>
            <div
              className="finishBook fs-2"
              // onClick={wishListHandler}
            >
              {user.isLogging ? (
                book?.isFinished ? (
                  <BsBookmarkCheckFill
                    className="text-success"
                    title="Finished"
                  />
                ) : (
                  <BsBookmarkXFill
                    className="text-danger"
                    title="Add to Finished"
                    style={{ cursor: "pointer" }}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onClick={() =>
                      updateIsFinished({
                        id: book._id as string,
                        data: { ...book, isFinished: true },
                      })
                    }
                  />
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default BookCard;
