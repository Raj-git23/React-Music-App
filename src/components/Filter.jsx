import { genres } from "../assets/constants";

const Filer = () => {
  return (
    <div className="flex ml-7 mb-2 flex-wrap gap-2 rounded-md">
      {genres.map((genre) => (
        <div
          key={genre.value}
          className="px-3 py-2 text-sm bg-[#583f6ab2] text-white rounded-lg cursor-pointer hover:bg-gray-600"
        >
          {genre.title}
        </div>
      ))}
    </div>
  );
};

export default Filer;