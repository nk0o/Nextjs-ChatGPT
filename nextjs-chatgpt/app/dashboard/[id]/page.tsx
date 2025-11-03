"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{id:string}>();
  const handlSubmit = async ( e: React.FormEvent) => {
    const response = await fetch("/api/test/1234",{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "test name",
        email: "test email"
      }),
    });
    const data = await response.json();

    console.log("response data", data)
  }
  return <>다이나믹 라우트 페이지: {params.id}
  <button type="submit" onClick={handlSubmit}>전송</button>
  </>
};
