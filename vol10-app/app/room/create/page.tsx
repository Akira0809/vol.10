"use client";

import { createRoomAction } from "../../_lib/action";
import { redirect } from "next/navigation";
import { useState } from "react";
import CheckBox from "./component/CheckBox"

export default function Create() {
    const [ispending, setIspending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 🤨isPendingがtrueの時にローディングUIを出そうとするとredirectしなくなってしまう
    async function handleSubmit(formData: FormData) {
        setIspending(true);
        setError(null);

        const [name, description] = [
            formData.get("name"),
            formData.get("description"),
        ];

        if (
            !name ||
            typeof name !== "string" ||
            !description ||
            typeof description !== "string"
        ) {
            setError("1文字以上の文字列を入力してください");
            setIspending(false);
            return;
        }

        const room = await createRoomAction(name as string, description as string);
        setIspending(false);
        redirect(`/room/${room.id}`);
    }

    return (
        <div className="mx-4 my-10 flex flex-col-reverse bg-white md:flex-row mt-12">
            <div className="bg-gray-300 mt-12 rounded-lg">
                <form className="flex basis-1/2 flex-col gap-10" action={handleSubmit}>
                    {error && (
                        <div>
                            <p className="text-red-500">{error}</p>
                        </div>
                    )}
                    <div>
                        <div className="pt-5">
                        <label htmlFor="name" className="pl-8">
                            🍊ルームの名前<span className="text-red-500">*</span>
                        </label>
                        </div>
                        <div className="pl-8">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            autoComplete="off"
                            className="w-4/5 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="メッセージを入力..."
                        />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="description" className="pl-8">
                            🍊どんなルームですか？<span className="text-red-500">*</span>
                        </label>
                        <div className="pl-8">
                        <textarea
                            id="description"
                            name="description"
                            autoComplete="off"
                            className="h-40 w-4/5 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring"
                            placeholder="メッセージを入力..."
                        />
                        </div>
                    </div>
                    <CheckBox />
                    <div className="pb-4 mx-auto">
                    <button
                        type="submit"
                        disabled={ispending}
                        className="rounded-lg w-4/5 bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
                    >
                        ルームをつくる
                    </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
