import authConfig from "./auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt"

import {

  adminPrefix,
  apiPrefix,
  cartorioPrefix,
  prefeituraPrefix,

} from "./routes"

const { auth } = NextAuth(authConfig)

export default auth( async (req) => {
  
  const isLogged = !!req.auth;

  const {nextUrl,auth} = req;
  
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiPrefix);

  const isPublicRoute = nextUrl.pathname === "/";

  const isCartorioRoute = nextUrl.pathname.startsWith(cartorioPrefix)  
  const isPrefeituraRoute = nextUrl.pathname.startsWith(prefeituraPrefix)  
  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)  

  if(isApiAuthRoute){
    return 
  }


  if(isPublicRoute){
    if(isLogged){
      if(auth?.user.perfil === "CARTORIO"){
      return Response.redirect(new URL ("/private/cartorio",nextUrl))
      }else{
        return Response.redirect(new URL ("/private/prefeitura",nextUrl))
      }

    }
    return 
  }

  if(isCartorioRoute && auth?.user.perfil === "PREFEITURA"){
    return Response.redirect(new URL ("/private/prefeitura",nextUrl))
  }

  if(isPrefeituraRoute && auth?.user.perfil === "CARTORIO"){
    return Response.redirect(new URL ("/private/cartorio",nextUrl))
  }
  if(isAdminRoute && auth?.user.perfil !== "ADMIN"){
    if(auth?.user.perfil === "CARTORIO"){
      return Response.redirect(new URL ("/private/cartorio",nextUrl))
      }else{
        return Response.redirect(new URL ("/private/prefeitura",nextUrl))
      }
  }


  if(!isLogged && !isPublicRoute){
    return Response.redirect(new URL ("/",nextUrl))
  }

  return 
})

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/(api|trpc)(.*)"
  ]
}