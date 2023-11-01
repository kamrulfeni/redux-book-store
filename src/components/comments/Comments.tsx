/* eslint-disable @typescript-eslint/no-misused-promises */
import { FormEvent, useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";
import { IBook, IReview } from "../../interface/bookInterface";
import { useUpdateBooksMutation } from "../../redux/features/books/bookApi";
import { useAppSelector } from "../../redux/hooks";

const Comments = ({ book }: { book: IBook }) => {
  const [reviewList, setReviewList] = useState<IReview[]>([]);
  const [comment, setComment] = useState("");

  const { isLogging } = useAppSelector((state) => state.user);

  const [updateReviewList] = useUpdateBooksMutation();

  useEffect(() => {
    setReviewList([...book.reviews]?.reverse().slice(0, 10));
  }, [book]);

  const submitHandler = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const updatedBook: IBook = {
      ...book,
      reviews: [...book.reviews, { comment, user: book.author }],
    };
    await updateReviewList({ id: book._id as string, data: updatedBook });
    setComment("");
  };
  return (
    <div className="my-3">
      <Form className="d-flex" onSubmit={submitHandler}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="form-control rounded-0"
        />
        {isLogging ? (
          <button
            className="btn btn-success text-nowrap rounded-0"
            type="submit"
          >
            Send Review
          </button>
        ) : (
          <Link
            to="/signin"
            className="btn btn-success text-nowrap rounded-0"
            type="submit"
          >
            Send Review
          </Link>
        )}
      </Form>

      {reviewList.length > 0 &&
        reviewList?.map((review) => (
          <div className="d-flex align-item-center bg-light my-3 p-3 rounded-3  gap-3">
            <div
              className="avatar rounded-circle bg-dark bg-dark-subtle"
              style={{ height: "50px", width: "50px" }}
            ></div>
            <div className="text">
              <h6 className="text-capitalize mb-0"> {review.user} </h6>
              <p className="mb-0"> {review.comment} </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
