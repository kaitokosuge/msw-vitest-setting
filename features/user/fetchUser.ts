import axios from "axios";

export async function fetchUser() {
	try {
		//<Post>この型注釈はどこで生きる？→ここに注釈すれば、関数内及び戻り値にも型が注釈され、関数呼び出し時のdataも型がまとわりつく
		const { data } = await axios.get<any>(
			"https://jsonplaceholder.typicode.com/users/1"
		);

		return { data, error: null };
	} catch (error: unknown) {
		//以降の記述で全てのエラーハンドルを賄えているか不安はある。（エラーハンドルを賄える＝画面がクラッシュしない、エラーモードが露呈しない）
		//賄えているエラー→４０４,通信がつながっていないとき,型エラー
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
