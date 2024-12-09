import { render, screen } from "@testing-library/react";
import { server } from "./../../lib/msw/setup/server";
import { http, HttpResponse } from "msw";
import {
	afterAll,
	afterEach,
	beforeEach,
	describe,
	expect,
	test,
} from "vitest";
import User from "../user/User";

beforeEach(() => {
	server.listen();
});

afterEach(() => {
	server.resetHandlers();
});

afterAll(() => {
	server.close();
});

describe("<User/>", () => {
	test("リクエスト成功時、nameが表示されるか", async () => {
		const result = await User();
		render(result);
		console.log("result", result);
		expect(screen.getByText("Leanne Graham")).toBeDefined();
	});
});
