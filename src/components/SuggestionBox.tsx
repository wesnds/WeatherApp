type Props = {
  showSuggestions: boolean;
  suggestions: string[];
  handleSuggestionClick: (item: string) => void;
  error: string;
};

export default function SuggestionBox(sbProps: Props) {
  return (
    <>
      {((sbProps.showSuggestions && sbProps.suggestions.length > 1) ||
        sbProps.error) && (
        <ul className="mb-4 bg-white absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px]  flex flex-col gap-1 py-2 px-2">
          {sbProps.error && sbProps.suggestions.length < 1 && (
            <li className="text-red-500 p-1 "> {sbProps.error}</li>
          )}
          {sbProps.suggestions.map((item, i) => (
            <li
              key={i}
              onClick={() => sbProps.handleSuggestionClick(item)}
              className="cursor-pointer p-1 rounded   hover:bg-gray-200"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
