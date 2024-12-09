import React from "react";
import { fetchHello } from "./fetchHello";

export default async function Hello() {
	const { data, error } = await fetchHello();
	console.log("json placeholderのデータ", data);
	return (
		<div className="text-white">
			<div>
				<img src="/fruitsbase-logo02.svg" className="w-[200px] block" />
			</div>
			<div>
				<>{data?.title}</>
			</div>

			{data === null && (
				<div>
					{error.status === 404 ? (
						<>URLが間違っております</>
					) : error.status === 500 ? (
						<>時間をおいて再度訪問してください</>
					) : (
						<>{error.message}</>
					)}
				</div>
			)}
		</div>
	);
}
