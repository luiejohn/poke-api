import { FC, ChangeEvent } from "react";
import { IPaginationProps } from "../pages/PokemonList";

interface IProps {
  pagination?: IPaginationProps;
  paginationLimit: number;
  handleOnPaginationLimitChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

export const Pagination: FC<IProps> = ({
  pagination,
  paginationLimit,
  handleOnPaginationLimitChange,
  handleNextPage,
  handlePrevPage,
}) => {
  return (
    <div className="flex justify-between p-3 mt-4">
      <button
        className={`${
          !pagination?.previous ? "bg-[#fff]" : "bg-[#fff]"
        } text-[#000] py-2 px-6 rounded`}
        disabled={!pagination?.previous}
        onClick={handlePrevPage}
      >
        Prev
      </button>

      <div>
        <input
          className="rounded-full px-6 py-2 text-center w-[100x]"
          min={0}
          max={pagination?.count}
          type="number"
          value={paginationLimit}
          placeholder="limit"
          onChange={handleOnPaginationLimitChange}
        />
      </div>

      <button
        className={`${
          !pagination?.next ? "bg-[#fff]" : "bg-[#fff]"
        } text-[#000] py-2 px-6 rounded`}
        disabled={!pagination?.next}
        onClick={handleNextPage}
      >
        Next
      </button>
    </div>
  );
};
