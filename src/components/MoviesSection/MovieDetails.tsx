import { MovieDetail } from "../../types/movie";
import { IMAGE_URL } from "../../constants";
import RatingStar from "./Rating";

interface MovieDetailProps {
  movieDetail: MovieDetail;
  onClose: () => void;
}

function MovieDetails({ movieDetail, onClose }: MovieDetailProps) {
  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-80">
      <div className="relative mt-auto h-[490px] w-full bg-[#212122] text-white sm:mt-0 sm:h-[577px] sm:w-[826px] sm:rounded-lg">
        <div className="relative mb-9 flex h-[60px] items-center justify-between border-b border-[#444] px-8">
          <h2 className="absolute left-1/2 mx-auto -translate-x-1/2 transform text-center text-lg font-semibold sm:text-xl">
            {movieDetail.title}
          </h2>
          <button
            className="absolute right-8 h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-[#444] text-[20px]"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex gap-8 px-8">
          <img
            className="hidden h-[433px] w-[292px] sm:block"
            src={`${IMAGE_URL}${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
          <div className="flex h-full flex-col">
            <div className="mb-4 flex gap-4">
              <div className="text-base">
                {movieDetail.genres.map((genre) => genre.name).join(", ")}
              </div>
              <div className="flex items-center text-base">
                <span className="mr-1 block h-5 w-5 bg-[url('/src/assets/star.svg')] bg-contain bg-no-repeat align-middle"></span>
                {movieDetail.vote_average.toFixed(1)}
              </div>
            </div>
            <p className="mb-5 text-left text-sm">{movieDetail.overview}</p>
            <div className="mt-auto flex h-[64px] items-center justify-center gap-3 rounded-2xl bg-[#383839] p-4 text-sm font-bold sm:w-[438px] sm:justify-normal">
              <div>내 별점</div>
              <RatingStar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
