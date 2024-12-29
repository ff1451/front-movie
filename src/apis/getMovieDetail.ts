import { BASE_URL } from "../constants";
import type { MovieDetail } from "../types/movie";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getMovieDetail(id: number = 1): Promise<MovieDetail> {
  const response = await fetch(
    `${BASE_URL}movie/${id}?api_key=${API_KEY}&language=ko-KR`,
  );

  if (!response.ok) {
    throw new Error("서버 상태가 이상합니다.");
  }

  const data = await response.json();
  return data;
}
