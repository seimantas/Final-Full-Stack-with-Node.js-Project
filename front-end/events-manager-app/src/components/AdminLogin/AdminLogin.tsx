export const AdminLogin = () => {
    return (
        <form>
            <h1>Administration Login</h1>
            <input  placeholder="First name" />
            <input  placeholder="Last name" />
            <input  placeholder="Password" />
            <button>Submit</button>
            <p>
               
if you don't have an account, you can register here: <a href="/admin-registration">Register</a>
            </p>
        </form>
    )
}