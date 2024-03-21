export const authConfig = {
    secret: process.env.NEXTAUTH_SECRET,
    providers:[],
    pages: {
      signIn: "/login",
    },
    callbacks: {

      async jwt({token, user}){
        if(user) {
          token.id = user.id
          token.isAdmin = user.isAdmin
        }
        return token;
      },

      async session({session, token}){
        if(token) {
          session.user.id = token.id;
          session.user.isAdmin = token.isAdmin
        }
        return session;
      },



      authorized({ auth, request }) {
       const user = auth?.user;
       const isOnAdminUsers = request.nextUrl?.pathname.startsWith("/healthcard/users");
       const isOnAdminNotifications = request.nextUrl?.pathname.startsWith("/healthcard/notifications/add");
       const isOnHealthCard = request.nextUrl?.pathname.startsWith("/healthcard")
       const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login")
      

       if(isOnAdminUsers && !user?.isAdmin) {
        return false;
       }
       if(isOnAdminNotifications && !user?.isAdmin) {
        return false;
       }

       if(isOnHealthCard && !user) {
        return false;
       }
       if(isOnLoginPage && user) {
        return Response.redirect(new URL("/healthcard", request.nextUrl));
       }
    
       return true;
      },
    },
  };