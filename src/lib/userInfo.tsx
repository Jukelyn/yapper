// import { useAuth } from "@clerk/nextjs";

// export default function Example() {
//   const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();

//   const fetchExternalData = async () => {
//     // Use `getToken()` to get the current user's session token
//     const token = await getToken();

//     // Use `token` to fetch data from an external API
//     const response = await fetch("https://api.example.com/data", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return response.json();
//   };

//   // Use `isLoaded` to check if Clerk is loaded
//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   // Use `isSignedIn` to check if the user is signed in
//   if (!isSignedIn) {
//     // You could also add a redirect to the sign-in page here
//     return <div>Sign in to view this page</div>;
//   }

//   return (
//     <div>
//       Hello, {userId}! Your current active session is {sessionId}.
//     </div>
//   );
// }
