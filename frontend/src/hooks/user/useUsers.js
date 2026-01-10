import { useQuery } from "@tanstack/react-query";
import UsersService from "../../services/users.service";

const useUsers = (queryParams) => {
  return useQuery({
    queryKey: ["users", queryParams],
    queryFn: () => UsersService.getUsers(queryParams),
    keepPreviousData: true,
  });
};

export default useUsers;