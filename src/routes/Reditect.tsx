import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Reditect({
  to,
  children,
}: {
  to: string;
  children: any;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to);
  }, [to]);

  return <>{children}</>;
}
