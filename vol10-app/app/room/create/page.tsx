"use client";

import { createRoomAction } from "../../_lib/action";
import { redirect } from "next/navigation";
import { useState } from "react";
import { CheckBox } from "./component/CheckBox";

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
      setError("");
      setIspending(false);
      return;
    }

    const room = await createRoomAction(name as string, description as string);
    setIspending(false);
    redirect(`/room/${room.id}`);
  }

  return (
    <div className="mx-4 my-10 flex bg-white mt-12">
      <div className="border-double border-4 border-indigo-600  mt-12 rounded-lg w-[800px]">
        <form className="flex basis-1/2 flex-col gap-10" action={handleSubmit}>
          {error && (
            <div>
              <p className="text-red-500">{error}</p>
            </div>
          )}
          <div className="">
            <div className="pt-5">
              <label htmlFor="name" className="pl-8 font-bold">
                🍊ルームの名前<span className="text-red-500">*</span>
              </label>
            </div>
            <div className="flex justify-center w-full">
              <input
                type="text"
                id="name"
                name="name"
                autoComplete="off"
                className="w-11/12 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring border-solid border-2 border-indigo-600"
                placeholder="メッセージを入力..."
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="pl-8 font-bold">
              🍊どんなルームですか？<span className="text-red-500">*</span>
            </label>
            <div className="flex justify-center w-full">
              <textarea
                id="description"
                name="description"
                autoComplete="off"
                className="h-40 w-11/12 rounded-lg border px-4 py-2 my-3 focus:border-blue-300 focus:outline-none focus:ring border-solid border-2 border-indigo-600"
                placeholder="メッセージを入力..."
              />
            </div>
          </div>
          <CheckBox />
          <div className="pb-4 mx-auto">
            <button
              type="submit"
              disabled={ispending}
              className="rounded-full w-[150px] bg-blue-500 px-4 py-2 text-white hover:bg-blue-400"
            >
              ルームをつくる
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
