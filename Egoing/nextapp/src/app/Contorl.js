"use client"
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
 
export default function Control() {
  const params = useParams();
  const router = useRouter();
  console.log("useParams() : ", params)
  const id = params.id;
  return (
    <ul>
      <li><Link href="/create">Create</Link></li>
      {id ? <>
        <li><Link href={"/update/"+id}>Update</Link></li>
        <button onClick={async () => {
          const options = {
            method : "DELETE"
          }
          await fetch(process.env.NEXT_PUBLIC_API_URL + `topics/${id}`, options);
          router.push('/')
          router.refresh();
        }} >delete</button>
      </> : null}
    </ul>
  );
}