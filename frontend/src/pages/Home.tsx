import { getProfile } from "@/api/services/userService";
import type { AppDispatch, Store } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: Store) => state.user.token);

  useEffect(() => {
    if (!token) {
      return;
    }
    dispatch(getProfile(token, navigate));
  }, []);
  return <main>home page</main>;
};

export default Home;
