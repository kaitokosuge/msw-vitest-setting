import { http, HttpResponse, type RequestHandler } from "msw";
import { mockPost } from "../mockDatas/post";
import { mockUser } from "../mockDatas/user";

const helloHandler = http.get(
	"https://jsonplaceholder.typicode.com/posts/1",
	() => {
		return HttpResponse.json(mockPost);
	}
);

const userHandler = http.get(
	"https://jsonplaceholder.typicode.com/users/1",
	() => {
		return HttpResponse.json(mockUser);
	}
);

export const handlers: RequestHandler[] = [helloHandler, userHandler];
