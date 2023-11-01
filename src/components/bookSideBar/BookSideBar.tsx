// import React from 'react';
import { Form } from "react-bootstrap";
import { bookEnum } from "../../shared/constants";
import { useGetYearsQuery } from "../../redux/features/books/bookApi";
import Loading from "../Loading/Loading";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFilter } from "../../redux/features/books/booksSlice";
//  "https://api.imgbb.com/1/upload?expiration=600&key=2dc5a55c87e2b12334a12e4a99ca665c"
interface BookSideBarProps {
  setPage: (num: number) => void;
}

const BookSideBar: React.FC<BookSideBarProps> = ({ setPage }) => {
  const dispatch = useAppDispatch();
  const { genreFilter, yearFilter } = useAppSelector(
    (state) => state.books.filter
  );

  const [yearList, setYearList] = useState<string[]>([]);
  const [limit, setLimit] = useState<number>(10);
  const {
    data: book,
    error,
    isLoading,
    isFetching,
  } = useGetYearsQuery(`limit=${limit}`);

  console.log({ isLoading, isFetching });
  if (error) {
    console.log(error);
  }

  if (isLoading || isFetching) {
    <Loading />;
  }

  const genreList: string[] = bookEnum;

  useEffect(() => {
    if (book?.success) {
      setYearList(book.data);
    }
  }, [book]);

  return (
    <div className="py-3">
      <h5> Genre: </h5>
      <div className="ps-3">
        <Form.Check
          checked={genreFilter === ""}
          label="All Genres"
          name="genre"
          type="radio"
          id={`radio-genre-all`}
          onClick={() => {
            dispatch(setFilter({ genreFilter: "" }));
            setPage(1);
          }}
        />
        {genreList.map((genre) => (
          <Form.Check
            key={genre}
            label={genre}
            checked={genreFilter === genre}
            name="genre"
            type="radio"
            className="text-capitalize"
            id={`radio-${genre}`}
            onClick={() => {
              dispatch(setFilter({ genreFilter: genre }));
              setPage(1);
            }}
          />
        ))}
      </div>
      <h5 className="mt-4"> Year: </h5>
      <div className="ps-3">
        <Form.Check
          label="All Years"
          checked={yearFilter === ""}
          name="year"
          type="radio"
          id={`radio-year-all`}
          onClick={() => {
            dispatch(setFilter({ yearFilter: "" }));
            setPage(1);
          }}
        />
        {yearList?.map((year) => (
          <Form.Check
            key={year}
            label={year}
            name="year"
            type="radio"
            checked={yearFilter === year}
            id={`radio-${year}`}
            onClick={() => {
              // setYearFilter(year);
              dispatch(setFilter({ yearFilter: year }));
              setPage(1);
            }}
          />
        ))}

        <div className="mt-3">
          {book?.success &&
          Number(book?.meta?.total) > Number(book?.meta?.limit) ? (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => setLimit(limit + 10)}
            >
              More Year...
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default BookSideBar;
