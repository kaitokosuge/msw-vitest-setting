import axios from "axios";
import { isHelloType } from "./isHelloType";
import { isNullish } from "./../../utils/isNullish";

export type Post = {
	userId: number;
	id: number;
	title: string;
	body: string;
};

//通信成功時と失敗時で戻り値の型を統一することに成功
//関数よこの型注釈はどこで生きる？→関数呼び出し時→かと思ったが推論機能があるのでなくてもいい。が、書いといた方が明示的でいい
export async function fetchHello() {
	try {
		//<Post>この型注釈はどこで生きる？→ここに注釈すれば、関数内及び戻り値にも型が注釈され、関数呼び出し時のdataも型がまとわりつく
		const { data } = await axios.get<Post>(
			"https://jsonplaceholder.typicode.com/posts/1"
		);
		if (!isHelloType(data)) {
			//001 = 型エラーとする
			//TypeErrorは型関連のエラーを司るエラーサブクラスだが、ここで使うのは適切？
			throw TypeError("時間をおいて再度訪問してください(001)");
		}
		if (isNullish(data)) {
			throw Error("時間をおいて再度訪問してください(002)");
		}
		return { data, error: null };
	} catch (error: unknown) {
		//以降の記述で全てのエラーハンドルを賄えているか不安はある。（エラーハンドルを賄える＝画面がクラッシュしない、エラーモードが露呈しない）
		//賄えているエラー→404,通信がつながっていないとき,型エラー
		//500は賄えてる？
		console.log("catchしたエラー", error);
		if (axios.isAxiosError(error)) {
			//errorの型にany,anyが存在するがこれはいいのか、、
			return { data: null, error };
		} else if (error instanceof TypeError) {
			console.log("TypeErrorをキャッチしました", error);
			return {
				data: null,
				error: { status: "typeerror", message: error.message },
			};
		}
		console.log("予測しないエラーをキャッチしました", error);
		//axiosエラー以外のスロー。axiosを使っているときにaxiosエラー以外存在するのか？→通信がつながっていないときこれに引っかかった。
		throw { data: null, error };
	}
}
