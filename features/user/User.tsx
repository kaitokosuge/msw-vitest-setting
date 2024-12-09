import React from "react";
import { fetchUser } from "./fetchUser";

export default async function User() {
	const { data, error } = await fetchUser();
	return <div>{data.name}</div>;
}
