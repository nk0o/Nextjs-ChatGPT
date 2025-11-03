export default async function Card() {
  const response = await fetch(`${process.env.NEXT_API_TEST_URL}/api/test`);
  const data = await response.json();

  console.log("data", data);
  return<div
  style={{
    width:200,
    height: 200,
    backgroundColor:'yellow',
    border:'1px solid #222'
  }}></div>
};
