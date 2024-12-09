import { Post } from "./fetchHello";

export const isHelloType = (expectPost: Post): expectPost is Post => {
	//型に不足があった場合、全く異なる場合でfalseを返すかどうか要確認->不足している時にエラーにならなかったため、length評価追加
	const PostKeyCount = 4;
	if (Object.keys(expectPost).length !== PostKeyCount) {
		return false;
	}
	const isHelloType =
		typeof expectPost.userId === "number" &&
		typeof expectPost.id === "number" &&
		typeof expectPost.title === "string" &&
		typeof expectPost.body === "string";

	return isHelloType;
};
