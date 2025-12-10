import Link from "next/link";

const page = ()=>{
    // throw new Error("failed to load data");
    return <>
     <div>
        <h1>user page dashboard </h1>
        <ul>
            <Link href="/dashboard/user/1"><li>user 1</li></Link>
            <Link href="/dashboard/user/2"><li>user 2</li></Link>
            <Link href="/dashboard/user/3"><li>user 3</li></Link>
            <Link href="/dashboard/user/4"><li>user 4</li></Link>
        </ul>
     </div>
    </>
}
export default page;