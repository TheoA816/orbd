import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios, { axiosCustom } from "./axios";

const useAxiosPrivate = () => {
  
  const { accessToken, setAccessToken } = useContext(AuthContext);

  const refresh = async () => {
    try {
      const res = await axios.post("/prelogin");
      return res.data;
    } catch {
      return null;
    }
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