import Card from "@/components/Card";
import { Suspense } from "react";

export default async function DashboardPage(){
const response = await fetch(`${process.env.NEXT_API_TEST_URL}/api/test`)
   const data = await response.json();
   console.log("data", data);

  return <>
  대시보드 페이지
    <Suspense fallback={
      <div>카드1 로딩중...</div>
    }>
      <Card />
    </Suspense>
    <Suspense fallback={
      <div>카드2 로딩중...</div>
    }>
      <Card />
    </Suspense>
    <Suspense fallback={
      <div>카드3 로딩중...</div>
    }>
      <Card />
    </Suspense>
    <Suspense fallback={
      <div>카드4 로딩중...</div>
    }>
      <Card />
    </Suspense>
  </>
}