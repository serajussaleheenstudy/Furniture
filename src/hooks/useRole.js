import { useQuery } from "@tanstack/react-query";

const useRole = (email) => {
  // const [roles, setRole] = useState('');
  const url = ` https://sb-furniture-server-side.vercel.app/users/userType/${email}`;

  const {
    data: role,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["role", email],
    queryFn: async () => {
      const res = await fetch(url);
      const data = await res.json();
      return data;
    },
  });
  console.log();
  return [role, isLoading];
};

export default useRole;
