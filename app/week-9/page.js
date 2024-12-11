'use client';

import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  console.log("Page log");

  // Use the useUserAuth hook to get the user object and the login/logout functions
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  // Sign in with GitHub authentication
  const signIn = async () => {
    await gitHubSignIn();
  };

  // Sign out of Firebase
  const signOut = async () => {
    await firebaseSignOut();
  };

  return (
    <div className="flex justify-center items-center h-screen w-full">
      {user ? (
        <div className="bg-yellow-100 h-1/4 w-1/3 flex justify-center items-center flex-col border-4 border-yellow-500 rounded-xl shadow-lg">
          <h1 className="text-yellow-900 text-3xl font-bold mb-4">Welcome {user.displayName}!</h1>
          <a
            className="text-yellow-700 hover:text-yellow-900 underline text-lg font-bold mb-4"
            href="http://localhost:3000/week-9/shopping-list"
          >
            Continue to your shopping list
          </a>
          <button
            className="bg-yellow-700 hover:bg-yellow-600 text-yellow-50 font-bold py-2 px-6 rounded-full transition duration-200"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="bg-yellow-100 h-1/4 w-1/3 flex justify-center items-center flex-col border-4 border-yellow-500 rounded-xl shadow-lg">
          <h1 className="text-yellow-900 text-2xl font-bold mb-4">Welcome! Sign in to continue</h1>
          <button
            className="bg-yellow-700 hover:bg-yellow-600 text-yellow-50 font-bold py-2 px-6 rounded-full transition duration-200"
            type="button"
            onClick={() => signIn()}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}
