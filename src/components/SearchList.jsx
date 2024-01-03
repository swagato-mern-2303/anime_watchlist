export default function SearchList({ searchAnimeList }) {
  console.log(searchAnimeList[0]);

  return (
    <div className="flex h-full flex-col gap-y-4 overflow-y-scroll">
      {searchAnimeList.map((item, index) => (
        <Anime key={index} data={item} />
      ))}
    </div>
  );
}

function Anime({ data }) {
  const releaseYear = data.aired.from?.split("-").at(0);
  return (
    <div className="border-b-2 border-slate-500 pb-4">
      <div className="flex items-center gap-x-6">
        <img
          className="w-16"
          src={data.images.webp.small_image_url}
          alt={`${data.title} cover`}
        />
        <div className="flex flex-col gap-y-2">
          <h3 className="text-xl font-medium">
            {data.title_english || data.title}
          </h3>
          <p className="text-base text-slate-300">
            {releaseYear ? `📆 ${releaseYear}` : "⛔ Not Found"}
          </p>
        </div>
      </div>
    </div>
  );
}
