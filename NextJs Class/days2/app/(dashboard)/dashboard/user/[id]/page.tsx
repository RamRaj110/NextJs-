const page = async({params}: {params:{id:string}}) => {
    const {id} = await params;
    console.log("User ID:", id);
  return <div>
    <h1>User Profile Page</h1>
    <p>This is the user profile page for a specific user.{id}</p>

    
</div>;
}
export default page;