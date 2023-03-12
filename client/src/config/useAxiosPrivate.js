import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { axiosCustom } from "./axios";

const useAxiosPrivate = () => {
  
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const refresh = async () => {
    const res = await axiosCustom.post("/prelogin");
    return (res.status === 200) ?  res.data : null;
  }
  
  useEffect(() => {
    
      const requestIntercept = axiosCustom.interceptors.request.use(
        config => {
          if (!config.headers['Authorization']) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
          }
          return config;
        }, (error) => Promise.reject(error)
      )

      const responseIntercept = axiosCustom.interceptors.response.use(

        response => response,
        async (error) => {

          const prevRequest = error?.config;
          if (error?.response?.status !== 200 && !prevRequest?.sent) {

            prevRequest.sent = true;

            const newAccessToken = await refresh();
            if (newAccessToken === null) return Promise.reject(error);
            setAccessToken(newAccessToken);
            console.log("PREVIOUS = "  + prevRequest.headers['Authorization'])
            console.log("NEW = " + newAccessToken)
            prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosCustom(prevRequest);
          }
          return Promise.reject(error);
        }
      );

      return () => {
          axiosCustom.interceptors.request.eject(requestIntercept);
          axiosCustom.interceptors.response.eject(responseIntercept);
      }
  }, [accessToken, setAccessToken])

  return axiosCustom;
}

export default useAxiosPrivate;