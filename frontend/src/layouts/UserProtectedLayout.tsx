import { getProfile } from "@/api/services/userService";
import { Spinner } from "@/components/ui/spinner";
import { removeLoading, setLoading } from "@/redux/slices/pageSlice";
import type { AppDispatch, Store } from "@/redux/store";
import { useEffect, type ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProtectedLayout = ({ children }: { children: ReactElement }) => {
  const { token } = useSelector((state: Store) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: Store) => state.page);

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }
    try {
      dispatch(setLoading());
      dispatch(getProfile(token, navigate));
    } catch (error) {
    } finally {
      dispatch(removeLoading());
    }
  }, []);

  if (isLoading) {
    return (
      <main className="h-screen w-screen flex justify-center items-center">
        <Spinner className="size-12" />
      </main>
    );
  }
  if (!isLoading) return children;
};

export default UserProtectedLayout;
