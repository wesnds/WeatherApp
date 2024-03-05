import { cn } from "@/utils/cn";
import { IoSearch } from "react-icons/io5";

type Props = {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox(searchProps: Props) {
  return (
    <form
      onSubmit={searchProps.onSubmit}
      className={cn(
        "flex relative items-center justify-between h-10",
        searchProps.className,
      )}
    >
      <input
        type="text"
        value={searchProps.value}
        onChange={searchProps.onChange}
        placeholder="Search location..."
        className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 h-full"
      />
      <button className="px-4 py-[9px] bg-blue-500 text-white rounded-r-md focus:outline-none hover:bg-blue-600 h-full">
        <IoSearch />
      </button>
    </form>
  );
}
